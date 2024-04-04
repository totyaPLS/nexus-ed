package com.toth.akos.nexused.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Lesson {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "teaching_id")
    private int teachingId;

    @Column(name = "topic")
    private String topic;

    @Column(name = "start")
    private Instant start;

    @Column(name = "end")
    private Instant end;

    @Column(name = "background_color")
    private String backgroundColor;

    @Column(name = "border_color")
    private String borderColor;

    @Column(name = "text_color")
    private String text_color;
}
