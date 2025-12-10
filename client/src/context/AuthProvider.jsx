import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import api, { setAuthToken } from '../api/axios';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode v4+

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient();

    // Use useLayoutEffect to update api headers synchronously when token changes
    useLayoutEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
        };
    }, [token]);


    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            setLoading(false);
            return;
        }

        try {
            // Use plain axios to avoid interceptors
            const response = await axios.post('/api/refresh', { refreshToken });
            const { accessToken } = response.data;
            setToken(accessToken);
            setAuthToken(accessToken);

            const decoded = jwtDecode(accessToken);
            setUser({ id: decoded.id, email: decoded.email });
        } catch (error) {
            console.error("Failed to refresh token", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshAccessToken();
    }, []);

    // Setup Axios Interceptor for 401s (Response Interceptor)
    // This only needs to be set up once, or we can include it in the effect above.
    // However, if we put it in the effect with [token], it gets recreated every time token changes.
    // The response interceptor needs access to `setToken` and other logic.
    // If we want to avoid closure issues with `token`, we don't strictly need `token` in the response interceptor logic below,
    // because we fetch a NEW token.

    useEffect(() => {
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // If 401 and not already retrying
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        if (!refreshToken) {
                            logout();
                            return Promise.reject(error);
                        }

                        const response = await axios.post('/api/refresh', { refreshToken });
                        const { accessToken } = response.data;

                        setToken(accessToken);
                        setAuthToken(accessToken);

                        // IMPORTANT: We must manually set the header on the original request
                        // because the request interceptor might have attached the old one,
                        // or if we retry `api(originalRequest)`, the request interceptor will run again.
                        // If the request interceptor depends on state `token`, and state update hasn't propagated,
                        // it might attach the old token.

                        // However, since we updated state `setToken(accessToken)`, the re-render happens.
                        // But we are inside an async function.

                        // To be safe, we override the header on the config object passed to retry.
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                        // Return the retry
                        return api(originalRequest);
                    } catch (refreshError) {
                        logout();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(responseInterceptor);
        };
    }, []); // Empty dependency array so it's not constantly recreated.
            // But wait, `setToken` and `logout` are from closure. `useState` setters are stable.
            // `logout` uses `queryClient`, `token` (for setting null), `user`.
            // The `logout` function defined in component scope closes over state.
            // So if `logout` is called from here, it uses stale state?
            // `logout` calls `setToken(null)`. That works fine.
            // `logout` calls `api.post('/logout')`. If token is needed there, it might be issue.
            // But `logout` function implementation:
            /*
                const logout = () => {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (refreshToken) {
                        api.post('/logout', { refreshToken }).catch(err => console.error(err));
                    }
                    setToken(null); // ...
                }
            */
            // This `logout` function is recreated on every render.
            // If we pass `[]` to useEffect, we capture the INITIAL `logout` function.
            // That `logout` function captures the initial state.
            // But `setToken` is stable. `localStorage` is global. `api` is module level.
            // The only issue is `queryClient` (stable).
            // So `logout` captured from initial render is likely fine.


    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post('/login', credentials);
            return response.data;
        },
        onSuccess: (data) => {
            setToken(data.accessToken);
            setAuthToken(data.accessToken);
            setUser(data.user);
            localStorage.setItem('refreshToken', data.refreshToken);
        },
    });

    const logout = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
             // We don't strictly need the access token for logout endpoint if it just invalidates refresh token
             // But usually it's authenticated.
             // If we are logging out because of invalid refresh token, this might fail, which is fine (catch).
             api.post('/logout', { refreshToken }).catch(err => console.error(err));
        }
        setToken(null);
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem('refreshToken');
        queryClient.clear();
    };

    return (
        <AuthContext.Provider value={{ user, token, login: loginMutation.mutateAsync, logout, loading, isLoggingIn: loginMutation.isPending, loginError: loginMutation.error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
