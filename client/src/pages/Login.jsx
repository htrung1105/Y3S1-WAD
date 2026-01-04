import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, isLoggingIn, loginError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard";

    const onSubmit = async (data) => {
        try {
            await login(data);
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <h1>Login</h1>
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <span className="error">{errors.password.message}</span>}
                    </div>

                    {loginError && <div className="error">Login failed: {loginError.response?.data?.message || loginError.message}</div>}

                    <button type="submit" disabled={isLoggingIn}>
                        {isLoggingIn ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div style={{marginTop: '10px', fontSize: '0.8em', color: '#888'}}>
                    <p>Demo Credentials:</p>
                    <p>Email: test@example.com</p>
                    <p>Password: password123</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
