package com.mdmk.youneed.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private User user;

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class User {
        private String email;
        private String firstName;
        private String lastName;
    }
} 