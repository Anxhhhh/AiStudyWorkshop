package com.ansh.backend.controller;

import com.ansh.backend.model.Note;
import com.ansh.backend.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    private final NoteService service;

    public NoteController(NoteService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Note>> getAll(Authentication auth) {
        return ResponseEntity.ok(service.getAllForUser(auth.getName()));
    }

    @PostMapping
    public ResponseEntity<Note> create(Authentication auth, @RequestBody Note entity) {
        return ResponseEntity.ok(service.create(auth.getName(), entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> update(Authentication auth, @PathVariable String id, @RequestBody Note entity) {
        return ResponseEntity.ok(service.update(auth.getName(), id, entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication auth, @PathVariable String id) {
        service.delete(auth.getName(), id);
        return ResponseEntity.ok().build();
    }
}
