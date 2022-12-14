import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
function Login(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  };
  return (
    <div className="loginpage p-4 col-8 col-md-7 col-lg-5">
      <form className="loginform w-100" onSubmit={handleSubmit}>
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
              className="form-control"
              id="email"
              name="email"
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
              className="form-control"
              id="password"
              name="password"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Login;
