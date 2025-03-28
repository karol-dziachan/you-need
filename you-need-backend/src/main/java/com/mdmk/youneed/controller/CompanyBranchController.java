package com.mdmk.youneed.controller;

import com.mdmk.youneed.dto.NewCompanyBranchDTO;
import com.mdmk.youneed.service.CompanyBranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("company-branch")
@RequiredArgsConstructor
public class CompanyBranchController {

    private final CompanyBranchService companyBranchService;

    @PostMapping
    public ResponseEntity<Void> createBranchForACompany(@RequestBody NewCompanyBranchDTO dto) {
        companyBranchService.createBranchForACompany(dto);
        return ResponseEntity.ok().build();
    }

}
