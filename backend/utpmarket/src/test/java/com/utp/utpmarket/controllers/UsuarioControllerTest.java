package com.utp.utpmarket.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.utp.utpmarket.models.dto.SolicitudPerfilActualizado;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.services.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "test.user@utp.edu.pe")
class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsuarioService usuarioService;

    @Autowired
    private ObjectMapper objectMapper;

    private Usuario usuario1;
    private Usuario usuario2;

    @BeforeEach
    void setUp() {
        usuario1 = new Usuario();
        usuario1.setId(1L);
        usuario1.setNombre("John");
        usuario1.setApellidos("Doe");
        usuario1.setEmail("john.doe@utp.edu.pe");

        usuario2 = new Usuario();
        usuario2.setId(2L);
        usuario2.setNombre("Jane");
        usuario2.setApellidos("Doe");
        usuario2.setEmail("jane.doe@utp.edu.pe");
    }

    @Test
    void deberiaListarTodosLosUsuarios() throws Exception {
        given(usuarioService.listarTodos()).willReturn(Arrays.asList(usuario1, usuario2));

        mockMvc.perform(get("/api/usuarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("John"));
    }

    @Test
    void deberiaRetornarUsuarioPorId() throws Exception {
        given(usuarioService.buscarPorId(1L)).willReturn(Optional.of(usuario1));

        mockMvc.perform(get("/api/usuarios/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("John"));
    }

    @Test
    void deberiaRetornarNoEncontradoParaIdInvalido() throws Exception {
        given(usuarioService.buscarPorId(99L)).willReturn(Optional.empty());

        mockMvc.perform(get("/api/usuarios/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void deberiaCrearUsuario() throws Exception {
        given(usuarioService.guardar(any(Usuario.class))).willReturn(usuario1);

        mockMvc.perform(post("/api/usuarios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(usuario1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("John"));
    }

    @Test
    void deberiaActualizarUsuario() throws Exception {
        given(usuarioService.actualizar(eq(1L), any(Usuario.class))).willReturn(Optional.of(usuario1));

        mockMvc.perform(put("/api/usuarios/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(usuario1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("John"));
    }

    @Test
    void deberiaRetornarNoEncontradoCuandoSeActualizaUsuarioInexistente() throws Exception {
        given(usuarioService.actualizar(anyLong(), any(Usuario.class))).willReturn(Optional.empty());

        mockMvc.perform(put("/api/usuarios/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new Usuario())))
                .andExpect(status().isNotFound());
    }

    @Test
    void deberiaEliminarUsuario() throws Exception {
        given(usuarioService.eliminarPorId(1L)).willReturn(true);
        mockMvc.perform(delete("/api/usuarios/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void deberiaRetornarNoEncontradoCuandoSeEliminaUsuarioInexistente() throws Exception {
        given(usuarioService.eliminarPorId(99L)).willReturn(false);
        mockMvc.perform(delete("/api/usuarios/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void deberiaObtenerPerfilDeUsuario() throws Exception {
        given(usuarioService.buscarPorEmail("test.user@utp.edu.pe")).willReturn(Optional.of(usuario1));

        mockMvc.perform(get("/api/usuarios/perfil"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("John"))
                .andExpect(jsonPath("$.email").value("john.doe@utp.edu.pe"));
    }

    @Test
    void deberiaActualizarPerfilDeUsuario() throws Exception {
        SolicitudPerfilActualizado request = new SolicitudPerfilActualizado("John Updated", "Doe", "123456789");
        Usuario updatedUsuario = new Usuario();
        updatedUsuario.setNombre("John Updated");
        updatedUsuario.setApellidos("Doe");
        updatedUsuario.setTelefono("123456789");
        updatedUsuario.setEmail("test.user@utp.edu.pe");

        given(usuarioService.actualizarPerfil(eq("test.user@utp.edu.pe"), any(SolicitudPerfilActualizado.class))).willReturn(Optional.of(updatedUsuario));

        mockMvc.perform(put("/api/usuarios/perfil")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("John Updated"))
                .andExpect(jsonPath("$.telefono").value("123456789"));
    }
}