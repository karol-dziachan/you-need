package com.mdmk.youneed.db.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * price null for CompanyBranches that have set price per hour
     */

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private boolean perHour;

    @Column(nullable = false)
    private boolean active;

    @Column
    private String description;

    @Column
    private Integer ownToolsUsagePrice;

    @ManyToOne
    @JoinColumn(nullable = false, name = "company_id")
    @JoinColumn(nullable = false, name = "branch_id")
    @With
    private CompanyBranch companyBranch;

}
