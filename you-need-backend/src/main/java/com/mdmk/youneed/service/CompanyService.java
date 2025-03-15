package com.mdmk.youneed.service;

import com.mdmk.youneed.db.entity.Company;
import com.mdmk.youneed.db.entity.Employee;
import com.mdmk.youneed.db.repository.CompanyRepository;
import com.mdmk.youneed.dto.CreateCompanyDto;
import com.mdmk.youneed.dto.EmployeeDTO;
import com.mdmk.youneed.dto.mappers.CompanyMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final EmployeeService employeeService;

    @Transactional
    public void addCompany(final CreateCompanyDto newCompanyData) {
        Company company = CompanyMapper.INSTANCE.dtoToCompany(newCompanyData.getCompany());
        company = companyRepository.save(company);
        saveOwner(newCompanyData.getOwner(), company);
    }

    private void saveOwner(final EmployeeDTO owner, final Company company) {
        owner.setRole(Employee.Role.OWNER.name());
        employeeService.saveEmployee(owner, company);
    }
}
