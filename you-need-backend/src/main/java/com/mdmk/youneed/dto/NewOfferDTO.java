package com.mdmk.youneed.dto;

import lombok.Data;

@Data
public class NewOfferDTO {
    private String name;
    private Integer price;
    private boolean perHour;
    private String description;
    private Integer ownToolsUsagePrice;
}
