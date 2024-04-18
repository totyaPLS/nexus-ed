package com.toth.akos.nexused.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDTO {
    private int id;
    private String personId;
    private int announcementId;
    private String text;
    private String published;
}
