package com.mdmk.youneed.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "company_name")
    @NotEmpty
    private String name;

    @Column(unique = true, nullable = false)
    @Size(min = 10, max = 10)
    private String nip;

    @Column(unique = true, nullable = false)
    @Size(min = 9, max = 14)
    private String regon;

    @Column
    private String street;

    @Column
    private String building;

    @Column
    private String apartment;

    @Column(nullable = false)
    @NotEmpty
    private String city;

    @Column(nullable = false)
    @NotEmpty
    private String state;

    @Column(nullable = false)
    @NotEmpty
    private String country;

    @Column
    @NotEmpty
    private String postalCode;

    @Column(nullable = false)
    @NotEmpty
    private String phoneNumber;

    @Column(nullable = false)
    @NotEmpty
    private String email;

    @OneToMany
    private List<Employee> employees;
}
