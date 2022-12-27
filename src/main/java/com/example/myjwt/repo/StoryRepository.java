package com.example.myjwt.repo;

import com.example.myjwt.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoryRepository extends JpaRepository<Story,Long> {

    Optional<List<Story>> findByOwner(AssignmentUser user);

    Long countByOwner(AssignmentUserRepository user);

    Optional<List<Story>> findBySprint(Sprint sprint);

    Optional<List<Story>> findByEpic(Epic epic);

    List<Story> findByEpicAndStoryStatus(Epic epic, Category category);

    long countByEpic(Epic epic);

//    List<Story> findByEpicAndCurrentStatus(Epic epic, String status);

    long countByEpicAndStoryStatus(Epic epic, Category category);
    
    List<Story> findByOwnerIn(List<AssignmentUser> ownerIdList);

//    List<Story> findByEpicIdAndOwnerIdIn(Long epicId, List<Long> ownerIdList);

    List<Story> findByEpicId(Long epicId);
    List<Story> findBySprintId(Long sprintId);

//    @Query("SELECT epic_id FROM story where owner_id in (?1) group by epic_id;")
//    List<Long> getAssociateEpics(List<Long> ownerIdList);

//    List<Story> findDistinctEpicByOwnerIn(List<Long> ownerIdList);


    List<Story> findBySprintAndOwnerIn(Sprint sprint, List<AssignmentUser> ownerList);

    List<Story> findByOwnerAndStoryStatus(AssignmentUser user,Category storyStatus);

}