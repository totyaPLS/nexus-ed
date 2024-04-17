package com.toth.akos.nexused.mappers;

import com.toth.akos.nexused.dtos.CommentDTO;
import com.toth.akos.nexused.entities.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    List<CommentDTO> toCommentDTOs(List<Comment> comments);
}
