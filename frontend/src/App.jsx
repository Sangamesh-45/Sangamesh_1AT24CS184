import { useEffect, useState } from "react";
import Login from "./components/login";
import Register from "./components/register";
import "./App.css";

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const loadProfile = async () => {
        setProfileLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5002/api/auth/profile",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        } catch (error) {
            console.error("Profile loading error:", error);
        } finally {
            setProfileLoading(false);
        }
    };

    loadProfile();
    }, []);
    
    if (profileLoading) {
        return <h2>Loading your dashboard...</h2>;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setIsLogin(true);
    };

    if (user) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <h2>Welcome, {user.name}!</h2>

                    <p className="auth-subtitle">
                        You are successfully logged in.
                    </p>

                    <button
                        className="auth-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {isLogin ? (
                <Login onLogin={setUser} />
            ) : (
                <Register />
            )}

            <div className="auth-switch">
                {isLogin ? (
                    <>
                        <span>Don't have an account?</span>
                        <button onClick={() => setIsLogin(false)}>
                            Register
                        </button>
                    </>
                ) : (
                    <>
                        <span>Already have an account?</span>
                        <button onClick={() => setIsLogin(true)}>
                            Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;