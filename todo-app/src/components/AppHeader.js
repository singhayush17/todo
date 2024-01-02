import React, { useState } from "react";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import { SelectButton } from "./Button";

const AppHeader = ({
  modalOpen,
  setModalOpen,
  tasks,
  setTasks,
  filterStatus,
  setFilterStatus,
}) => {
  const updateFilter = (e) => {
    console.log(e.target.value);
    setFilterStatus(e.target.value);
  };
  return (
    <div className={styles.appHeader}>
      <button className={styles.button1} onClick={() => setModalOpen(true)}>
        Add Task
      </button>
      <select
        className={styles.button2__select}
        id="status"
        value={filterStatus}
        onChange={updateFilter}
      >
        <option value="ALL">ALL</option>
        <option value="TODO">TODO</option>
        <option value="WIP">WIP</option>
        <option value="DONE">DONE</option>
      </select>
      <TodoModal
        type={"Add"}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        tasks={tasks}
        setTasks={setTasks}
      ></TodoModal>
    </div>
  );
};

export default AppHeader;
