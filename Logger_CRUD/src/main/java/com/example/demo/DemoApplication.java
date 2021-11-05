
              package com.example.demo;
              import org.springframework.boot.SpringApplication;
              import org.springframework.boot.autoconfigure.SpringBootApplication;
              import org.springframework.web.bind.annotation.GetMapping;
              import org.springframework.web.bind.annotation.RestController;
              import org.springframework.web.bind.annotation.RequestBody;
              import org.springframework.web.bind.annotation.RequestMethod;
              import org.springframework.web.bind.annotation.RequestMapping;
              import org.springframework.beans.factory.annotation.Value;
              import org.slf4j.Logger;
              import org.slf4j.LoggerFactory;
              import java.util.ArrayList;
              import java.util.List;
              
              @SpringBootApplication
              @RestController
              public class DemoApplication {

                private Logger logger = LoggerFactory.getLogger(DemoApplication.class);
                List<String> fruits = new ArrayList<String>();
                
                @Value( "${my.property:unknown}" )
                private String myProperty;
                  
                @GetMapping("/listOfFruits")
                public List<String> getFruits() {
                  logger.info("List of Fruits will be send.");
                  return fruits;
                }

                @RequestMapping(value = "/addFruit", method = RequestMethod.POST)
                public List<String> addFruit(@RequestBody String paramProperty) {
                  logger.info("A new fruits will be added: {}", paramProperty);
                  this.fruits.add(paramProperty);
                  return this.fruits;
                }

                @RequestMapping(value = "/eatFruit", method = RequestMethod.DELETE)
                public List<String> eatFruit(@RequestBody String paramProperty) {
                  logger.info("A old fruits will be eaten: {}", paramProperty);
                  this.fruits.remove(paramProperty);
                  return this.fruits;
	              }


                  @GetMapping("/")
                  public String hello() {
                  logger.info("New User joined.");
                  return String.format("Hello %s!", myProperty);
                  }


                   public static void main(String[] args) {
                  SpringApplication.run(DemoApplication.class, args);
                  }
                
              }
            