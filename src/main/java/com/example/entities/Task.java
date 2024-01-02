package com.example.entities;

import lombok.Data;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Task")
@NamedQueries({
        @NamedQuery(name="Task.findAll",
        query="select t from Task t"),
        @NamedQuery(name = "Task.findById",
        query = "select t from Task t "
                + "where t.taskId = :taskId"),
        @NamedQuery(name="Task.remove",
        query = "delete from Task t "
                  + "where t.taskId= :taskId"),
        @NamedQuery(name="Task.update",
        query = "UPDATE Task t SET " +
                "t.title = COALESCE(:title, t.title)," +
                "t.status = COALESCE(:status, t.status), " +
                "t.description = COALESCE(:description, t.description), " +
                "t.startDate = COALESCE(:startDate, t.startDate), " +
                "t.targetDate = COALESCE(:targetDate, t.targetDate) " +
                "WHERE t.taskId = :taskId")
})
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "task_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "target_date", nullable = false)
    private Date targetDate;

}
