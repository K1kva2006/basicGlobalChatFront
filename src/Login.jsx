import { useState } from "react";

function Login() {
    const [inputValue, setinputValue] = useState("");
    return (
        <>
            <div className="login-popup">
                <div className="flex-wrapper">
                    <h1>LogIn</h1>
                    <div className="login-text-wrapper">
                        <label htmlFor="login">Name:</label>
                        <input
                            type="text"
                            name="login"
                            value={inputValue}
                            onChange={(e) => setinputValue(e.target.value)}
                        />
                    </div>
                    <button onClick={() => {
                        if(inputValue.trim().length > 1) {
                            localStorage.setItem("name", inputValue)
                           window.location.reload();
                        }
                    }} className="login-button">
                        Login
                    </button>
                </div>
            </div>
        </>
    );
}
export default Login;
