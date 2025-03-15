package com.mdmk.youneed.dto.mappers;

import com.mdmk.youneed.db.entity.Employee;
import com.mdmk.youneed.dto.EmployeeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EmployeeMapper {
    EmployeeMapper INSTANCE = Mappers.getMapper(EmployeeMapper.class);


    @Mapping(target = "id", ignore = true)
    @Mapping(source = "role", target = "role")
    Employee dtoToEmployee(EmployeeDTO employeeDTO);

    EmployeeDTO employeeToDto(Employee employee);

}
