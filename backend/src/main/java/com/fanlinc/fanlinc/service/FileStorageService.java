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

    public String storeFile(MultipartFile file, Long uid) {
        // Normalize file name
        String fileName = "id" + uid.toString() + "+" + StringUtils.cleanPath(file.getOriginalFilename());
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            throw new FileStorageException("Sorry! Unable to convert file! " + fileName);
        }
        amazonS3Client.putObject(new PutObjectRequest("fanlinc", fileName, convertedFile));
        return fileName;
    }


//        try {
//            // Check if the file's name contains invalid characters
//            if(fileName.contains("..")) {
//                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
//            }
//
//            // Copy file to the target location (Replacing existing file with the same name)
//            Path targetLocation = this.fileStorageLocation.resolve(fileName);
//            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
//
//            return fileName;
//        } catch (IOException ex) {
//            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
//        }


//    public Resource loadFileAsResource(String fileName) {
//        try {
//            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
//            Resource resource = new UrlResource(filePath.toUri());
//            if(resource.exists()) {
//                return resource;
//            } else {
//                throw new MyFileNotFoundException("File not found " + fileName);
//            }
//        } catch (MalformedURLException ex) {
//            throw new MyFileNotFoundException("File not found " + fileName, ex);
//        }
//    }
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