CREATE Database IF NOT EXISTS todoList;
use todoList;

CREATE TABLE IF NOT EXISTS Task (
    task_id BIGINT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(4) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_date DATETIME NOT NULL,
    target_date DATETIME NOT NULL,
    PRIMARY KEY (task_id)
);

INSERT INTO Task (title, status, description, start_date, target_date)
VALUES ('Sample Task1', 'TODO', 'This is a sample task description', '2024-01-03 12:00:00', '2024-01-10 18:00:00');


