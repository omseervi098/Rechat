import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { useState } from "react";
function Login(props) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    props.setLoading(true);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      props.setLoading(false);
      navigate("/");
    } catch (error) {
      props.setLoading(false);
      setError("Invalid Credentials");
      console.log(error);
    }
  };
  return (
    <div className="loginpage p-4 col-8 col-md-7 col-lg-5">
      <div className="background">
        <img
          alt="background"
          style={{
            position: "fixed",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
          src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
        />
      </div>

      {props.loading ? (
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <form className="loginform w-100" onSubmit={handleSubmit}>
          <h1 className="text-center text-white mb-4">ReChat</h1>

          <div className="row mb-3">
            <label
              htmlFor="inputEmail3"
              className="col-sm-2 col-form-label text-white"
            >
              Email
            </label>
            <div className="col-md-10">
              <input
                type="email"
                className="form-control email text-white"
                id="email"
                name="email"
                placeholder="x@x.com"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="inputPassword3"
              className="col-sm-2 col-form-label text-white"
            >
              Password
            </label>
            <div className="col-md-10">
              <input
                type="password"
                className="form-control password"
                id="password"
                name="password"
                placeholder="****"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-warning mb-3">
            Submit
          </button>
          <div className="designby my-2">
            <p className="text-white">
              Designed by{" "}
              <a
                href="https://omprakash.me"
                target="_blank"
                rel="noreferrer"
                className="text-warning text-decoration-none"
              >
                Omprakash Choudhary
              </a>
            </p>
          </div>
          {error && setTimeout(() => setError(""), 1500) && (
            <div className="alert alert-danger">{error}</div>
          )}
        </form>
      )}
    </div>
  );
}
export default Login;
