package edu.cit.manubag.activity01.service;

import edu.cit.manubag.activity01.dto.ServiceRequestRequest;
import edu.cit.manubag.activity01.model.ServiceRequest;
import edu.cit.manubag.activity01.model.User;
import edu.cit.manubag.activity01.repository.ServiceRequestRepository;
import edu.cit.manubag.activity01.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;
    private final UserRepository userRepository;

    public ServiceRequestService(ServiceRequestRepository serviceRequestRepository,
                                 UserRepository userRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.userRepository = userRepository;
    }

    private User getUserOrThrow(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found."));
    }

    public ServiceRequest create(String username, ServiceRequestRequest request) {
        User owner = getUserOrThrow(username);

        ServiceRequest sr = new ServiceRequest();
        sr.setTitle(request.getTitle());
        sr.setDescription(request.getDescription());
        sr.setCategory(request.getCategory());
        sr.setOwner(owner);

        return serviceRequestRepository.save(sr);
    }

    public List<ServiceRequest> getAllForUser(String username) {
        return serviceRequestRepository.findByOwner_Username(username);
    }

    // Returns null if not found, throws if found but not owned by this user
    public ServiceRequest getOwnedOrThrow(Long id, String username) {
        ServiceRequest sr = serviceRequestRepository.findById(id).orElse(null);

        if (sr == null) {
            return null;
        }

        if (!sr.getOwner().getUsername().equals(username)) {
            throw new SecurityException("You do not have access to this service request.");
        }

        return sr;
    }

    public ServiceRequest update(Long id, String username, ServiceRequestRequest request) {
        ServiceRequest sr = getOwnedOrThrow(id, username);

        if (sr == null) {
            return null;
        }

        sr.setTitle(request.getTitle());
        sr.setDescription(request.getDescription());
        sr.setCategory(request.getCategory());

        return serviceRequestRepository.save(sr);
    }

    public boolean delete(Long id, String username) {
        ServiceRequest sr = getOwnedOrThrow(id, username);

        if (sr == null) {
            return false;
        }

        serviceRequestRepository.delete(sr);
        return true;
    }
}