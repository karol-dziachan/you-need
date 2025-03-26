package com.mdmk.youneed.service;

import com.mdmk.youneed.db.entity.Branch;
import com.mdmk.youneed.db.repository.BranchRepository;
import com.mdmk.youneed.dto.BranchDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BranchService {
    private final BranchRepository branchRepository;

    public List<BranchDTO> getBranches() {
        return branchRepository.findAllByParentIsNull().stream()
                .map(
                branch -> BranchDTO.builder()
                        .id(branch.getId())
                        .namePl(branch.getNamePl())
                        .nameEn(branch.getNameEn())
                        .children(getChildrenBranches(branch.getId()))
                        .build()
                )
                .toList();
    }

    private List<BranchDTO> getChildrenBranches(Long parentBranchId) {
        List<BranchDTO> children = branchRepository.findAllByParentIs(Branch.builder().id(parentBranchId).build()).stream()
                .map(branch -> BranchDTO.builder()
                        .id(branch.getId())
                        .namePl(branch.getNamePl())
                        .nameEn(branch.getNameEn())
                        .children(getChildrenBranches(branch.getId()))
                        .build())
                .toList();
        return children.isEmpty() ? null : children;
    }
}
