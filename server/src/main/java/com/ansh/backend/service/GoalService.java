package com.ansh.backend.service;

import com.ansh.backend.model.Goal;
import com.ansh.backend.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GoalService {
    private final GoalRepository repository;

    public GoalService(GoalRepository repository) {
        this.repository = repository;
    }

    public List<Goal> getAllForUser(String userEmail) {
        return repository.findByUserEmailOrderByUpdatedAtDesc(userEmail);
    }

    public Goal create(String userEmail, Goal entity) {
        entity.setUserEmail(userEmail);
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        return repository.save(entity);
    }

    public Goal update(String userEmail, String id, Goal updated) {
        Goal existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (!existing.getUserEmail().equals(userEmail)) throw new IllegalArgumentException("Unauthorized");
        
        updated.setId(id);
        updated.setUserEmail(userEmail);
        updated.setCreatedAt(existing.getCreatedAt());
        updated.setUpdatedAt(LocalDateTime.now());
        return repository.save(updated);
    }

    public void delete(String userEmail, String id) {
        Goal existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (!existing.getUserEmail().equals(userEmail)) throw new IllegalArgumentException("Unauthorized");
        repository.delete(existing);
    }
}
