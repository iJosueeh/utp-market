package com.utp.utpmarket.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.utp.utpmarket.config.SecurityConfig;
// ... other imports ...

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class PasswordResetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testHandleForgotPassword() throws Exception {
        mockMvc.perform(post("/forgot-password")
                        .param("email", "test@example.com"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/forgot-password-sent"))
                .andExpect(flash().attributeExists("token"));
    }

    @Test
    void testHandleResetPassword_Success() throws Exception {
        mockMvc.perform(post("/reset-password")
                        .param("token", "some-token")
                        .param("password", "newPassword")
                        .param("confirmPassword", "newPassword"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/login?reset_success"));
    }

    @Test
    void testHandleResetPassword_PasswordMismatch() throws Exception {
        mockMvc.perform(post("/reset-password")
                        .param("token", "some-token")
                        .param("password", "newPassword")
                        .param("confirmPassword", "wrongPassword"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrlPattern("/reset-password?error*"));
    }
}
