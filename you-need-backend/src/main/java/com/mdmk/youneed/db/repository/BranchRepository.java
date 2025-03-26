package com.mdmk.youneed.db.repository;

import com.mdmk.youneed.db.entity.Branch;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BranchRepository extends CrudRepository<Branch, Long> {
    List<Branch> findAllByParentIsNull();
    List<Branch> findAllByParentIs(Branch parent);
}
