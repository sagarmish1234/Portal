package com.example.myjwt.repo;

import com.example.myjwt.models.Issues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssuesRepository extends JpaRepository<Issues,Long>
{

     List<Issues> findAllByServiceLine(String serviceLine);

     @Query(value="select * from issues where id=?1",nativeQuery = true)
     Issues findIssuesById(Long id);
}
