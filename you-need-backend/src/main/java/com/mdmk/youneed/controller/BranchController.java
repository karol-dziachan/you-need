package com.mdmk.youneed.controller;

import com.mdmk.youneed.dto.BranchDTO;
import com.mdmk.youneed.service.BranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/branch")
@RequiredArgsConstructor
public class BranchController {
    private final BranchService branchService;

    @GetMapping
    public ResponseEntity<List<BranchDTO>> getAllBranches() {
        return ResponseEntity.ok(branchService.getBranches());
    }

    @GetMapping("/{branchId}/default-services/{lang}")
    public ResponseEntity<List<String>> getDefaultServices(@PathVariable("branchId") Long branchId,
                                                           @PathVariable(value = "lang",required = false) String lang) {
        if ("en".equals(lang)) {
            return ResponseEntity.ok(branchService.getDefaultServicesEn(branchId));
        }
        return ResponseEntity.ok(branchService.getDefaultServices(branchId));
    }
}
