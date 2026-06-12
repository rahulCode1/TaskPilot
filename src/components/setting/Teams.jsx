import { useWorkContext } from "../../context/workTrackContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import remove from "../../imgs/delete.png";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/toast";
import privateApi from "../../api/axios";

const Teams = () => {
  const [isDeleteing, setIsDeleteing] = useState(false);
  const [teamId, setTeamId] = useState("");
  const { teams, setTeams } = useWorkContext();

  const removeHandler = async (id) => {
    const toastId = showLoadingToast("Removeing team...");
    try {
      setTeamId(id);
      setIsDeleteing(true);
      await privateApi.delete(`team/${id}`);

      setTeams((prev) => prev.filter((team) => team.id !== id));
      setTeamId("");
      showSuccessToast(toastId, "team removed successfully.");
    } catch (error) {
      showErrorToast(
        toastId,
        error.response?.data?.message || "Failed to delete team.",
      );
    } finally {
      setIsDeleteing(false);
    }
  };

  return (
    <>
      <main className="container">
        <div className="d-flex justify-content-between py-4">
          <h2>Manage Teams </h2>
        </div>
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
            {teams.map((team, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/team/${team.id}`}
                    className="text-decoration-none"
                  >
                    {team.name}
                  </Link>
                </td>
                <td>
                  {team?.description
                    ? team.description
                    : "No description found."}
                </td>
                <td>
                  <button
                    onClick={() => removeHandler(team.id)}
                    className="btn"
                    disabled={isDeleteing && team.id === teamId}
                  >
                    {isDeleteing && team.id === teamId ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      <img
                        src={remove}
                        className="img-fluid"
                        style={{ width: "20px" }}
                        alt="Remove team"
                      />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Teams;
