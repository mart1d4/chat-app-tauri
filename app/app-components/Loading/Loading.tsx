'use client';

import { ReactElement, useEffect, useState } from 'react';
import useContextHook from '@/hooks/useContextHook';
import { useRouter } from 'next/navigation';

const Loading = ({ children }: { children: ReactElement }): ReactElement => {
    const [loading, setLoading] = useState<boolean>(true);

    const { auth, setAuth }: any = useContextHook({ context: 'auth' });
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        const authStorage = JSON.parse(localStorage.getItem('auth') || '{}');

        if (authStorage) {
            const username = authStorage.user?.username;
            const password = authStorage.user?.password;

            if (username && password) {
                const getUserData = async (): Promise<void> => {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            client: 'app',
                        }),
                    }).then((res) => res.json());

                    if (response.success) {
                        const authObj = {
                            accessToken: response.accessToken,
                            user: {
                                ...response.user,
                                password: password,
                            },
                        };

                        setAuth(authObj);
                        localStorage.setItem('auth', JSON.stringify(authObj));
                        setLoading(false);
                    } else {
                        setAuth(null);
                        localStorage.removeItem('auth');
                        router.push('/login');
                    }
                };

                getUserData();
            } else {
                setAuth(null);
                localStorage.removeItem('auth');
                router.push('/login');
            }
        } else {
            setAuth(null);
            router.push('/login');
        }
    }, []);

    return (
        <div
            className='appWrapper'
            onDrag={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            onDragEnd={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
        >
            {!loading && auth?.accessToken ? (
                children
            ) : (
                <div className='splashScreenPlayer'>
                    <video
                        autoPlay
                        loop
                    >
                        <source
                            src='/assets/app/spinner.webm'
                            type='video/webm'
                        />
                    </video>
                </div>
            )}
        </div>
    );
};

export default Loading;
