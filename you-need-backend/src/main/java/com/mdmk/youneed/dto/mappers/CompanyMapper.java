package com.mdmk.youneed.dto.mappers;

import com.mdmk.youneed.db.entity.Company;
import com.mdmk.youneed.dto.CompanyDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CompanyMapper {

    CompanyMapper INSTANCE = Mappers.getMapper(CompanyMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "employees", ignore = true)
    Company dtoToCompany(CompanyDTO createCompanyDTO);

    CompanyDTO companyToDto(Company company);
}
