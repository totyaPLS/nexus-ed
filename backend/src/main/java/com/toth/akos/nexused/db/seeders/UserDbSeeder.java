package com.toth.akos.nexused.db.seeders;

import com.toth.akos.nexused.dtos.SignUpDTO;
import com.toth.akos.nexused.dtos.StudentDTO;
import com.toth.akos.nexused.dtos.UserDTO;
import com.toth.akos.nexused.entities.ClassSchool;
import com.toth.akos.nexused.entities.User;
import com.toth.akos.nexused.enums.Role;
import com.toth.akos.nexused.exceptions.ApplicationException;
import com.toth.akos.nexused.mappers.UserMapper;
import com.toth.akos.nexused.repositories.ClassRepository;
import com.toth.akos.nexused.repositories.UserRepository;
import com.toth.akos.nexused.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@AllArgsConstructor
@Component
@Order(value = 1)
public class UserDbSeeder implements CommandLineRunner {
    private static final Random RANDOM = new Random();
    private static final int USER_AMOUNT = 50;
    private static final String NORMAL_REGEX = "\\p{M}";

    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final UserService userService;
    private final UserMapper userMapper;

    @Override
    public void run(String... args) {
        if (USER_AMOUNT >= 50) {
            loadUserData();
        } else {
            throw new ApplicationException("USER_AMOUNT must be more then 50", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    private void loadUserData() {
        if (userRepository.count() != 0) return;

        registerUser(Role.ADMIN);
        registerFormTeachersAndClasses();
        registerParentsWithStudents();
        registerTeachers();
    }

    private UserDTO registerUser(Role roleToBeRegistered) {
        SignUpDTO signUpDTO = genUserData(roleToBeRegistered);
        return userService.register(signUpDTO);
    }

    private SignUpDTO genUserData(Role roleToBeRegistered) {
        String firstName = genFirstName();
        String lastName = genLastName();
        String psw = "q1w2e3r4";
        String phone = genPhoneNumber();
        String pubEmail = genPubEmail(firstName, lastName);
        String schoolEmail = genSchoolEmail(firstName, lastName);
        String school = "Budapesti Fazekas Mihály Gimnázium";
        String residence = genResidence();
        String birthPlace = residence;
        Role role = roleToBeRegistered;
        LocalDate birthDate = genBirthDate(role);

        return new SignUpDTO(
                firstName, lastName, phone, pubEmail, schoolEmail, school, residence, birthPlace, birthDate,
                role, psw.toCharArray()
        );
    }

    private void registerFormTeachersAndClasses() {
        char[] classLetters = {'A', 'B', 'C'};
        for (int classLevel = 9; classLevel <= 12; classLevel++) {
            for (char classLetter : classLetters) {
                UserDTO registeredFT = registerUser(Role.TEACHER);
                Optional<User> foundFT = this.userRepository.findByPhoneAndAndBirthdate(registeredFT.getPhone(), registeredFT.getBirthdate());
                if (foundFT.isPresent()) {
                    loadClassData(foundFT.get().getUid(), classLevel, classLetter);
                }
            }
        }
    }

    private void registerParentsWithStudents() {
        for (int i = 0; i < USER_AMOUNT*0.4; i++) {
            UserDTO registeredParent = registerUser(Role.PARENT);
            List<ClassSchool> classes = classRepository.findAll();
            if(!classes.isEmpty()) {
                int classId = classes.get(RANDOM.nextInt(classes.size())).getId();
                SignUpDTO studentSignUpDTO = genUserData(Role.STUDENT);
                StudentDTO studentDTO = userMapper.userDTOToStudentDTO(studentSignUpDTO, classId, registeredParent.getUid());
                userService.createStudent(studentDTO);
            }
        }
    }

    private void registerTeachers() {
        for (int i = 0; i < USER_AMOUNT*0.2; i++) {
            registerUser(Role.TEACHER);
        }
    }

    private String genFirstName() {
        List<String> firstNames = new ArrayList<>();
        firstNames.add("Anna");
        firstNames.add("Bence");
        firstNames.add("Máté");
        firstNames.add("Dániel");
        firstNames.add("Emma");
        firstNames.add("Ferenc");
        firstNames.add("Gizella");
        firstNames.add("Dávid");
        firstNames.add("Ildikó");
        firstNames.add("János");
        firstNames.add("Katalin");
        firstNames.add("László");
        firstNames.add("Márta");
        firstNames.add("Norbert");
        firstNames.add("Orsolya");
        firstNames.add("Péter");
        firstNames.add("Réka");
        firstNames.add("Sándor");
        firstNames.add("Tímea");
        firstNames.add("Zoltán");

        int randomIndex = RANDOM.nextInt(firstNames.size());

        return firstNames.get(randomIndex);
    }

    private String genLastName() {
        List<String> lastNames = new ArrayList<>();
        lastNames.add("Kovács");
        lastNames.add("Nagy");
        lastNames.add("Szabó");
        lastNames.add("Horváth");
        lastNames.add("Tóth");
        lastNames.add("Kiss");
        lastNames.add("Molnár");
        lastNames.add("Varga");
        lastNames.add("Farkas");
        lastNames.add("Balogh");
        lastNames.add("Lakatos");
        lastNames.add("Papp");
        lastNames.add("Mészáros");
        lastNames.add("Simon");
        lastNames.add("Kovács");
        lastNames.add("Juhász");
        lastNames.add("Fekete");
        lastNames.add("Szűcs");
        lastNames.add("Takács");
        lastNames.add("Oláh");

        int randomIndex = RANDOM.nextInt(lastNames.size());

        return lastNames.get(randomIndex);
    }

    private String genPhoneNumber() {
        int[] prefixes = {70, 30, 20};
        int randomPrefixIndex = RANDOM.nextInt(prefixes.length);
        int serviceProviderPrefix = prefixes[randomPrefixIndex];

        int randomNumber = RANDOM.nextInt(9000000) + 1000000;

        return "+36/" + serviceProviderPrefix + "-" + randomNumber / 10000 + "-" + randomNumber % 10000;
    }

    private String genPubEmail(String firstName, String lastName) {
        return genEmail(firstName, lastName,"gmail.com");
    }

    private String genSchoolEmail(String firstName, String lastName) {
        return genEmail(firstName, lastName,"bfmg.com");
    }

    private String genEmail(String firstName, String lastName, String domain) {
        String firstNameNormalized = Normalizer.normalize(firstName, Normalizer.Form.NFD)
                .replaceAll(NORMAL_REGEX, "")
                .toLowerCase();

        String lastNameNormalized = Normalizer.normalize(lastName, Normalizer.Form.NFD)
                .replaceAll(NORMAL_REGEX, "")
                .toLowerCase();

        String lastNameClean = lastNameNormalized.replaceAll("[^a-zA-Z0-9]", "");

        int randomNumber = RANDOM.nextInt(100);

        return firstNameNormalized + "." + lastNameClean + String.format("%02d", randomNumber) + "@" + domain;
    }

    private String genResidence() {
            List<String> towns = new ArrayList<>();
            towns.add("Budapest");
            towns.add("Debrecen");
            towns.add("Szeged");
            towns.add("Miskolc");
            towns.add("Pécs");
            towns.add("Győr");
            towns.add("Nyíregyháza");
            towns.add("Kecskemét");
            towns.add("Székesfehérvár");
            towns.add("Szombathely");
            towns.add("Szolnok");
            towns.add("Tatabánya");
            towns.add("Kaposvár");
            towns.add("Érd");
            towns.add("Veszprém");
            towns.add("Békéscsaba");
            towns.add("Zalaegerszeg");
            towns.add("Sopron");
            towns.add("Eger");
            towns.add("Nagykanizsa");

            int randomIndex = RANDOM.nextInt(towns.size());

            return towns.get(randomIndex);
    }

    private LocalDate genBirthDate(Role role) {
        if (role == Role.ADMIN) {
            return LocalDate.of(2000, 1, 18);
        }

        Calendar calendar = new GregorianCalendar();

        int startYear = 2004;
        int endYear = 2008;

        if (role == Role.PARENT) {
            startYear = 1950;
            endYear = 1985;
        }

        if (role == Role.PARENT) {
            startYear = 1955;
            endYear = 1995;
        }

        int birthYear = RANDOM.nextInt(endYear - startYear + 1) + startYear;
        calendar.set(Calendar.YEAR, birthYear);

        int birthMonth = RANDOM.nextInt(12) + 1;
        calendar.set(Calendar.MONTH, birthMonth - 1);

        int maxDay = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
        int birthDay = RANDOM.nextInt(maxDay) + 1;

        calendar.set(Calendar.DAY_OF_MONTH, birthDay);

        return LocalDate.ofInstant(calendar.toInstant(), ZoneId.systemDefault());
    }

    private void loadClassData(String formTeacherId, int classLevel, char classLetter) {
        classRepository.save(new ClassSchool(0, formTeacherId, classLevel, classLetter));
    }
}
