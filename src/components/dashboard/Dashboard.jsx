import Tasks from "../task/Tasks";
import Project from "../project/Project";
import { Link, useSearchParams, useFetcher } from "react-router-dom";
import Modal from "../model/Modal";
import { useState, useEffect } from "react";
import AddProject from "../project/AddProject";
import AddTaskFrom from "../task/TaskForm";
import { useWorkContext } from "../../context/workTrackContext";

const Dashboard = ({ tasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTaskModalOpen, setTaskModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const taskFetcher = useFetcher();
  const { projects } = useWorkContext();

  useEffect(() => {
    if (taskFetcher.state === "idle" && taskFetcher.data) {
      setTaskModal(false);
    }
  }, [taskFetcher.state, taskFetcher.data]);

  let filterTaskViaStatus =
    searchParams.get("status") === null
      ? tasks
      : tasks.filter((task) => task.status === searchParams.get("status"));

  const updateSearchParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  const status = ["To Do", "In Progress", "Completed", "Blocked"];

  return (
    <main className="">
      <div>
        {isOpen && (
          <Modal
            title={"Add new Project"}
            onClose={() => setIsOpen(false)}
            isOpen={isOpen}
          >
            {<AddProject setIsOpen={setIsOpen} />}
          </Modal>
        )}
      </div>
      <div>
        <div className="d-flex justify-content-between py-4">
          <h2>My Projects </h2>
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-info text-light fw-semibold"
          >
            + Add Project
          </button>
        </div>
        <div className="row">
          {projects && projects.length !== 0 ? (
            projects.map((project) => (
              <div className="col-md-6 mb-3" key={project.id}>
                <Link
                  to={`/projects/${project.id}`}
                  className="text-decoration-none text-reset"
                >
                  <Project project={project} />
                </Link>
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>

      <div>
        <div>
          {isTaskModalOpen && (
            <Modal
              title={"Add new Task"}
              onClose={() => setTaskModal(false)}
              isOpen={isTaskModalOpen}
            >
              <AddTaskFrom fetcher={taskFetcher} method={"post"} />
            </Modal>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center  py-3 my-3">
          <div className="d-flex">
            <h2>My Tasks </h2>
            <div className="px-2">
              <select
                className="form-select"
                onChange={(e) => updateSearchParams("status", e.target.value)}
              >
                <option value={""}>Filter </option>
                {status.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => setTaskModal(true)}
            className="btn btn-primary"
          >
            + New Task{" "}
          </button>
        </div>

        <div className="row">
          {filterTaskViaStatus && filterTaskViaStatus.length !== 0 ? (
            filterTaskViaStatus.map((task) => (
              <div className="col-md-6" key={task.id}>
                <Link
                  to={`${task.id}`}
                  className="text-decoration-none text-reset"
                >
                  <Tasks task={task} />
                </Link>
              </div>
            ))
          ) : (
            <p>No Task found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
