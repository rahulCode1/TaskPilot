import {  Link } from "react-router-dom";
import { useWorkContext } from "../../context/workTrackContext";
import remove from "../../imgs/delete.png";
import { useState } from "react";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/toast";
import privateApi from "../../api/axios";

const Projects = () => {
  const [isDeleteing, setIsDeleteing] = useState(false);
  const { projects, setProjects } = useWorkContext();

  const removeHandler = async (id) => {
    const toastId = showLoadingToast("Removeing project...");
    try {
      setIsDeleteing(true);
      await privateApi.delete(`project/${id}`);

      setProjects((prev) => prev.filter((project) => project.id !== id));
      showSuccessToast(toastId, "Project removed successfully.");
    } catch (error) {
      console.log(error);

      showErrorToast(
        toastId,
        error.response?.data?.message || "Failed to delete project."
      );
    } finally {
      setIsDeleteing(false);
    }
  };

  return (
    <>
      <h1>Manage Projects </h1>
      <table className="table table-bordered">
        <thead>
          <tr className="">
            <th>S.N.</th>
            <th>Name </th>
            <th>Description</th>
            <th>Remove </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>
                <Link to={`/projects/${project.id}`} className="text-decoration-none">
                  {project.name}
                </Link>
              </td>
              <td>
                {project?.description ? project.description : "No description"}
              </td>
              <td>
                <button
                  onClick={() => removeHandler(project.id)}
                  className="btn"
                  disabled={isDeleteing}
                >
                  <img
                    src={remove}
                    className="img-fluid"
                    style={{ width: "20px" }}
                    alt="Remove project"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Projects;
