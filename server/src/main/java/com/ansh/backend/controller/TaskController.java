package com.ansh.backend.controller;

import com.ansh.backend.model.Task;
import com.ansh.backend.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAll(Authentication auth) {
        return ResponseEntity.ok(service.getAllForUser(auth.getName()));
    }

    @PostMapping
    public ResponseEntity<Task> create(Authentication auth, @RequestBody Task entity) {
        return ResponseEntity.ok(service.create(auth.getName(), entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(Authentication auth, @PathVariable String id, @RequestBody Task entity) {
        return ResponseEntity.ok(service.update(auth.getName(), id, entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication auth, @PathVariable String id) {
        service.delete(auth.getName(), id);
        return ResponseEntity.ok().build();
    }
}
