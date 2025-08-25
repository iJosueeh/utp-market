package com.utp.utpmarket.security.interfaces;

import com.utp.utpmarket.models.dto.auth.LoginRequestDTO;
import com.utp.utpmarket.models.dto.auth.LoginResponseDTO;
import com.utp.utpmarket.models.dto.usuario.UsuarioRequestDTO;
import com.utp.utpmarket.models.dto.usuario.UsuarioResponseDTO;

public class AuthService implements IAuthService {

    @Override
    public UsuarioResponseDTO registrarUsuario(UsuarioRequestDTO usuarioRequestDTO) {
        return null;
    }

    @Override
    public LoginResponseDTO loginUsuario(LoginRequestDTO loginRequestDTO) {
        return null;
    }
}
