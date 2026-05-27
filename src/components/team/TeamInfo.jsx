import { useSearchParams } from "react-router-dom";
import { useWorkContext } from "../../context/workTrackContext";
import Modal from "../model/Modal";
import { useState } from "react";
import TeamForm from "./TeamForm";

const TeamInfo = ({ team, tasks }) => {
  const [isModalOpen, setModelOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { users, tags } = useWorkContext();

  let filteredTask =
    searchParams.get("owner") === null
      ? tasks
      : tasks.filter((task) =>
          task.owners.some((owner) => owner._id === searchParams.get("owner"))
        );

  filteredTask =
    searchParams.get("tag") === null
      ? filteredTask
      : filteredTask.filter((task) =>
          task.tags.includes(searchParams.get("tag"))
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

  return (
    <main className="container py-4">
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setModelOpen(false)}>
          <TeamForm setModelIsOpen={setModelOpen} />
        </Modal>
      )}

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">{team.name}</h1>
          <p className="text-muted mb-0">
            <i className="bi bi-list-task me-2"></i>
            {sortViaPriority.length}{" "}
            {sortViaPriority.length === 1 ? "Task" : "Tasks"}
          </p>
        </div>
        <button onClick={() => setModelOpen(true)} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Team
        </button>
      </div>

      {/* Filters Section */}
      {tasks.length !== 0 && (
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
              <div className="col-md-6 col-lg-3">
                <label htmlFor="owners" className="form-label fw-semibold">
                  <i className="bi bi-person me-1"></i>
                  By Owner
                </label>
                <select
                  id="owners"
                  className="form-select"
                  value={searchParams.get("owner") || ""}
                  onChange={(e) => updateSearchParams("owner", e.target.value)}
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
              <div className="col-md-6 col-lg-3">
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
                    <option key={tag.name} value={tag.name}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Sort */}
              <div className="col-md-6 col-lg-3">
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
              <div className="col-md-6 col-lg-3">
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
                    <label className="form-check-label" htmlFor="highPriority">
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
      )}

      <div className="card my-3">
        <div className="card-body">
          <h2 className="card-title">Team: {team.name}</h2>
          <p>
            Description:{" "}
            {team?.description
              ? team.description
              : "This team doesn't have any description."}
          </p>
        </div>
      </div>

      {/* Tasks List */}
      <div>
        {sortViaPriority && sortViaPriority.length !== 0 ? (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>S.N. </th>
                <th>TASKS </th>
                <th>OWNER </th>
                <th>PRIORITY </th>
                <th>DUE ON </th>
                <th>DAYS TO CLOSE</th>
                <th>STATUS </th>
              </tr>
            </thead>
            <tbody>
              {sortViaPriority.map((task, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{task.name}</td>
                  <td>{task.name}</td>
                  <td>{task.priority}</td>
                  <td>{task.dueDate.split("T")[0]}</td>
                  <td>{task.timeToComplete}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="card shadow-sm">
            <div className="card-body text-center py-5">
              <i className="bi bi-inbox display-1 text-muted mb-3"></i>
              <h5 className="text-muted">No tasks found</h5>
              <p className="text-muted mb-3">
                This team doesn't have any tasks matching.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TeamInfo;
