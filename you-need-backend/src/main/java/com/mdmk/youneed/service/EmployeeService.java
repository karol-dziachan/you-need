package com.mdmk.youneed.service;

import com.mdmk.youneed.dto.AuthenticationResponse;
import com.mdmk.youneed.dto.EmployeeDTO;
import com.mdmk.youneed.dto.RegisterRequest;
import com.mdmk.youneed.security.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final AuthenticationService authenticationService;

    public AuthenticationResponse RegisterEmployee(EmployeeDTO employeeData, Long companyId) {
        return authenticationService.register(RegisterRequest.builder()
                        .firstName(employeeData.getFirstName())
                        .lastName(employeeData.getLastName())
                        .role(employeeData.getRole())
                        .email(employeeData.getEmail())
                        .companyId(companyId)
                        .password(employeeData.getPassword())
                .build());
    }

}
