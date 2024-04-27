package com.toth.akos.nexused.services;

import com.toth.akos.nexused.dtos.GradeDTO;
import com.toth.akos.nexused.dtos.GradeDataForStudentDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.dtos.requests.TaskGradeReqDTO;
import com.toth.akos.nexused.entities.Grade;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.GradeMapper;
import com.toth.akos.nexused.repositories.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GradeService {
    private final GradeRepository gradeRepository;
    private final GradeMapper mapper;
    private final UserService userService;
    private final AuthService authService;

    public List<GradeDataForStudentDTO> getGradeTable(int subjectId, int classId) {
        List<Grade> grades = gradeRepository.findAllBySubjectIdAndClassId(subjectId, classId);
        List<GradeDTO> gradeDTOS = mapper.toGradeDTOs(grades);
        return convertToGradeDataForStudentDTO(gradeDTOS);
    }

    public List<GradeDataForStudentDTO> convertToGradeDataForStudentDTO(List<GradeDTO> gradeDTOs) {
        Map<String, List<GradeDTO>> gradesByStudentId = gradeDTOs.stream()
                .collect(Collectors.groupingBy(GradeDTO::studentId));

        List<GradeDataForStudentDTO> gradeDataForStudentDTOs = new ArrayList<>();

        for (Map.Entry<String, List<GradeDTO>> entry : gradesByStudentId.entrySet()) {
            String studentId = entry.getKey();
            List<GradeDTO> grades = entry.getValue();

            // Fetch studentName from repository
            UserDTO userDTO = userService.getUserById(studentId);
            String studentName = userDTO.getLastName() + " " + userDTO.getFirstName();

            GradeDataForStudentDTO gradeDataForStudentDTO = new GradeDataForStudentDTO();
            gradeDataForStudentDTO.setStudentId(studentId);
            gradeDataForStudentDTO.setStudentName(studentName);
            gradeDataForStudentDTO.setTeacherId(grades.getFirst().teacherId());
            gradeDataForStudentDTO.setSubjectId(grades.getFirst().subjectId());
            gradeDataForStudentDTO.setClassId(grades.getFirst().classId());

            // Group grades by month
            Map<String, List<GradeDTO>> gradesByMonth = grades.stream()
                    .collect(Collectors.groupingBy(GradeDTO::created));

            List<List<GradeDataForStudentDTO.GradeValueDTO>> gradesPerMonth = gradesByMonth.entrySet().stream()
                    .map(monthEntry -> {
                        String month = monthEntry.getKey();
                        List<GradeDTO> gradesInMonth = monthEntry.getValue();
                        return gradesInMonth.stream()
                                .map(gradeDTO -> new GradeDataForStudentDTO.GradeValueDTO(
                                        gradeDTO.created(),
                                        gradeDTO.gradeValue(),
                                        gradeDTO.weight()))
                                .collect(Collectors.toList());
                    })
                    .collect(Collectors.toList());

            gradeDataForStudentDTO.setGradesPerMonth(gradesPerMonth);
            gradeDataForStudentDTOs.add(gradeDataForStudentDTO);
        }

        return gradeDataForStudentDTOs;
    }

    public Grade uploadGrade(TaskGradeReqDTO taskGradeReqDTO) {
        taskGradeReqDTO.setTeacherId(authService.getPrincipalUid());
        taskGradeReqDTO.setCreated(LocalDateTime.now());
        return gradeRepository.save(mapper.toGrade(taskGradeReqDTO));
    }

    public Grade getGradeById(int id) {
        Optional<Grade> oGrade = gradeRepository.findById(id);
        if (oGrade.isEmpty()) {
            throw new ApplicationException("Grade not found", HttpStatus.NOT_FOUND);
        }
        return oGrade.get();
    }
}
