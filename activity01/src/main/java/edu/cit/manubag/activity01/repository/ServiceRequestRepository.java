package edu.cit.manubag.activity01.repository;

import edu.cit.manubag.activity01.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    List<ServiceRequest> findByOwner_Username(String username);

    Optional<ServiceRequest> findByIdAndOwner_Username(Long id, String username);
}