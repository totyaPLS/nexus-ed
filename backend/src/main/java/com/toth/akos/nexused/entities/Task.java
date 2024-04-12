package com.toth.akos.nexused.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Task {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "announcement_id")
    private int announcementId;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @Column(name = "status")
    private String status;

    @Column(name = "type")
    private String type;
}