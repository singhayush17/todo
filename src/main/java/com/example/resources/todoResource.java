package com.example.resources;

import jakarta.ws.rs.GET;
        import jakarta.ws.rs.Path;
        import jakarta.ws.rs.Produces;
        import jakarta.ws.rs.core.MediaType;

@Path("/hello")
public class todoResource {
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getGreeting()
    {
        return "Hello World";
    }

}
