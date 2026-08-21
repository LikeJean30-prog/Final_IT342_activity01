package edu.cit.manubag.activity01.controller;

import edu.cit.manubag.activity01.dto.UserResponse;
import edu.cit.manubag.activity01.model.User;
import edu.cit.manubag.activity01.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://127.0.0.1:5173"
        }
)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {

            User registeredUser = userService.register(user);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new UserResponse(
                            registeredUser.getId(),
                            registeredUser.getUsername()
                    ));

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Registration failed.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User loggedInUser = userService.login(
                user.getUsername(),
                user.getPassword()
        );

        if (loggedInUser == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password.");
        }

        return ResponseEntity.ok(
                new UserResponse(
                        loggedInUser.getId(),
                        loggedInUser.getUsername()
                )
        );
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {

        User user = userService.getUserById(id);

        if (user == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User not found.");
        }

        return ResponseEntity.ok(
                new UserResponse(
                        user.getId(),
                        user.getUsername()
                )
        );
    }
}