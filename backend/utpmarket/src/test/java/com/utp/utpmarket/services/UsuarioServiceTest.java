
package com.utp.utpmarket.services;

import com.utp.utpmarket.models.dto.SolicitudPerfilActualizado;
import com.utp.utpmarket.models.entity.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private PasswordEncoder passwordEncoder;

    private UsuarioService usuarioService;

    @BeforeEach
    void setUp() {
        usuarioService = new UsuarioService(passwordEncoder);
    }

    private Usuario crearYGuardarUsuario(String nombre, String email) {
        Usuario user = new Usuario();
        user.setNombre(nombre);
        user.setEmail(email);
        return usuarioService.guardar(user);
    }

    @Test
    void deberiaRetornarTodosLosUsuarios() {
        crearYGuardarUsuario("John Doe", "john.doe@utp.edu.pe");
        crearYGuardarUsuario("Jane Doe", "jane.doe@utp.edu.pe");

        List<Usuario> result = usuarioService.listarTodos();

        assertThat(result).hasSize(2);
    }

    @Test
    void deberiaRetornarUsuarioCuandoSeEncuentraPorId() {
        Usuario savedUser = crearYGuardarUsuario("Test User", "test.user@utp.edu.pe");

        Optional<Usuario> result = usuarioService.buscarPorId(savedUser.getId());

        assertThat(result).isPresent();
        assertThat(result.get().getNombre()).isEqualTo("Test User");
    }

    @Test
    void deberiaRetornarOpcionalVacioCuandoUsuarioNoSeEncuentraPorId() {
        Optional<Usuario> result = usuarioService.buscarPorId(999L);

        assertThat(result).isNotPresent();
    }

    @Test
    void deberiaCrearYRetornarUsuarioConId() {
        Usuario newUser = new Usuario();
        newUser.setNombre("New User");
        newUser.setEmail("new.user@utp.edu.pe");

        Usuario result = usuarioService.guardar(newUser);

        assertThat(result.getId()).isNotNull().isPositive();
        assertThat(result.getNombre()).isEqualTo("New User");
    }

    @Test
    void deberiaActualizarYRetornarUsuario() {
        Usuario existingUser = crearYGuardarUsuario("Old Name", "old.email@utp.edu.pe");

        Usuario updatedInfo = new Usuario();
        updatedInfo.setNombre("New Name");
        updatedInfo.setApellidos("New Lastname");
        updatedInfo.setTelefono("123456789");
        updatedInfo.setEmail("new.email@utp.edu.pe");

        Optional<Usuario> result = usuarioService.actualizar(existingUser.getId(), updatedInfo);

        assertThat(result).isPresent();
        assertThat(result.get().getNombre()).isEqualTo("New Name");
        assertThat(result.get().getApellidos()).isEqualTo("New Lastname");
    }

    @Test
    void deberiaRetornarOpcionalVacioCuandoSeActualizaUsuarioInexistente() {
        Optional<Usuario> result = usuarioService.actualizar(999L, new Usuario());

        assertThat(result).isNotPresent();
    }

    @Test
    void deberiaActualizarPerfilDeUsuario() {
        String email = "test@utp.edu.pe";
        crearYGuardarUsuario("Original", email);

        SolicitudPerfilActualizado request = new SolicitudPerfilActualizado("Updated", "Name", "987654321");

        Optional<Usuario> result = usuarioService.actualizarPerfil(email, request);

        assertThat(result).isPresent();
        assertThat(result.get().getNombre()).isEqualTo("Updated");
        assertThat(result.get().getApellidos()).isEqualTo("Name");
        assertThat(result.get().getTelefono()).isEqualTo("987654321");
    }

    @Test
    void deberiaEliminarUsuario() {
        Usuario userToDelete = crearYGuardarUsuario("To Delete", "delete.me@utp.edu.pe");

        boolean result = usuarioService.eliminarPorId(userToDelete.getId());

        assertThat(result).isTrue();
        assertThat(usuarioService.buscarPorId(userToDelete.getId())).isNotPresent();
    }

    @Test
    void deberiaRetornarFalsoCuandoSeEliminaUsuarioInexistente() {
        boolean result = usuarioService.eliminarPorId(999L);

        assertThat(result).isFalse();
    }

    @Test
    void deberiaRetornarUsuarioCuandoSeEncuentraPorEmail() {
        String email = "test@utp.edu.pe";
        crearYGuardarUsuario("Test User", email);

        Optional<Usuario> result = usuarioService.buscarPorEmail(email);

        assertThat(result).isPresent();
        assertThat(result.get().getEmail()).isEqualTo(email);
    }

    // --- Pruebas de Reseteo de Contraseña ---

    @Test
    void testCrearTokenReseteoPassword_Exitoso() {
        String email = "test@utp.edu.pe";
        crearYGuardarUsuario("Test User", email);

        String token = usuarioService.crearTokenReseteoPassword(email);

        assertThat(token).isNotNull();
        Optional<Usuario> userWithToken = usuarioService.buscarPorEmail(email);
        assertThat(userWithToken).isPresent();
        assertThat(userWithToken.get().getResetPasswordToken()).isEqualTo(token);
    }

    @Test
    void testCrearTokenReseteoPassword_UsuarioNoEncontrado() {
        String token = usuarioService.crearTokenReseteoPassword("nonexistent@utp.edu.pe");

        assertThat(token).isNull();
    }

    @Test
    void testValidarTokenReseteoPassword_Valido() {
        String email = "test@utp.edu.pe";
        crearYGuardarUsuario("Test User", email);
        String token = usuarioService.crearTokenReseteoPassword(email);

        Optional<Usuario> result = usuarioService.validarTokenReseteoPassword(token);

        assertThat(result).isPresent();
    }

    @Test
    void testValidarTokenReseteoPassword_Invalido() {
        Optional<Usuario> result = usuarioService.validarTokenReseteoPassword("invalid-token");

        assertThat(result).isNotPresent();
    }

    @Test
    void testValidarTokenReseteoPassword_Expirado() {
        String email = "test@utp.edu.pe";
        Usuario user = crearYGuardarUsuario("Test User", email);
        String token = UUID.randomUUID().toString();
        user.setResetPasswordToken(token);
        user.setResetPasswordTokenExpiryDate(LocalDateTime.now().minusHours(1)); // Token expirado
        usuarioService.guardar(user);

        Optional<Usuario> result = usuarioService.validarTokenReseteoPassword(token);

        assertThat(result).isNotPresent();
    }

    @Test
    void testCambiarPassword() {
        Usuario user = crearYGuardarUsuario("Test User", "test@utp.edu.pe");
        String newPassword = "newPassword";
        String encodedPassword = "encodedNewPassword";

        when(passwordEncoder.encode(newPassword)).thenReturn(encodedPassword);

        usuarioService.cambiarPassword(user, newPassword);

        Optional<Usuario> updatedUser = usuarioService.buscarPorId(user.getId());
        assertThat(updatedUser).isPresent();
        assertThat(updatedUser.get().getPassword()).isEqualTo(encodedPassword);
        assertThat(updatedUser.get().getResetPasswordToken()).isNull();
        assertThat(updatedUser.get().getResetPasswordTokenExpiryDate()).isNull();
    }
}
