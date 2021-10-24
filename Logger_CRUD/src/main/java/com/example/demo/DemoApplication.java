
              package com.example.demo;
              import org.springframework.boot.SpringApplication;
              import org.springframework.boot.autoconfigure.SpringBootApplication;
              import org.springframework.web.bind.annotation.GetMapping;
              import org.springframework.web.bind.annotation.RestController;
              import org.springframework.web.bind.annotation.PathVariable;
              import org.springframework.beans.factory.annotation.Value;
              import org.springframework.web.bind.annotation.PostMapping;
              import org.slf4j.Logger;
              import org.slf4j.LoggerFactory;
              
              @SpringBootApplication
              @RestController
              public class DemoApplication {

                private Logger logger = LoggerFactory.getLogger(DemoApplication.class);
                
                @Value( "${my.property:unknown}" )
                private String myProperty;
                  
                  public static void main(String[] args) {
                  SpringApplication.run(DemoApplication.class, args);
                  }

                  @GetMapping("/")
                  public String hello() {
                  logger.info("New User joined.");
                  return String.format("Hello %s!", myProperty);
                  }
                
              }
            