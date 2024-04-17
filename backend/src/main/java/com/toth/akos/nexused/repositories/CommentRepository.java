package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findAllByAnnouncementId(Integer announcementId);
}
