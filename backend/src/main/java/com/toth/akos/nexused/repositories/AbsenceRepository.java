package com.toth.akos.nexused.repositories;

import com.toth.akos.nexused.entities.Absence;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AbsenceRepository extends JpaRepository<Absence, Integer> {
    @Query("SELECT a FROM Absence a " +
            "INNER JOIN User u ON a.user.uid = u.uid " +
            "INNER JOIN Lesson l ON a.lesson.id = l.id " +
            "WHERE a.subjectId = :subjectId AND a.classId = :classId")
    Page<Absence> findPagedBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId,
            Pageable pageable
    );

    @Query("SELECT a FROM Absence a " +
            "INNER JOIN User u ON a.user.uid = u.uid " +
            "INNER JOIN Lesson l ON a.lesson.id = l.id " +
            "WHERE a.user.uid = :studentId AND a.subjectId = :subjectId AND a.classId = :classId")
    Page<Absence> findPagedByStudentIdSubjectIdAndClassId(
            @Param("studentId") String studentId,
            @Param("subjectId") int subjectId,
            @Param("classId") int classId,
            Pageable pageable
    );

    @Query("SELECT a FROM Absence a " +
            "INNER JOIN User u ON a.user.uid = u.uid " +
            "INNER JOIN Lesson l ON a.lesson.id = l.id " +
            "WHERE a.subjectId = :subjectId AND a.classId = :classId")
    List<Absence> findAllBySubjectIdAndClassId(
            @Param("subjectId") int subjectId,
            @Param("classId") int classId
    );

    @Query("SELECT a FROM Absence a " +
            "INNER JOIN User u ON a.user.uid = u.uid " +
            "INNER JOIN Lesson l ON a.lesson.id = l.id " +
            "WHERE a.user.uid = :studentId AND a.subjectId = :subjectId AND a.classId = :classId")
    List<Absence> findAllByStudentIdAndSubjectIdAndClassId(
            @Param("studentId") String studentId,
            @Param("subjectId") int subjectId,
            @Param("classId") int classId
    );

    @Query("SELECT a FROM Absence a " +
            "INNER JOIN User u ON a.user.uid = u.uid " +
            "WHERE a.id = :absenceId")
    Optional<Absence> findByIdWithUserInfo(@Param("absenceId") int absenceId);
}
