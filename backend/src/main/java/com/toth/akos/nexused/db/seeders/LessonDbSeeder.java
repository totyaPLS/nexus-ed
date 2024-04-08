package com.toth.akos.nexused.db.seeders;

import com.toth.akos.nexused.entities.Lesson;
import com.toth.akos.nexused.entities.Teaching;
import com.toth.akos.nexused.repositories.LessonRepository;
import com.toth.akos.nexused.repositories.TeachingRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@AllArgsConstructor
@Component
@Order(value = 4)
public class LessonDbSeeder implements CommandLineRunner {
    private static final LocalDate SCHOOL_START = LocalDate.of(2024, 4, 1);
    private static final LocalDate SCHOOL_END = LocalDate.of(2024, 6, 1);
    private static final int DAYS_IN_WEEK = 5;

    private final LessonRepository lessonRepository;
    private final TeachingRepository teachingRepository;
    private final List<List<Teaching>> weekdayTeachings;
    private static final Random RANDOM = new Random();

    @Override
    public void run(String... args) {
        if (lessonRepository.count() != 0) return;
        seedLessonDb();
    }

    private void seedLessonDb() {
        setWeekdayTeachings();
        lessonRepository.saveAll(genTimetable());
    }

    private List<Lesson> genTimetable() {
        List<Lesson> timetable = new ArrayList<>();
        List<Teaching> weekTeachings = genOneWeekTeaching();
        Collections.shuffle(weekTeachings);

        LocalDate currentDate = SCHOOL_START;
        while (!currentDate.isAfter(SCHOOL_END)) {
            // Check if the current date is a weekday (Monday to Friday)
            if (currentDate.getDayOfWeek() != DayOfWeek.SATURDAY && currentDate.getDayOfWeek() != DayOfWeek.SUNDAY) {
                LocalDateTime lessonStarts = LocalDateTime.of(currentDate, LocalTime.of(8, 0));
                LocalDateTime lessonEnds = lessonStarts.plusMinutes(45);
                List<Teaching> todaysTeachings = weekdayTeachings.get(convertDayOfWeekToInt(currentDate));
                for (Teaching todaysTeaching : todaysTeachings) {
                    String randomClassRoom = String.valueOf(RANDOM.nextInt(130 - 100) + 100);
                    Lesson lesson = new Lesson(
                            0, todaysTeaching.getId(), null, lessonStarts, lessonEnds, randomClassRoom,
                            "#FFC7E8", "#FFC7E8", "#212121"
                    );
                    timetable.add(lesson);
                    lessonStarts = lessonStarts.plusMinutes(55);
                    lessonEnds = lessonEnds.plusMinutes(55);
                }
            }
            currentDate = currentDate.plusDays(1);
        }

        return timetable;
    }

    public int convertDayOfWeekToInt(LocalDate date) {
        return date.getDayOfWeek().getValue() - 1;
    }

    private void setWeekdayTeachings() {
        List<Teaching> weekTeachings = genOneWeekTeaching();
        Collections.shuffle(weekTeachings);
        int index = 0;
        for (int i = 0; i < DAYS_IN_WEEK; i++) {
            List<Teaching> dailyTeachings = new ArrayList<>();
            for (int j = 0; j < 5 + (int) (Math.random() * 3); j++) {
                if (index < weekTeachings.size()) {
                    dailyTeachings.add(weekTeachings.get(index++));
                }
            }
            weekdayTeachings.add(dailyTeachings);
        }
    }

    private List<Teaching> genOneWeekTeaching() {
        List<Teaching> teachings = teachingRepository.findAllByClassId(1);
        List<Teaching> oneWeekTeachings = new ArrayList<>();

        for (int i = 0; i < 30; i++) {
            Teaching teaching = teachings.get(RANDOM.nextInt(teachings.size()));

            if (countOccurrences(oneWeekTeachings, teaching) < 4) {
                oneWeekTeachings.add(teaching);
            } else {
                // If the lesson has occurred 3 times, remove it from the original list
                teachings.remove(teaching);
                // Check if there are still elements in the original list
                if (teachings.isEmpty()) {
                    break; // Break the loop if all lessons have occurred 3 times
                }
                // Decrement the loop counter to ensure 30 lessons in total
                i--;
            }
        }

        return oneWeekTeachings;
    }

    private int countOccurrences(List<Teaching> oneWeekTeachings, Teaching randomTeaching) {
        int count = 0;
        for (Teaching teaching : oneWeekTeachings) {
            if (teaching.getId() == randomTeaching.getId()) {
                count++;
            }
        }
        return count;
    }
}
