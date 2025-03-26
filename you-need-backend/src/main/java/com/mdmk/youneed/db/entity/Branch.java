package com.mdmk.youneed.db.entity;

import com.mdmk.youneed.db.dataentity.DefaultService;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_en")
    private String nameEn;

    @Column(nullable = false, name = "name_pl")
    private String namePl;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Branch parent;

    @OneToMany(mappedBy = "parent")
    private List<Branch> children;

    @OneToMany
    private List<DefaultService> services;

}
