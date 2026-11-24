import { useState } from "react";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5002/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );
            const data = await response.json();
            setMessage(data.message);
        }
        catch (error) {

            console.error(error);
            setMessage("Something went wrong");
        }
    };

    return (
    <div className="auth-page">
        <div className="auth-card">

            <h2>Create Account</h2>

            <p className="auth-subtitle">
                Register a new account
            </p>

            <form onSubmit={handleRegister}>

                <div className="auth-form-group">
                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Enter your name"
                        required
                    />
                </div>

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
                    Register
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
export default Register;