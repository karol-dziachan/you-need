package com.mdmk.youneed.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateCompanyDto {
    @NotNull
    @Valid
    CompanyDTO company;
    @NotNull
    @Valid
    EmployeeDTO owner;
}
