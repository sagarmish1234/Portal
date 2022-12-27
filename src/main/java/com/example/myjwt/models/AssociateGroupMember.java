package com.example.myjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Associate_Group_Members")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssociateGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private AssignmentUser user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "group_id")
    private AssociateGroup group;

    @Override
    public String toString() {
        return "AssociateGroupMember{" +
                "id=" + id +
                ", user=" + user +
//                ", group=" + group +
                '}';
    }
}