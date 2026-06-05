import TeamForm from "./TeamForm";
import Modal from "../model/Modal";
import { useState } from "react";
import { Link } from "react-router-dom";

const Team = ({ tasks }) => {
  const [isModelOpen, setModelIsOpen] = useState(false);

  const groupedViaTeams = Object.entries(
    tasks.reduce((acc, curr) => {
      const key = curr?.team ? curr.team?.name : "Unknown";

      acc[key] = acc[key] || [];
      acc[key].push(curr);
      return acc;
    }, {})
  ).map(([name, tasks]) => ({ name, tasks }));

  return (
    <>
      {isModelOpen && (
        <Modal
          title={"Add New Member"}
          isOpen={isModelOpen}
          onClose={() => setModelIsOpen(false)}
        >
          <TeamForm setModelIsOpen={setModelIsOpen} />
        </Modal>
      )}

      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-4 border-bottom mb-4">
          <h2 className="mb-0 fw-bold text-info">All Tasks</h2>
          <button
            onClick={() => setModelIsOpen(true)}
            className="btn btn-info btn-lg shadow-sm text-light fw-semibold"
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Team
          </button>
        </div>

        <div className="mb-4">
          <h1 className="h3 text-info-emphasis mb-4">
            Tasks grouped via Teams
          </h1>

          {groupedViaTeams && groupedViaTeams.length !== 0 ? (
            <div className="row g-4">
              {groupedViaTeams.map((project, projectIndex) => (
                <div className="col-12" key={projectIndex}>
                  <div className="card shadow-sm border-info  rounded-3">
                    <div className="card-header bg-info-subtle text-info-emphasis py-2 border-bottom border-info">
                      <h2 className="h4 mb-0 fw-semibold">{project.name}</h2>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-info">
                            <tr>
                              <th
                                className="text-center"
                                style={{ width: "60px" }}
                              >
                                S.N.
                              </th>
                              <th>Name</th>
                              <th style={{ width: "150px" }}>Status</th>
                              <th style={{ width: "200px" }}>Team</th>
                              <th
                                className="text-end"
                                style={{ width: "180px" }}
                              >
                                Time to Complete
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {project.tasks.map((task, index) => (
                              <tr key={index} className="align-middle">
                                <td className="text-center fw-semibold text-muted">
                                  {index + 1}
                                </td>
                                <td>
                                  {
                                    <Link
                                      to={`/${task.id}`}
                                      className="text-decoration-none fw-medium text-info-emphasis"
                                    >
                                      {task.name}
                                    </Link>
                                  }
                                </td>
                              
                                <td>
                                  <span
                                    className={`badge ${
                                      task.status.toLowerCase() === "completed"
                                        ? "bg-success"
                                        : task.status.toLowerCase() ===
                                          "in progress"
                                        ? "bg-warning text-dark"
                                        : task.status.toLowerCase() ===
                                          "pending"
                                        ? "bg-secondary"
                                        : task.status.toLowerCase() ===
                                          "on hold"
                                        ? "bg-danger"
                                        : "bg-info text-dark"
                                    }`}
                                  >
                                    {task.status}
                                  </span>
                                </td>
                                <td className="text-muted">
                                  {task?.team ? task.team.name : "Unknown"}
                                </td>
                                <td className="text-end">
                                  <span className="badge bg-info-subtle text-info-emphasis border border-info">
                                    {task.timeToComplete} hours
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="alert alert-info border-info border-2 d-flex align-items-center shadow-sm"
              role="alert"
            >
              <i className="bi bi-info-circle-fill me-3 fs-4"></i>
              <div>
                <h4 className="alert-heading mb-1">No Tasks Found</h4>
                <p className="mb-0">
                  There are currently no tasks available. Start by adding a new
                  project!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Team;
