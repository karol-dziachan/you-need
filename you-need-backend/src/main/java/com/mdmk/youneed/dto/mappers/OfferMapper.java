package com.mdmk.youneed.dto.mappers;

import com.mdmk.youneed.db.entity.Offer;
import com.mdmk.youneed.dto.NewOfferDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OfferMapper {
    OfferMapper INSTANCE = Mappers.getMapper(OfferMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "companyBranch", ignore = true)
    Offer dtoToOffer(NewOfferDTO offerDTO);
}
