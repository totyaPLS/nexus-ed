package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.CommentDTO;
import com.toth.akos.nexused.entities.Comment;
import com.toth.akos.nexused.mappers.CommentMapper;
import com.toth.akos.nexused.repositories.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final AuthService authService;

    public List<CommentDTO> getCommentsByAnnouncementId(int announcementId) {
        List<Comment> comments = commentRepository.findAllByAnnouncementId(announcementId);
        return commentMapper.toCommentDTOs(comments);
    }

    public void addComment(CommentDTO commentDTO) {
        commentDTO.setPersonId(authService.getPrincipalUid());
        commentDTO.setPublished(LocalDateTime.now().toString());
        Comment comment = commentMapper.toComment(commentDTO);
        commentRepository.save(comment);
    }
}
