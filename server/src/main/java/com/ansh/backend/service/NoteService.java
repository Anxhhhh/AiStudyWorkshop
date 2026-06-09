package com.ansh.backend.service;

import com.ansh.backend.model.Note;
import com.ansh.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoteService {
    private final NoteRepository repository;

    public NoteService(NoteRepository repository) {
        this.repository = repository;
    }

    public List<Note> getAllForUser(String userEmail) {
        return repository.findByUserEmailOrderByUpdatedAtDesc(userEmail);
    }

    public Note create(String userEmail, Note entity) {
        entity.setUserEmail(userEmail);
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        return repository.save(entity);
    }

    public Note update(String userEmail, String id, Note updated) {
        Note existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (!existing.getUserEmail().equals(userEmail)) throw new IllegalArgumentException("Unauthorized");
        
        updated.setId(id);
        updated.setUserEmail(userEmail);
        updated.setCreatedAt(existing.getCreatedAt());
        updated.setUpdatedAt(LocalDateTime.now());
        return repository.save(updated);
    }

    public void delete(String userEmail, String id) {
        Note existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (!existing.getUserEmail().equals(userEmail)) throw new IllegalArgumentException("Unauthorized");
        repository.delete(existing);
    }
}
