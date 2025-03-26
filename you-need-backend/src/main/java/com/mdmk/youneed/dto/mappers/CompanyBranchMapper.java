package com.mdmk.youneed.dto.mappers;

import com.mdmk.youneed.db.entity.CompanyBranch;
import com.mdmk.youneed.db.entity.keys.CompanyBranchKey;
import com.mdmk.youneed.dto.NewCompanyBranchDTO;
import org.mapstruct.factory.Mappers;

public interface CompanyBranchMapper {

    CompanyMapper INSTANCE = Mappers.getMapper(CompanyMapper.class);

    default CompanyBranch dtoToBranch(NewCompanyBranchDTO companyBranch) {
        return CompanyBranch.builder()
                .id(CompanyBranchKey.builder()
                        .companyId(companyBranch.getCompanyId())
                        .branchId(companyBranch.getBranchId())
                        .build())
                .description(companyBranch.getDescription())
                .build();
    }

}
