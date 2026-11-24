import { useState } from "react";
import "./auth.css";

function Login({ onLogin })  {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5002/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

            // Save JWT token
            localStorage.setItem("token", data.token);

            // Save user information
            localStorage.setItem(
                "user",
            JSON.stringify(data.user)
            );

            setMessage(`Welcome ${data.user.name}`);
            onLogin(data.user);

            } 
            else {

                setMessage(data.message);

            }
        }
      catch (error) {
            console.error(error);
            setMessage("Something went wrong");
        }
    };

    return (
    <div className="auth-page">
        <div className="auth-card">

            <h2>Welcome Back</h2>

            <p className="auth-subtitle">
                Login to your account
            </p>

            <form onSubmit={handleLogin}>

                <div className="auth-form-group">
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="auth-form-group">
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="auth-button"
                >
                    Login
                </button>

            </form>

            {message && (
                <p className="auth-message">
                    {message}
                </p>
            )}

        </div>
    </div>
    );
}
export default Login;