import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault(); // 🔥 important pour éviter refresh page

    try {
      const res = await api.post("/register", {
        name,
        email,
        password
      });

      console.log("Register success:", res.data);

      // redirection vers login
      navigate("/login");

    } catch (err) {
      console.log(err.response?.data);

      setError(
        err.response?.data?.message ||
        "Erreur lors de l'inscription"
      );
    }
  };

  return (
    <div className="register">
      <form onSubmit={register}> {/* 🔥 important */}

        <h2>Register</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit">
          s'inscrire
        </button>
        <br />

        <button type="button" onClick={() => {
          setName("");
          setEmail("");
          setPassword("");
        }}>
          annuler
        </button>

        <br />

        <span>
          vous avez déjà un compte ?{" "}
          <Link to="/login">Se connecter</Link>
        </span>

      </form>
    </div>
  );
}

export default Register;