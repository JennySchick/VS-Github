
              package com.example.demo;
              import org.springframework.boot.SpringApplication;
              import org.springframework.boot.autoconfigure.SpringBootApplication;
              import org.springframework.web.bind.annotation.GetMapping;
              import org.springframework.web.bind.annotation.RestController;
              import org.springframework.web.bind.annotation.RequestParam;
              import org.springframework.beans.factory.annotation.Value;
              
              @SpringBootApplication
              @RestController
              public class DemoApplication {
                
                @Value( "${my.property:defaultValue}" )
                private String myProperty;
                  
                  public static void main(String[] args) {
                  SpringApplication.run(DemoApplication.class, args);
                  }

                  @GetMapping("/hello")
                  public String hello() {
                  return String.format("Hello %s!", myProperty);
                  }
                
              }
            