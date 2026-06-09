package com.ansh.backend.controller;

import com.ansh.backend.model.Goal;
import com.ansh.backend.service.GoalService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {
    private final GoalService service;

    public GoalController(GoalService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Goal>> getAll(Authentication auth) {
        return ResponseEntity.ok(service.getAllForUser(auth.getName()));
    }

    @PostMapping
    public ResponseEntity<Goal> create(Authentication auth, @RequestBody Goal entity) {
        return ResponseEntity.ok(service.create(auth.getName(), entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Goal> update(Authentication auth, @PathVariable String id, @RequestBody Goal entity) {
        return ResponseEntity.ok(service.update(auth.getName(), id, entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication auth, @PathVariable String id) {
        service.delete(auth.getName(), id);
        return ResponseEntity.ok().build();
    }
}
