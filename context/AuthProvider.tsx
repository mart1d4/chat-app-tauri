'use client';

import { ReactElement, ReactNode, createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<AuthContextValueType>(null);

const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [auth, setAuth] = useState<AuthObjectType>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem('auth');

        if (auth) {
            const { username, password } = JSON.parse(auth).user;

            if (!username || !password) {
                setLoading(false);
                router.push('/login');
            } else {
                const getUserData = async (): Promise<void> => {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username,
                            password,
                            client: 'app',
                        }),
                    }).then((res) => res.json());

                    if (!response.success) {
                        setLoading(false);
                        router.push('/login');
                    } else {
                        setAuth({
                            accessToken: response.accessToken,
                            user: {
                                ...response.user,
                                password: password,
                            },
                        });

                        localStorage.setItem(
                            'auth',
                            JSON.stringify({
                                accessToken: response.accessToken,
                                user: {
                                    ...response.user,
                                    password: password,
                                },
                            })
                        );

                        router.push('/channels/me');
                    }
                };

                getUserData();
            }
        }

        setLoading(false);
    }, []);

    const value: AuthContextValueType = {
        auth,
        setAuth,
        loading,
        setLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
