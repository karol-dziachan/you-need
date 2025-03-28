package com.mdmk.youneed.dto.mappers;

import com.mdmk.youneed.db.entity.CompanyBranch;
import com.mdmk.youneed.db.entity.keys.CompanyBranchKey;
import com.mdmk.youneed.dto.NewCompanyBranchDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CompanyBranchMapper {

    CompanyBranchMapper INSTANCE = Mappers.getMapper(CompanyBranchMapper.class);

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
