package com.toth.akos.nexused.dataloader;

import com.toth.akos.nexused.dtos.SignUpDTO;
import com.toth.akos.nexused.enums.Role;
import com.toth.akos.nexused.repositories.UserRepository;
import com.toth.akos.nexused.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.CharBuffer;
import java.text.Normalizer;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@AllArgsConstructor
@Order(value = 2)
@Component
public class UserDataLoader implements CommandLineRunner {
    private static final Random RANDOM = new Random();
    private static final int USER_AMOUNT = 100;
    private static final String NORMAL_REGEX = "\\p{M}";

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    public void run(String... args) {
        loadUserData();
    }

    private void loadUserData() {
        if (userRepository.count() != 0) return;

        for (int i = 0; i < USER_AMOUNT; i++) {
            String firstName = genFirstName();
            String lastName = genLastName();
            String psw = genPassword();
            String phone = genPhoneNumber();
            String pubEmail = genPubEmail(firstName, lastName);
            String schoolEmail = genSchoolEmail(firstName, lastName);
            String school = "Budapesti Fazekas Mihály Gimnázium";
            String residence = genResidence();
            String birthPlace = residence;
            Role role = genRole();
            LocalDate birthDate = genBirthDate(role);

            SignUpDTO signUpDTO = new SignUpDTO(
                    firstName, lastName, phone, pubEmail, schoolEmail, school, residence, birthPlace, birthDate,
                    role, psw.toCharArray()
            );

            userService.register(signUpDTO);
        }
    }

    private String genPassword() {
        return passwordEncoder.encode(CharBuffer.wrap("q1w2e3r4"));
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
        String firstNameNormalized = Normalizer.normalize(firstName, Normalizer.Form.NFD)
                .replaceAll(NORMAL_REGEX, "")
                .toLowerCase();

        String lastNameNormalized = Normalizer.normalize(lastName, Normalizer.Form.NFD)
                .replaceAll(NORMAL_REGEX, "")
                .toLowerCase();

        String lastNameClean = lastNameNormalized.replaceAll("[^a-zA-Z0-9]", "");

        int randomNumber = RANDOM.nextInt(100);

        return firstNameNormalized + "." + lastNameClean + String.format("%02d", randomNumber) + "@gmail.com";
    }

    private String genSchoolEmail(String firstName, String lastName) {
        String firstNameNormalized = Normalizer.normalize(firstName, Normalizer.Form.NFD)
                .replaceAll(NORMAL_REGEX, "")
                .toLowerCase();

        String lastNameNormalized = Normalizer.normalize(lastName, Normalizer.Form.NFD)
                .replaceAll(NORMAL_REGEX, "")
                .toLowerCase();

        String lastNameClean = lastNameNormalized.replaceAll("[^a-zA-Z0-9]", "");

        int randomNumber = RANDOM.nextInt(100);

        return firstNameNormalized + "." + lastNameClean + String.format("%02d", randomNumber) + "@bfmg.com";
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

        if (role == Role.TEACHER || role == Role.FORM_TEACHER) {
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

    private Role genRole() {
        if (userRepository.findByRole(Role.ADMIN).isEmpty()) {
            return Role.ADMIN;
        }

        if (userRepository.countByRole(Role.FORM_TEACHER) < USER_AMOUNT * 0.06) {
            return Role.FORM_TEACHER;
        }

        if (userRepository.countByRole(Role.PARENT) < USER_AMOUNT * 0.4) {
            return Role.PARENT;
        }

        if (userRepository.countByRole(Role.STUDENT) < USER_AMOUNT * 0.4) {
            return Role.STUDENT;
        }

        if (userRepository.countByRole(Role.TEACHER) < USER_AMOUNT * 0.14) {
            return Role.TEACHER;
        }

        return Role.STUDENT;
    }
}
