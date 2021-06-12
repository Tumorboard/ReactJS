package com.cancer.moonshot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cancer.moonshot.entity.NotificationsEntity;

	@Repository
	public interface TBNotificationsRepository extends JpaRepository<NotificationsEntity, String>{

}
