package com.mdmk.youneed.db.entity;

import com.mdmk.youneed.db.entity.keys.CompanyBranchKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity(name = "company_branch")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyBranch {
    @EmbeddedId
    private CompanyBranchKey id;

    /**
     *  null if prices are set per offer
     */

    @OneToMany
    private List<Offer> offers;

    private String description;

    //TODO zdjęcia
}
