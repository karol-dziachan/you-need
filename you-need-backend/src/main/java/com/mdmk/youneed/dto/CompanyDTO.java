package com.mdmk.youneed.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CompanyDTO {
    @NotEmpty
    private String name;
    @NotEmpty
    private String nip;
    @NotEmpty
    private String regon;
    private String street;
    private String building;
    private String apartment;
    @NotEmpty
    private String city;
    @NotEmpty
    private String state;
    @NotEmpty
    private String country;
    @NotEmpty
    private String postalCode;
    @NotEmpty
    private String email;
    @NotEmpty
    private String phoneNumber;
}
