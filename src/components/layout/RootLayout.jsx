import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "../loading/LoadingSpinner";

const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <main className="d-flex flex-column flex-md-row">
    

      <Header />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      {isLoading && <LoadingSpinner size={30} />}

      {/* Main content with responsive margins */}
      <main className=" flex-grow-1 px-3 px-md-4 px-lg-5">
        <Outlet />
      </main>
    </main>
  );
};

export default RootLayout;
