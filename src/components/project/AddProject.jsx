import { useState } from "react";
import { useWorkContext } from "../../context/workTrackContext";
import SubmitLoading from "../loading/SubmitLoading";
import { useNavigate } from "react-router-dom";

const AddProject = ({ setIsOpen }) => {
  const initialData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialData);
  const { addProject, isLoading, user,  setError } = useWorkContext();
  const onChangeForm = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please login to add new project.");

      return navigate("/login");
    }

    const response = await addProject(formData, navigate);

    if (response.success === false) {
      return;
    }
    setFormData(initialData);
    setIsOpen(false);
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Project name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChangeForm}
            value={formData.name}
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Project description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={onChangeForm}
            placeholder="Enter project description"
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary w-100"
        >
          {isLoading ? (
            <>
              <SubmitLoading /> <span className="ms-2">Submitting...</span>
            </>
          ) : (
            "Add Project"
          )}
        </button>
      </form>
    </>
  );
};

export default AddProject;
