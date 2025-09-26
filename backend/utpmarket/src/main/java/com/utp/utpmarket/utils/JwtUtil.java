package com.utp.utpmarket.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    public String generarToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hora
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extraerEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validarToken(String token, String email) {
        try {
            String emailExtraido = extraerEmail(token);
            return (emailExtraido.equals(email) && !isTokenExpirado(token));
        } catch (io.jsonwebtoken.ExpiredJwtException ex) {
            logger.error("JWT Token ha expirado: {}", ex.getMessage());
            return false;
        } catch (io.jsonwebtoken.MalformedJwtException ex) {
            logger.error("JWT Token no es válido: {}", ex.getMessage());
            return false;
        } catch (IllegalArgumentException ex) {
            logger.error("Argumento del token no es válido o está vacío: {}", ex.getMessage());
            return false;
        } catch (Exception e) {
            logger.error("Error al validar el token: {}", e.getMessage(), e);
            return false;
        }
    }

    private boolean isTokenExpirado(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

}

