package com.ansh.backend.service;

import com.ansh.backend.model.Task;
import com.ansh.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {
    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getAllForUser(String userEmail) {
        return repository.findByUserEmailOrderByUpdatedAtDesc(userEmail);
    }

    public Task create(String userEmail, Task entity) {
        entity.setUserEmail(userEmail);
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        return repository.save(entity);
    }

    public Task update(String userEmail, String id, Task updated) {
        Task existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (!existing.getUserEmail().equals(userEmail)) throw new IllegalArgumentException("Unauthorized");
        
        updated.setId(id);
        updated.setUserEmail(userEmail);
        updated.setCreatedAt(existing.getCreatedAt());
        updated.setUpdatedAt(LocalDateTime.now());
        return repository.save(updated);
    }

    public void delete(String userEmail, String id) {
        Task existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (!existing.getUserEmail().equals(userEmail)) throw new IllegalArgumentException("Unauthorized");
        repository.delete(existing);
    }
}
