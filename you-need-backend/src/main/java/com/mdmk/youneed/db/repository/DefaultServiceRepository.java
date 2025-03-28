package com.mdmk.youneed.db.repository;

import com.mdmk.youneed.db.dataentity.DefaultService;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DefaultServiceRepository extends CrudRepository<DefaultService, Long> {
    List<DefaultService> getDefaultServiceByBranchId(Long branchId);
}
