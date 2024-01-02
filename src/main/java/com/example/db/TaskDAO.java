package com.example.db;

import com.example.entities.Task;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.List;


public class TaskDAO extends AbstractDAO<Task> {

    public TaskDAO(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public List<Task> findAll() {
        return list(namedTypedQuery("Task.findAll"));
    }


    public Task findByTaskId(long taskId) {
        return
                uniqueResult(
                        namedTypedQuery("Task.findById").setParameter("taskId", taskId)
                );

    }

    public int deleteTask(long taskId) {

        return namedQuery("Task.remove")
                .setParameter("taskId", taskId).executeUpdate();

    }

    public Task createTask(Task newTask) {
        persist(newTask);
        return newTask;
    }

    public int updateTask(Task updatedTask, long taskId) {
        return namedQuery("Task.update").setParameter("status", updatedTask.getStatus())
                .setParameter("title", updatedTask.getTitle())
                .setParameter("description", updatedTask.getDescription())
                .setParameter("startDate", updatedTask.getStartDate())
                .setParameter("targetDate", updatedTask.getTargetDate())
                .setParameter("taskId", taskId).executeUpdate();
    }

}
