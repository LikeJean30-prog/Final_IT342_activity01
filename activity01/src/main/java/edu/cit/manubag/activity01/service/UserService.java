package edu.cit.manubag.activity01.service;

import edu.cit.manubag.activity01.model.User;
import edu.cit.manubag.activity01.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        return userRepository.save(user);
    }

    public User login(String username, String password) {

        User user = userRepository.findByUsername(username)
                .orElse(null);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }

        return null;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElse(null);
    }
}