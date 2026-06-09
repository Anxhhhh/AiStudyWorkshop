package com.ansh.backend.repository;

import com.ansh.backend.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByUserEmailOrderByUpdatedAtDesc(String userEmail);
}
