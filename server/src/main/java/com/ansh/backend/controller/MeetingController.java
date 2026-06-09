package com.ansh.backend.controller;

import com.ansh.backend.model.Meeting;
import com.ansh.backend.service.MeetingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController {
    private final MeetingService service;

    public MeetingController(MeetingService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Meeting>> getAll(Authentication auth) {
        return ResponseEntity.ok(service.getAllForUser(auth.getName()));
    }

    @PostMapping
    public ResponseEntity<Meeting> create(Authentication auth, @RequestBody Meeting entity) {
        return ResponseEntity.ok(service.create(auth.getName(), entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meeting> update(Authentication auth, @PathVariable String id, @RequestBody Meeting entity) {
        return ResponseEntity.ok(service.update(auth.getName(), id, entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication auth, @PathVariable String id) {
        service.delete(auth.getName(), id);
        return ResponseEntity.ok().build();
    }
}
