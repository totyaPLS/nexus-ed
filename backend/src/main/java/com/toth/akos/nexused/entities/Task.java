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
    @Id
    @Column(name = "announcement_id")
    private Integer announcementId;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @Column(name = "type")
    private String type;

    @OneToOne()
    @JoinColumn(name = "announcement_id")
    @MapsId
    private Announcement announcement;
}