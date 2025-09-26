package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.dto.SolicitudRegistro;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class PageController {

    private final AuthService authService;

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
    public String doRegister(@ModelAttribute("usuarios") Usuario usuario) {
        SolicitudRegistro request = new SolicitudRegistro(
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getTelefono(),
                usuario.getEmail(),
                usuario.getPassword()
        );
        authService.registrarUsuario(request);
        return "redirect:/login";
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