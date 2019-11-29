package com.fanlinc.fanlinc.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import com.fanlinc.fanlinc.exceptions.FileStorageException;
import com.fanlinc.fanlinc.property.FileStorageProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Service
public class FileStorageService {


    @Autowired
    private AmazonS3 amazonS3Client;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
    }

    public void storeFile(MultipartFile file, String fileName) {
        // Normalize file name
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            throw new FileStorageException("Sorry! Unable to convert file! " + fileName);
        }
        amazonS3Client.putObject(new PutObjectRequest("fanlinc", fileName, convertedFile));
    }

    public byte[] downloadFile(String fileName) {
        S3Object object = amazonS3Client.getObject("fanlinc",  fileName);
        byte[] byteArray = null;
        try {
            byteArray = IOUtils.toByteArray(object.getObjectContent());
        }catch (IOException ex){
            System.out.println("unable to convert to ByteArray");
        }
        return byteArray;
    }
}