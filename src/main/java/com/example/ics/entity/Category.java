package com.example.ics.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by razamd on 3/21/2017.
 */
@Entity
@Table(name = "CATEGORY")
public class Category implements Serializable{

    @Id
    private Long id;
    private String name;

    @OneToMany(mappedBy = "category",fetch = FetchType.LAZY)
    private Set<SubCategory> subCategorySet;

    public Category() {
    }

    public Category(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<SubCategory> getSubCategorySet() {
        return subCategorySet;
    }

    public void setSubCategorySet(Set<SubCategory> subCategorySet) {
        this.subCategorySet = subCategorySet;
    }
}
