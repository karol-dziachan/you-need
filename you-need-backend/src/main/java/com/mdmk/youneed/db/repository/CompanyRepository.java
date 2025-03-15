package com.mdmk.youneed.db.repository;

import com.mdmk.youneed.db.entity.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends CrudRepository<Company, String> {
}
