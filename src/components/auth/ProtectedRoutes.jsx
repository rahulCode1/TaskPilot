import { useNavigate } from "react-router-dom";
import { useWorkContext } from "../../context/workTrackContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = useWorkContext();
  const navigate = useNavigate();

  if (!user) {
    return navigate("/login");
  }

  return children;
};

export default ProtectedRoutes;
