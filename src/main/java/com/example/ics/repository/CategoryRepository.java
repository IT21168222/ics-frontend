package com.example.ics.repository;

import com.example.ics.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by razamd on 3/25/2017.
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
