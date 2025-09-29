package com.utp.utpmarket.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.utp.utpmarket.models.dto.RespuestaAuth;
import com.utp.utpmarket.models.dto.SolicitudRegistro;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.services.AuthService;
import com.utp.utpmarket.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Controller
@RequiredArgsConstructor
public class PageController {

    private final AuthService authService;
    private final UsuarioService usuarioService;
    private final ObjectMapper objectMapper;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("usuarios", new Usuario());
        return "register";
    }

    @PostMapping("/register")
    public String procesarRegistro(@ModelAttribute("usuarios") Usuario usuario) throws JsonProcessingException, UnsupportedEncodingException {
        SolicitudRegistro solicitud = new SolicitudRegistro(
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getTelefono(),
                usuario.getEmail(),
                usuario.getPassword()
        );
        RespuestaAuth respuestaAuth = authService.registrarUsuario(solicitud);
        String token = respuestaAuth.token();

        Usuario perfilUsuario = usuarioService.buscarPorEmail(usuario.getEmail())
                .orElseThrow(() -> new IllegalStateException("No se pudo encontrar el usuario recién registrado."));

        String perfilUsuarioString = URLEncoder.encode(objectMapper.writeValueAsString(perfilUsuario), StandardCharsets.UTF_8);
        String tokenString = URLEncoder.encode(token, StandardCharsets.UTF_8);

        return "redirect:" + UriComponentsBuilder
                .fromUriString("http://localhost:5173/auth/callback")
                .queryParam("token", tokenString)
                .queryParam("user", perfilUsuarioString)
                .build().toUriString();
    }

    @GetMapping("/forgot-password")
    public String forgotPassword() {
        return "forgot-password";
    }

    @GetMapping("/forgot-password-sent")
    public String forgotPasswordSent() {
        return "forgot-password-sent";
    }

    @GetMapping("/reset-password")
    public String showResetPasswordForm(@RequestParam("token") String token, Model model) {
        model.addAttribute("token", token);
        return "reset-password";
    }
}