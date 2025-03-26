package com.mdmk.youneed.dto;

import com.mdmk.youneed.db.dataentity.DefaultService;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BranchDTO {
    private Long id;
    private String nameEn;
    private String namePl;
    private List<BranchDTO> children;
}
