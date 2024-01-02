import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoModal from "./TodoModal";
import TodoItem from "./TodoItem";

function AppContent({ tasks, setTasks, filterStatus }) {
  if (tasks.length == 0) {
    return (
      <div>
        <h3>No TODO found!</h3>
      </div>
    );
  }
  const filteredTasks =
    filterStatus === "ALL"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);
  // console.log(filteredTasks);
  // console.log(4);
  return (
    <div>
      <h2>Task List</h2>
      <div>
        {filteredTasks.map((task) => (
          <TodoItem todo={task} tasks={tasks} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
}

export default AppContent;
