package com.example.resources;

import com.example.db.TaskDAO;
import com.example.entities.Task;
import io.dropwizard.hibernate.UnitOfWork;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/tasks")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class taskResource {
    private TaskDAO dao;

    public taskResource(TaskDAO dao)
    {
        this.dao = dao;

    }


    @GET
    @UnitOfWork
    public List<Task> getAllTasks()
    {
        return dao.findAll();
    }

    @GET
    @Path("/{id}")
    //"https://localhost:8080/tasks/1"
    @UnitOfWork
    public Task getTaskbyId(@PathParam("id") long id)
    {
        return dao.findByTaskId(id);
    }
    @DELETE
    @Path("/{id}")
    //"https://localhost:8080/tasks/1"
    @UnitOfWork
    public int deleteTask(@PathParam("id") long id)
    {
        return dao.deleteTask(id);

    }

    @POST
    @UnitOfWork
    public Task createTask(Task task)
    {
         return dao.createTask(task);
    }

    @PUT
    @Path("/{id}")
    @UnitOfWork
    public int updateTask(Task task,@PathParam("id") long id)
    {
        return dao.updateTask(task,id);
    }



}

