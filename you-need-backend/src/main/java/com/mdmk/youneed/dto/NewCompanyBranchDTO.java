package com.mdmk.youneed.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NewCompanyBranchDTO {
    private Long companyId;
    private Long branchId;
    private String description;
    private List<NewOfferDTO> newOffers;
}
