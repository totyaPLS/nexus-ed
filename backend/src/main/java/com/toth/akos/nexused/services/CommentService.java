package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.CommentDTO;
import com.toth.akos.nexused.entities.Comment;
import com.toth.akos.nexused.mappers.CommentMapper;
import com.toth.akos.nexused.repositories.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    public List<CommentDTO> getCommentsByAnnouncementId(int announcementId) {
        List<Comment> comments = commentRepository.findAllByAnnouncementId(announcementId);
        return commentMapper.toCommentDTOs(comments);
    }
}
