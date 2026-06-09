package com.ansh.backend.repository;

import com.ansh.backend.model.Goal;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface GoalRepository extends MongoRepository<Goal, String> {
    List<Goal> findByUserEmailOrderByUpdatedAtDesc(String userEmail);
}
