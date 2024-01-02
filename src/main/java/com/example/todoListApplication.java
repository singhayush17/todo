package com.example;

import com.example.db.TaskDAO;
import com.example.entities.Task;
import com.example.resources.taskResource;
import com.example.resources.todoResource;
import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.dropwizard.db.PooledDataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.migrations.MigrationsBundle;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.FilterRegistration;
import org.eclipse.jetty.servlets.CrossOriginFilter;

import java.util.EnumSet;

public class todoListApplication extends Application<todoListConfiguration> {

    private final HibernateBundle<todoListConfiguration> hibernateBundle = new HibernateBundle<todoListConfiguration>(Task.class) {
        @Override
        public PooledDataSourceFactory getDataSourceFactory(todoListConfiguration configuration) {
            return configuration.getDataSourceFactory();
        }
    };

    public static void main(final String[] args) throws Exception {
        new todoListApplication().run(args);
    }

    @Override
    public String getName() {
        return "todoList";
    }

    @Override
    public void initialize(final Bootstrap<todoListConfiguration> bootstrap) {
        bootstrap.addBundle(new MigrationsBundle<todoListConfiguration>() {
            @Override
            public PooledDataSourceFactory getDataSourceFactory(todoListConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        });
        bootstrap.addBundle(hibernateBundle);
    }

    @Override
    public void run(final todoListConfiguration configuration,
                    final Environment environment) {

        final TaskDAO taskDAO = new TaskDAO(hibernateBundle.getSessionFactory());
        environment.jersey().register(
                new todoResource()
        );
        environment.jersey().register(
                new taskResource(taskDAO)
        );
        final FilterRegistration.Dynamic cors =
                environment.servlets().addFilter("CORS", CrossOriginFilter.class);

        // Configure CORS parameters
        cors.setInitParameter("allowedOrigins", "*");
        cors.setInitParameter("allowedHeaders", "X-Requested-With,Content-Type,Accept,Origin");
        cors.setInitParameter("allowedMethods", "OPTIONS,GET,PUT,POST,DELETE,HEAD");

        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");

    }

}
