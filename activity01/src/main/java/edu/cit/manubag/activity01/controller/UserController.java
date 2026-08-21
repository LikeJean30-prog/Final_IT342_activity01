package edu.cit.manubag.activity01.controller;

import edu.cit.manubag.activity01.model.User;
import edu.cit.manubag.activity01.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(
                user.getUsername(),
                user.getPassword()
        );
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}