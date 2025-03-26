package com.mdmk.youneed.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NewCompanyBranchDTO {
    private Long companyId;
    private Long branchId;
    private String description;
}
