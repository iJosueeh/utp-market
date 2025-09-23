package com.utp.utpmarket.services;

import com.utp.utpmarket.models.dto.PerfilActualizadoRequest;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void shouldReturnAllUsers() {
        Usuario usuario1 = new Usuario();
        usuario1.setId(1L);
        usuario1.setNombre("John");
        Usuario usuario2 = new Usuario();
        usuario2.setId(2L);
        usuario2.setNombre("Jane");
        List<Usuario> usuarios = Arrays.asList(usuario1, usuario2);

        given(usuarioRepository.findAll()).willReturn(usuarios);

        List<Usuario> result = usuarioService.listarUsuarios();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getNombre()).isEqualTo("John");
    }

    @Test
    void shouldReturnUserWhenFoundById() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Test User");

        given(usuarioRepository.findById(1L)).willReturn(Optional.of(usuario));

        Optional<Usuario> result = usuarioService.buscarPorId(1L);

        assertThat(result).isPresent();
        assertThat(result.get().getNombre()).isEqualTo("Test User");
    }

    @Test
    void shouldReturnEmptyOptionalWhenUserNotFoundById() {
        given(usuarioRepository.findById(1L)).willReturn(Optional.empty());

        Optional<Usuario> result = usuarioService.buscarPorId(1L);

        assertThat(result).isNotPresent();
    }

    @Test
    void shouldCreateAndReturnUser() {
        Usuario usuario = new Usuario();
        usuario.setNombre("New User");

        given(usuarioRepository.save(any(Usuario.class))).willReturn(usuario);

        Usuario result = usuarioService.crearUsuario(new Usuario());

        assertThat(result.getNombre()).isEqualTo("New User");
    }

    @Test
    void shouldUpdateAndReturnUser() {
        Usuario existingUsuario = new Usuario();
        existingUsuario.setId(1L);
        existingUsuario.setNombre("Old Name");

        Usuario updatedInfo = new Usuario();
        updatedInfo.setNombre("New Name");
        updatedInfo.setApellido("New Lastname");
        updatedInfo.setTelefono("123456789");
        updatedInfo.setEmail("new.email@utp.edu.pe");

        given(usuarioRepository.findById(1L)).willReturn(Optional.of(existingUsuario));
        given(usuarioRepository.save(any(Usuario.class))).willAnswer(invocation -> invocation.getArgument(0));

        Usuario result = usuarioService.actualizarUsuario(1L, updatedInfo);

        assertThat(result.getNombre()).isEqualTo("New Name");
        assertThat(result.getApellido()).isEqualTo("New Lastname");
    }

    @Test
    void shouldThrowExceptionWhenUpdatingNonExistentUser() {
        given(usuarioRepository.findById(anyLong())).willReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            usuarioService.actualizarUsuario(1L, new Usuario());
        });
    }

    @Test
    void shouldUpdateUserProfile() {
        String email = "test@utp.edu.pe";
        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setNombre("Original");

        PerfilActualizadoRequest request = new PerfilActualizadoRequest("Updated", "Name", "987654321");

        when(usuarioRepository.findByEmail(email)).thenReturn(Optional.of(usuario));
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Usuario result = usuarioService.actualizarPerfil(email, request);

        assertThat(result.getNombre()).isEqualTo("Updated");
        assertThat(result.getApellido()).isEqualTo("Name");
        assertThat(result.getTelefono()).isEqualTo("987654321");
    }

    @Test
    void shouldDeleteUser() {
        Long userId = 1L;
        usuarioService.eliminarUsuario(userId);
        verify(usuarioRepository).deleteById(userId);
    }

    @Test
    void shouldReturnUserWhenFoundByEmail() {
        String email = "test@utp.edu.pe";
        Usuario usuario = new Usuario();
        usuario.setEmail(email);

        given(usuarioRepository.findByEmail(email)).willReturn(Optional.of(usuario));

        Optional<Usuario> result = usuarioService.buscarPorEmail(email);

        assertThat(result).isPresent();
        assertThat(result.get().getEmail()).isEqualTo(email);
    }

    // --- Password Reset Tests ---

    @Test
    void testCreatePasswordResetTokenForUser_Success() {
        Usuario usuario = new Usuario();
        usuario.setEmail("test@utp.edu.pe");
        given(usuarioRepository.findByEmail("test@utp.edu.pe")).willReturn(Optional.of(usuario));

        String token = usuarioService.createPasswordResetTokenForUser("test@utp.edu.pe");

        assertThat(token).isNotNull();
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void testCreatePasswordResetTokenForUser_UserNotFound() {
        given(usuarioRepository.findByEmail(anyString())).willReturn(Optional.empty());

        String token = usuarioService.createPasswordResetTokenForUser("nonexistent@utp.edu.pe");

        assertThat(token).isNull();
    }

    @Test
    void testValidatePasswordResetToken_Valid() {
        Usuario usuario = new Usuario();
        usuario.setResetPasswordToken("valid-token");
        usuario.setResetPasswordTokenExpiryDate(LocalDateTime.now().plusHours(1));
        given(usuarioRepository.findByResetPasswordToken("valid-token")).willReturn(Optional.of(usuario));

        Optional<Usuario> result = usuarioService.validatePasswordResetToken("valid-token");

        assertThat(result).isPresent();
    }

    @Test
    void testValidatePasswordResetToken_Invalid() {
        given(usuarioRepository.findByResetPasswordToken("invalid-token")).willReturn(Optional.empty());

        Optional<Usuario> result = usuarioService.validatePasswordResetToken("invalid-token");

        assertThat(result).isNotPresent();
    }

    @Test
    void testValidatePasswordResetToken_Expired() {
        Usuario usuario = new Usuario();
        usuario.setResetPasswordToken("expired-token");
        usuario.setResetPasswordTokenExpiryDate(LocalDateTime.now().minusHours(1));
        given(usuarioRepository.findByResetPasswordToken("expired-token")).willReturn(Optional.of(usuario));

        Optional<Usuario> result = usuarioService.validatePasswordResetToken("expired-token");

        assertThat(result).isNotPresent();
    }

    @Test
    void testChangeUserPassword() {
        Usuario usuario = new Usuario();
        usuario.setPassword("oldPassword");

        given(passwordEncoder.encode("newPassword")).willReturn("encodedNewPassword");

        usuarioService.changeUserPassword(usuario, "newPassword");

        assertThat(usuario.getPassword()).isEqualTo("encodedNewPassword");
        assertThat(usuario.getResetPasswordToken()).isNull();
        assertThat(usuario.getResetPasswordTokenExpiryDate()).isNull();
        verify(usuarioRepository).save(usuario);
    }
}
