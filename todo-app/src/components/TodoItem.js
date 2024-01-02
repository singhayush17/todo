import React, { useState } from "react";
import styles from "../styles/modules/todoItem.module.scss";
import { MdDelete, MdEdit } from "react-icons/md";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";

function TodoItem({ todo, tasks, setTasks }) {
  // console.log(todo);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleDelete = async () => {
    try {
      setTasks(tasks.filter((task) => task.taskId !== todo.taskId));
      await fetch(`http://localhost:8080/tasks/${todo.taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };
  const titleStyle =
    todo.status === "DONE"
      ? `${styles.todoTextDone} ${styles.title}`
      : `${styles.todoText} ${styles.title}`;
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };
  const start = new Date(todo.startDate).toLocaleDateString("en-IN", options);
  const target = new Date(todo.targetDate).toLocaleDateString("en-IN", options);
  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <div className={styles.texts}>
            <p className={titleStyle}>{todo.title}</p>
            <p className={styles.todoText}>Status: {todo.status}</p>
            <p className={styles.todoText}>Description: {todo.description}</p>
            <p className={styles.time}>Start : {start}</p>
            <p className={styles.time}>Target : {target}</p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </div>
      <TodoModal
        type="Update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
        tasks={tasks}
        setTasks={setTasks}
      />
    </>
  );
}

export default TodoItem;
