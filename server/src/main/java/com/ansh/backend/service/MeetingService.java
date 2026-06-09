package com.ansh.backend.service;

import com.ansh.backend.model.Meeting;
import com.ansh.backend.repository.MeetingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MeetingService {
    private final MeetingRepository repository;

    public MeetingService(MeetingRepository repository) {
        this.repository = repository;
    }

    public List<Meeting> getAllForUser(String userEmail) {
        return repository.findByUserEmailOrderByUpdatedAtDesc(userEmail);
    }

    public Meeting create(String userEmail, Meeting entity) {
        entity.setUserEmail(userEmail);
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        return repository.save(entity);
    }

    public Meeting update(String userEmail, String id, Meeting updated) {
        Meeting existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (!existing.getUserEmail().equals(userEmail)) throw new IllegalArgumentException("Unauthorized");
        
        updated.setId(id);
        updated.setUserEmail(userEmail);
        updated.setCreatedAt(existing.getCreatedAt());
        updated.setUpdatedAt(LocalDateTime.now());
        return repository.save(updated);
    }

    public void delete(String userEmail, String id) {
        Meeting existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (!existing.getUserEmail().equals(userEmail)) throw new IllegalArgumentException("Unauthorized");
        repository.delete(existing);
    }
}
