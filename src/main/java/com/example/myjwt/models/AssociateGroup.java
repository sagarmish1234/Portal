package com.example.myjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Associate_Groups")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssociateGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private Long userId;

    private String groupName;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "group")
    private Set<AssociateGroupMember> groupMembers;

    @Override
    public String toString() {
        return "AssociateGroup{" +
                "Id=" + Id +
                ", userId=" + userId +
                ", groupName='" + groupName + '\'' +
                '}';
    }
}