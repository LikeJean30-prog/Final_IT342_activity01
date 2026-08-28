package edu.cit.manubag.activity01.controller;

import edu.cit.manubag.activity01.dto.ServiceRequestRequest;
import edu.cit.manubag.activity01.dto.ServiceRequestResponse;
import edu.cit.manubag.activity01.model.ServiceRequest;
import edu.cit.manubag.activity01.service.ServiceRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    public ServiceRequestController(ServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    private ServiceRequestResponse toResponse(ServiceRequest sr) {
        return new ServiceRequestResponse(
                sr.getId(),
                sr.getTitle(),
                sr.getDescription(),
                sr.getCategory(),
                sr.getDateCreated(),
                sr.getOwner().getUsername()
        );
    }

    @PostMapping
    public ResponseEntity<?> create(Authentication auth, @RequestBody ServiceRequestRequest request) {
        try {
            ServiceRequest sr = serviceRequestService.create(auth.getName(), request);
            return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(sr));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create service request.");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAll(Authentication auth) {
        List<ServiceRequestResponse> responses = serviceRequestService.getAllForUser(auth.getName())
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(Authentication auth, @PathVariable Long id) {
        try {
            ServiceRequest sr = serviceRequestService.getOwnedOrThrow(id, auth.getName());

            if (sr == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service request not found.");
            }

            return ResponseEntity.ok(toResponse(sr));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have access to this service request.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(Authentication auth, @PathVariable Long id,
                                    @RequestBody ServiceRequestRequest request) {
        try {
            ServiceRequest sr = serviceRequestService.update(id, auth.getName(), request);

            if (sr == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service request not found.");
            }

            return ResponseEntity.ok(toResponse(sr));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have access to this service request.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Authentication auth, @PathVariable Long id) {
        try {
            boolean deleted = serviceRequestService.delete(id, auth.getName());

            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service request not found.");
            }

            return ResponseEntity.ok("Service request deleted successfully.");
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have access to this service request.");
        }
    }
}