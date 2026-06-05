import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../utils/toast";
import privateApi from "../api/axios";

const WorkTrackContext = createContext();

export const useWorkContext = () => useContext(WorkTrackContext);

const WorkTrackProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("userId"));


  console.log(user)

  const fetchTeam = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/team`
      );
      const teams = response?.data?.teams;
      setTeams(teams);
    } catch (error) {}
  };
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user`
      );

      const users = response.data.users;
      setUsers(users);
    } catch (error) {}
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tags`
      );

      const tags = response.data.tags;
      setTags(tags);
    } catch (error) {}
  };
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/project`
      );

      const projects = response.data.projects;

      setProjects(projects);
    } catch (error) {}
  };

  const addTeam = async (teamData) => {
    let toastId = showLoadingToast("Adding team...");

    try {
      setLoading(true);
      const response = await privateApi.post(
        `${process.env.REACT_APP_BACKEND_URL}/team`,
        teamData
      );

      console.log(response);

      setTeams((prev) => [response.data.team, ...prev]);

      showSuccessToast(
        toastId,
        response.data.message || "Team added successfully."
      );

      return {
        success: true,
        message: "Team added successfully.",
      };
    } catch (error) {
      showErrorToast(
        toastId,
        error.response?.data?.message || "Failed to add new team."
      );
      return {
        success: false,
        message: "Failed to add new team.",
      };
    } finally {
      setLoading(false);
    }
  };
  const addProject = async (projectData) => {
    let toastId = showLoadingToast("Adding project...");

    try {
      setLoading(true);
      const response = await privateApi.post(
        `${process.env.REACT_APP_BACKEND_URL}/project`,
        projectData
      );

      setProjects((prev) => [response.data.project, ...prev]);

      showSuccessToast(
        toastId,
        response.data.message || "Project added successfully."
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      showErrorToast(
        toastId,
        error.response?.data?.message || "Something went wrong."
      );

      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong.",
      };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data) => {
    const toastId = showLoadingToast("Signing up...");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/signup`,
        data
      );

      const user = response.data.user;
      setUsers((prevStat) => [user, ...prevStat]);
      showSuccessToast(
        toastId,
        response.data?.message || "User created successfully."
      );

      return { success: true, data: response.data };
    } catch (error) {
      showErrorToast(
        toastId,
        error.response?.data?.message || "Failed to create user."
      );

      return {
        success: false,
        message: error.response?.data?.message || "Failed to create user.",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }, navigate) => {
    const toastId = showLoadingToast("Login...");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        {
          email,
          password,
        }
      );

      const { token, userId, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setUser(userId);

      showSuccessToast(toastId, message || "User login successfully.");

      navigate("/"); // redirect after login
    } catch (error) {
      showErrorToast(
        toastId,
        error.response?.data?.message || "Failed to log in."
      );
    }
  };

  


  const logout = () => {
    const toastId = showLoadingToast("Loging out...");
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    showSuccessToast(toastId, "Successfully logout.");
  };

  useEffect(() => {
    fetchTeam();
    fetchUser();
    fetchTags();
    fetchProjects();
  }, []);

  return (
    <WorkTrackContext.Provider
      value={{
        teams,
        users,
        tags,
        projects,
        setProjects,
        setTeams,
        isLoading,
        user,
        signup,
        setTags,
        addTeam,
        addProject,
        login,
        logout,
      }}
    >
      {children}
    </WorkTrackContext.Provider>
  );
};

export default WorkTrackProvider;
