package com.ansh.backend.repository;

import com.ansh.backend.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findByUserEmailOrderByUpdatedAtDesc(String userEmail);
}
