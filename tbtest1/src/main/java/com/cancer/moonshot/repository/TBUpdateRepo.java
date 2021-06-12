package com.cancer.moonshot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cancer.moonshot.entity.TumorBoardDetailsEntity;

public interface TBUpdateRepo extends JpaRepository<TumorBoardDetailsEntity, Integer>{

}
