package com.fanlinc.fanlinc.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class ApplicationConfig {

    @Bean
    public BasicAWSCredentials basicAWSCredentials() {
        return new BasicAWSCredentials("852EDAA06761059F3E42", "hyMjq81QQN9e7oPxUwpWSScfNbR28IS0CgihC9Cm");
    }



    @Bean
    public AmazonS3 amazonS3Client(AWSCredentials credentials,
                                          @Value("${cloud.aws.region.static}") String region) {

        AmazonS3ClientBuilder builder = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials));
        builder.setEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration("https://s3.filebase.com", "us-east-1"));
        return builder.build();
    }
}
