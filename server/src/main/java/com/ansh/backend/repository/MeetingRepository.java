package com.ansh.backend.repository;

import com.ansh.backend.model.Meeting;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MeetingRepository extends MongoRepository<Meeting, String> {
    List<Meeting> findByUserEmailOrderByUpdatedAtDesc(String userEmail);
}
