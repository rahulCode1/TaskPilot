import { useNavigate } from "react-router-dom";
import { useWorkContext } from "../context/workTrackContext";
import ErrorModal from "../components/model/ErrorModal";
const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, setError } = useWorkContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    login(
      {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      navigate,
    );
  };

  return (
    <>
      <main className="container-fluid d-flex align-items-center justify-content-center min-vh-100 py-4">
        {error && (
          <ErrorModal
            onClose={() => setError(null)}
            title={"Something went wrong."}
            message={error}
          />
        )}
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Welcome Back</h2>
                <p className="text-muted">Please login to your account</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                >
                  Login
                </button>

                <div className="text-center">
                  <span className="text-muted">Don't have an account? </span>
                  <a
                    href="/signup"
                    className="text-decoration-none fw-semibold"
                  >
                    Sign up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
