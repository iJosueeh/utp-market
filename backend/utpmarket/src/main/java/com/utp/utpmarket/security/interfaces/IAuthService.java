package com.utp.utpmarket.security.interfaces;

import com.utp.utpmarket.models.dto.auth.LoginRequestDTO;
import com.utp.utpmarket.models.dto.auth.LoginResponseDTO;
import com.utp.utpmarket.models.dto.usuario.UsuarioRequestDTO;
import com.utp.utpmarket.models.dto.usuario.UsuarioResponseDTO;

public interface IAuthService {
    UsuarioResponseDTO registrarUsuario(UsuarioRequestDTO usuarioRequestDTO);
    LoginResponseDTO loginUsuario(LoginRequestDTO loginRequestDTO);
}
