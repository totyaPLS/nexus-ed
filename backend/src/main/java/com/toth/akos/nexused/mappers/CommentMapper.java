package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.CommentDTO;
import com.toth.akos.nexused.entities.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    List<CommentDTO> toCommentDTOs(List<Comment> comments);

    Comment toComment(CommentDTO commentDTO);
}
