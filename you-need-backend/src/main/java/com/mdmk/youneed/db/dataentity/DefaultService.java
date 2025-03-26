package com.mdmk.youneed.db.dataentity;

import com.mdmk.youneed.db.entity.Branch;
import jakarta.persistence.*;
import lombok.Data;

@Entity(name = "service")
@Data
public class DefaultService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_en")
    private String nameEn;

    @Column(nullable = false, name = "name_pl")
    private String namePl;

    @ManyToOne
    @JoinColumn(nullable = false, name = "branch_id")
    private Branch branch;

}
