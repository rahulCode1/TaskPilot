import { useState } from "react";
import { useWorkContext } from "../../context/workTrackContext";
import { useNavigate } from "react-router-dom";

const TeamForm = ({ setModelIsOpen }) => {
  const initialData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialData);
  const { addTeam, isLoading, user, setError } = useWorkContext();
  const navigate = useNavigate();

  const onChangeForm = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please login to add new team.");

      return navigate("/login");
    }

    const response = await addTeam(formData, navigate);

    if (response.success === false) {
      return;
    }
    setModelIsOpen(false);
    setFormData(initialData);
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <div className="mb-2">
          <label htmlFor="name" className="form-label small mb-1">
            Team name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control form-control-sm"
            placeholder="Enter team name"
            onChange={onChangeForm}
            value={formData.name}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label small mb-1">
            Team description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control form-control-sm"
            placeholder="Enter team description"
            value={formData.description}
            onChange={onChangeForm}
            rows="3"
          />
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary btn-sm flex-fill"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Adding...
              </>
            ) : (
              "Add Team"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default TeamForm;
