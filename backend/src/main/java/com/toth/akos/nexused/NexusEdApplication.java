package com.toth.akos.nexused;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class NexusEdApplication {

	public static void main(String[] args) {
		SpringApplication.run(NexusEdApplication.class, args);
	}

}
