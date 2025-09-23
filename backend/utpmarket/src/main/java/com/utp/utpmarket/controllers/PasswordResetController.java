package com.utp.utpmarket.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.UUID;

@Controller
public class PasswordResetController {

    @PostMapping("/forgot-password")
    public String handleForgotPassword(@RequestParam("email") String email, RedirectAttributes redirectAttributes) {
        System.out.println("Solicitud de reseteo de contraseña para el correo: " + email);
        String token = UUID.randomUUID().toString(); // Generamos un token de ejemplo
        redirectAttributes.addFlashAttribute("token", token);
        return "redirect:/forgot-password-sent";
    }

    @PostMapping("/reset-password")
    public String handleResetPassword(@RequestParam("token") String token,
                                    @RequestParam("password") String newPassword,
                                    @RequestParam("confirmPassword") String confirmPassword,
                                    RedirectAttributes redirectAttributes) {
        if (!newPassword.equals(confirmPassword)) {
            redirectAttributes.addAttribute("token", token);
            return "redirect:/reset-password?error";
        }
        System.out.println("Contraseña actualizada para el token: " + token);

        return "redirect:/login?reset_success";
    }

}
