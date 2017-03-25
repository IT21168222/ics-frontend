package com.example.ics.restcontroller;

import com.example.ics.entity.Category;
import com.example.ics.entity.SubCategory;
import com.example.ics.repository.CategoryRepository;
import com.example.ics.repository.SubCategoryRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by razamd on 3/25/2017.
 */
@RestController
@RequestMapping("/api/")
public class TestRestController {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    SubCategoryRepository subCategoryRepository;

    @GetMapping("/test")
    //@Transactional
    public ResponseEntity<?> test(){
//        Category category = new Category(1L, "Test Category 1");
//        SubCategory subCategory = new SubCategory(1L,"Test SubCategory 1");
//
//        categoryRepository.save(category);
//        subCategory.setCategory(category);
//        subCategoryRepository.save(subCategory);

        Category category1 = categoryRepository.findOne(1L);
        //Hibernate.initialize(category1.getSubCategorySet());

        System.out.println(category1.getSubCategorySet().size());

        return null;
    }
}
