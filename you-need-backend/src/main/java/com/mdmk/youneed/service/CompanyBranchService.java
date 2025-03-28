package com.mdmk.youneed.service;

import com.mdmk.youneed.db.entity.CompanyBranch;
import com.mdmk.youneed.db.entity.Offer;
import com.mdmk.youneed.db.repository.CompanyBranchRepository;
import com.mdmk.youneed.db.repository.OfferRepository;
import com.mdmk.youneed.dto.NewCompanyBranchDTO;
import com.mdmk.youneed.dto.mappers.CompanyBranchMapper;
import com.mdmk.youneed.dto.mappers.OfferMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanyBranchService {
    private final CompanyBranchRepository companyBranchRepository;
    private final OfferRepository offerRepository;

    private final CompanyBranchMapper companyBranchMapper = CompanyBranchMapper.INSTANCE;
    private final OfferMapper offerMapper = OfferMapper.INSTANCE;

    public void createBranchForACompany(NewCompanyBranchDTO dto) {
        final CompanyBranch companyBranch = companyBranchMapper.dtoToBranch(dto);
        final CompanyBranch savedCompanyBranch = companyBranchRepository.save(companyBranch);

        List<Offer> newOffers = offersToSave(dto, savedCompanyBranch);
        offerRepository.saveAll(newOffers);
    }

    private List<Offer> offersToSave(NewCompanyBranchDTO dto, CompanyBranch savedCompanyBranch) {
        return dto.getNewOffers().stream()
                .map(offerMapper::dtoToOffer)
                .map(offer -> offer.withCompanyBranch(savedCompanyBranch))
                .toList();
    }
}
