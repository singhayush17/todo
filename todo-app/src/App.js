import PageTitle from "./components/PageTitle";
import AppHeader from "./components/AppHeader";
import style from "./styles/modules/app.module.scss";
import AppContent from "./components/AppContent";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tasks");
        const sortedTasks = response.data.sort(
          (a, b) => new Date(a.targetDate) - new Date(b.targetDate)
        );
        setTasks(sortedTasks);
        // console.log(sortedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [modalOpen]);
  return (
    <div className="App">
      <PageTitle></PageTitle>
      <div className={style.app__wrapper}>
        <AppHeader
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          tasks={tasks}
          setTasks={setTasks}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <AppContent
          tasks={tasks}
          setTasks={setTasks}
          filterStatus={filterStatus}
        />
      </div>
    </div>
  );
}

export default App;
