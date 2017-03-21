package com.example.ics.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by razamd on 3/21/2017.
 */
@Entity
@Table(name = "CATEGORY")
public class Category implements Serializable{

    @Id
    private Long id;
    private String name;

    public Category() {
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
}
