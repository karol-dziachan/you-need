package com.mdmk.youneed.service;

import com.mdmk.youneed.db.entity.Company;
import com.mdmk.youneed.db.entity.Employee;
import com.mdmk.youneed.db.repository.EmployeeRepository;
import com.mdmk.youneed.dto.EmployeeDTO;
import com.mdmk.youneed.dto.mappers.EmployeeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public void saveEmployee(EmployeeDTO employeeData, Company company) {
        Employee employee = EmployeeMapper.INSTANCE.dtoToEmployee(employeeData);
        employee.setCompany(company);
        employeeRepository.save(employee);
    }

}
