package com.toth.akos.nexused.util;

import com.toth.akos.nexused.entities.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.security.SecureRandom;

public class UserIdGenerator implements IdentifierGenerator {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int ID_LENGTH = 6;

    @Override
    public Object generate(SharedSessionContractImplementor session, Object o) {
        SecureRandom random = new SecureRandom();
        String generatedId;
        do {
            StringBuilder sb = new StringBuilder(ID_LENGTH);
            for (int i = 0; i < ID_LENGTH; i++) {
                sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
            }
            generatedId = sb.toString();
        } while (!isUidUnique(session, generatedId));

        return generatedId;
    }

    private boolean isUidUnique(SharedSessionContractImplementor session, String uid) {
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        Root<User> root = query.from(User.class);
        query.select(builder.count(root));
        query.where(builder.equal(root.get("uid"), uid));

        Long count = session.createQuery(query).uniqueResult();
        return count == 0;
    }
}
