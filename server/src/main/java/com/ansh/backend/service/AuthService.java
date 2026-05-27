package com.ansh.backend.service;

import com.ansh.backend.dto.AuthResponse;
import com.ansh.backend.dto.LoginRequest;
import com.ansh.backend.dto.SignupRequest;
import com.ansh.backend.model.User;
import com.ansh.backend.repository.UserRepository;
import com.ansh.backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service handling user registration and authentication logic.
 * Orchestrates password hashing, credential validation, and JWT token generation.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Register a new user.
     * Validates that the email is unique, hashes the password,
     * persists the user, and returns a JWT token.
     *
     * @throws IllegalArgumentException if the email is already registered
     */
    public AuthResponse signup(SignupRequest request) {
        // Check for duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        // Build and save the new user with hashed password
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        // Generate JWT token for immediate login after registration
        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .message("User registered successfully")
                .build();
    }

    /**
     * Authenticate a user with their credentials.
     * Delegates credential validation to Spring Security's AuthenticationManager,
     * then generates a JWT token on success.
     *
     * @throws BadCredentialsException if email/password combination is invalid
     */
    public AuthResponse login(LoginRequest request) {
        // Authenticate using Spring Security — throws BadCredentialsException on failure
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // If authentication succeeds, generate and return a JWT token
        String token = jwtService.generateToken(request.getEmail());

        return AuthResponse.builder()
                .token(token)
                .message("Login successful")
                .build();
    }
}
