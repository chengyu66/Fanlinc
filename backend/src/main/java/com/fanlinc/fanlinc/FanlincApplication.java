package com.fanlinc.fanlinc;


import com.fanlinc.fanlinc.config.ApplicationConfig;
import com.fanlinc.fanlinc.property.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageProperties.class
})
public class FanlincApplication {

	public static void main(String[] args) {
		SpringApplication.run(FanlincApplication.class, args);
	}

}
