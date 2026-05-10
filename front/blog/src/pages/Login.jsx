import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
     const res = await api.post("/login", {
  email,
  password,
});

      localStorage.setItem("token", res.data.token);

      console.log("Login success:", res.data);

     
      navigate("/notes");

    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login">
      <form>
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="button" onClick={login}>
          connexion
        </button>
        <br />

        <button type="reset">annuler</button>
        <br />

        <span>
          vous n'avez pas de compte ?{" "}
          <Link to="/register">S'inscrire</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;