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
@Table(name = "task")
@SecondaryTable(name = "announcement", pkJoinColumns = @PrimaryKeyJoinColumn(name = "id"))
public class TaskWithAnnouncement {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "announcement_id")
    private int announcementId;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @Column(name = "type")
    private String type;

    @OneToOne
    @JoinColumn(name = "announcement_id")
    private Announcement announcement;
}