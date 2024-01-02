import React, { useState, useEffect } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";

function TodoModal({ type, modalOpen, setModalOpen, todo, setTasks, tasks }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    targetDate: "",
    status: "TODO",
  });

  useEffect(() => {
    if (type === "Update" && todo) {
      const formattedStartDate = todo.startDate
        ? new Date(todo.startDate).toISOString().slice(0, 16)
        : "";
      const formattedTargetDate = todo.targetDate
        ? new Date(todo.targetDate).toISOString().slice(0, 16)
        : "";

      setFormData({
        title: todo.title || "",
        description: todo.description || "",
        startDate: formattedStartDate || "",
        targetDate: formattedTargetDate || "",
        status: todo.status || "TODO",
      });
    }
  }, [type, todo]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.startDate) >= new Date(formData.targetDate)) {
      alert("Start date must be before the target date");
      return;
    }

    try {
      const url =
        type === "Update"
          ? `http://localhost:8080/tasks/${todo.taskId}`
          : "http://localhost:8080/tasks/";

      const response =
        type === "Update"
          ? await axios.put(url, formData)
          : await axios.post(url, formData);

      if (response.status !== 200) {
        throw new Error(
          type === "Update" ? "Failed to update task" : "Failed to add task"
        );
      }
      // console.log(type);
      // console.log(type == "Add");
      if (type === "Add") {
        // console.log("mayb");
        setFormData({
          title: "",
          description: "",
          startDate: "",
          targetDate: "",
          status: "TODO",
        });
      } else {
        // console.log(type);
        // console.log("maybnot");
        todo.title = formData.title;
        todo.description = formData.description;
        todo.startDate = formData.startDate;
        todo.targetDate = formData.targetDate;
        todo.status = formData.status;
        const updatedTasks = tasks.map((task) =>
          task.taskId === todo.taskId ? todo : task
        );
        setTasks(updatedTasks);
        setFormData({
          title: todo.title ?? "",
          description: todo.description ?? "",
          startDate: todo.startDate ?? "",
          targetDate: todo.targetDate ?? "",
          status: todo.status ?? "TODO",
        });
      }

      setModalOpen(false);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose></MdOutlineClose>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.formTitle}>{type} Task</h1>
            <label htmlFor="title">
              Title<span>*</span>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="description">
              Description<span>*</span>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </label>
            {type === "Update" && (
              <label htmlFor="status">
                Status <span>*</span>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="TODO">TODO</option>
                  <option value="WIP">WIP</option>
                  <option value="DONE">DONE</option>
                </select>
              </label>
            )}
            <label htmlFor="startDate">
              Start Date and Time<span>*</span>
              <input
                type="datetime-local"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="targetDate">
              Target Date and Time<span>*</span>
              <input
                type="datetime-local"
                id="targetDate"
                value={formData.targetDate}
                onChange={handleChange}
                required
              />
            </label>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.button1}>
                {type === "Update" ? "Update Task" : "Add Task"}
              </button>
              <button
                type="button"
                className={styles.button2}
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default TodoModal;
