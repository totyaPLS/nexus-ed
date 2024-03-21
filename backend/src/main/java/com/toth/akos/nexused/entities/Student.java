package com.toth.akos.nexused.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Student {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "class_id")
    private int classId;

    @Column(name = "parent_id")
    private String parentId;
}
