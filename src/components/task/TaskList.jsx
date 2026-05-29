import { Link, useFetcher, useSearchParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useEffect, useState } from "react";
import Modal from "../model/Modal";
import { useWorkContext } from "../../context/workTrackContext";

const TaskList = ({ tasks }) => {
  const { users, tags, teams, projects } = useWorkContext();
  const [isTaskModalOpen, setTaskModal] = useState(false);
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();
  let filteredTask =
    searchParams.get("owner") === null
      ? tasks
      : tasks.filter((task) =>
          task.owners.some((owner) => owner._id === searchParams.get("owner")),
        );

  filteredTask =
    searchParams.get("tag") === null
      ? filteredTask
      : filteredTask.filter((task) =>
          task.tags.includes(searchParams.get("tag")),
        );
  filteredTask =
    searchParams.get("status") === null
      ? filteredTask
      : filteredTask.filter(
          (task) => task.status === searchParams.get("status"),
        );
  filteredTask =
    searchParams.get("team") === null
      ? filteredTask
      : filteredTask.filter(
          (task) => task.team._id === searchParams.get("team"),
        );

  filteredTask =
    searchParams.get("project") === null
      ? filteredTask
      : filteredTask.filter(
          (task) => task.project._id === searchParams.get("project"),
        );

  const sortViaCloseTime = [...filteredTask];

  if (searchParams.get("time") === "close soon") {
    sortViaCloseTime.sort((a, b) => a.timeToComplete - b.timeToComplete);
  } else if (searchParams.get("time") === "take long") {
    sortViaCloseTime.sort((a, b) => b.timeToComplete - a.timeToComplete);
  }

  const sortViaPriority = [...sortViaCloseTime];

  if (searchParams.get("priority") === "1") {
    sortViaPriority.sort((a, b) => a.priority - b.priority);
  } else if (searchParams.get("priority") === "3") {
    sortViaPriority.sort((a, b) => b.priority - a.priority);
  }

  const updateSearchParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setTaskModal(false);
    }
  }, [fetcher.state, fetcher.data]);

  const status = ["To Do", "In Progress", "Completed", "Blocked"];

  return (
    <main className="py-3">
      <div className="d-flex justify-content-between align-items-center py-3">
        <h1>Tasks </h1>
        <button onClick={() => setTaskModal(true)} className="btn btn-primary">
          Add new Task
        </button>
      </div>

      {isTaskModalOpen && (
        <Modal
          title={"Add new task"}
          isOpen={isTaskModalOpen}
          onClose={() => setTaskModal(false)}
        >
          <TaskForm fetcher={fetcher} method={"post"} />
        </Modal>
      )}
      {tasks.length !== 0 ? (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">
                <i className="bi bi-funnel me-2"></i>
                Filters & Sorting
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {/* Owner Filter */}
                <div className="col-md-6 col-lg-4">
                  <label htmlFor="owners" className="form-label fw-semibold">
                    <i className="bi bi-person me-1"></i>
                    By Owner
                  </label>
                  <select
                    id="owners"
                    className="form-select"
                    value={searchParams.get("owner") || ""}
                    onChange={(e) =>
                      updateSearchParams("owner", e.target.value)
                    }
                  >
                    <option value="">All Owners</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tag Filter */}
                <div className="col-md-6 col-lg-4">
                  <label htmlFor="tags" className="form-label fw-semibold">
                    <i className="bi bi-tag me-1"></i>
                    By Tag
                  </label>
                  <select
                    id="tags"
                    className="form-select"
                    value={searchParams.get("tag") || ""}
                    onChange={(e) => updateSearchParams("tag", e.target.value)}
                  >
                    <option value="">All Tags</option>
                    {tags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 col-lg-4">
                  <label htmlFor="tags" className="form-label fw-semibold">
                    <i className="bi bi-tag me-1"></i>
                    By Status
                  </label>
                  <select
                    id="status"
                    className="form-select"
                    value={searchParams.get("status") || ""}
                    onChange={(e) =>
                      updateSearchParams("status", e.target.value)
                    }
                  >
                    <option value="">All Tasks </option>
                    {status.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 col-lg-4 mb-3">
                  <label htmlFor="team" className="form-label">
                    By Team
                  </label>
                  <select
                    id="team"
                    name="team"
                    required
                    className="form-select"
                    onChange={(e) => updateSearchParams("team", e.target.value)}
                  >
                    <option value="" selected>
                      Select Team
                    </option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 col-lg-4 mb-3">
                  <label htmlFor="project" className="form-label">
                    Select Project
                  </label>
                  <select
                    id="project"
                    name="project"
                    required
                    className="form-select"
                    onChange={(e) =>
                      updateSearchParams("project", e.target.value)
                    }
                  >
                    <option value="" selected>
                      All
                    </option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Sort */}
                <div className="col-md-6 ">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-clock me-1"></i>
                    Sort by Time
                  </label>
                  <div className="d-flex flex-column gap-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="closeSoon"
                        value="close soon"
                        name="time"
                        checked={searchParams.get("time") === "close soon"}
                        onChange={(e) =>
                          updateSearchParams("time", e.target.value)
                        }
                      />
                      <label className="form-check-label" htmlFor="closeSoon">
                        Close Soon
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="takeLong"
                        value="take long"
                        name="time"
                        checked={searchParams.get("time") === "take long"}
                        onChange={(e) =>
                          updateSearchParams("time", e.target.value)
                        }
                      />
                      <label className="form-check-label" htmlFor="takeLong">
                        Take Long
                      </label>
                    </div>
                  </div>
                </div>

                {/* Priority Sort */}
                <div className="col-md-6 ">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    Sort by Priority
                  </label>
                  <div className="d-flex flex-column gap-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="highPriority"
                        value="1"
                        name="priority"
                        checked={searchParams.get("priority") === "1"}
                        onChange={(e) =>
                          updateSearchParams("priority", e.target.value)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="highPriority"
                      >
                        High to Low
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="lowPriority"
                        value="3"
                        name="priority"
                        checked={searchParams.get("priority") === "3"}
                        onChange={(e) =>
                          updateSearchParams("priority", e.target.value)
                        }
                      />
                      <label className="form-check-label" htmlFor="lowPriority">
                        Low to High
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(searchParams.get("owner") ||
                searchParams.get("tag") ||
                searchParams.get("time") ||
                searchParams.get("priority")) && (
                <div className="mt-3">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setSearchParams({})}
                  >
                    <i className="bi bi-x-circle me-1"></i>
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Task</th>
                <th>Status</th>
                <th>Time to complete</th>
              </tr>
            </thead>

            <tbody>
              {sortViaPriority &&
                sortViaPriority.length !== 0 &&
                sortViaPriority.map((task, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/${task.id}`} className="text-decoration-none">
                        {task.name}
                      </Link>
                    </td>
                    <td>{task.status}</td>
                    <td>{task.timeToComplete} days</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>You didn't have any task.</p>
      )}
    </main>
  );
};

export default TaskList;
