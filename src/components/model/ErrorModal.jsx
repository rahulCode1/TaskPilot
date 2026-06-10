const ErrorModal = ({ title, message, onClose }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100dvh",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: "1050",
        }}
        className="position-fixed top-0 start-0 d-flex"
      >
        <div
          style={{ width: "50%", height: "45%", margin: "auto" }}
          className="shadow-lg p-3 bg-white rounded d-flex flex-column border-top border-3 border-danger"
        >
          <div className="d-flex justify-content-between">
            <h5>Error Occurred </h5>
            <button onClick={onClose} className="btn btn-danger">
              X
            </button>
          </div>
          <div className="text-center mt-5">
            <h3>{title}</h3>
            <p>{message} </p>
          </div>

          <button
            onClick={onClose}
            className="btn bg-danger text-light"
            style={{ marginTop: "auto" }}
          >
            Close{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
