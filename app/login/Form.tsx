'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRef, useState, useEffect, ReactElement, MouseEvent } from 'react';
import useContextHook from '@/hooks/useContextHook';
import { LoadingDots } from '../app-components';
import { useRouter } from 'next/navigation';
import styles from '../Auth.module.css';
import Link from 'next/link';

const Form = (): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { auth, setAuth, loading }: any = useContextHook({ context: 'auth' });
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        const authLocal = JSON.parse(localStorage.getItem('auth') || '{}');

        if (authLocal?.accessToken || auth?.accessToken) {
            const channelUrl = localStorage.getItem('channel-url');

            if (channelUrl) router.push(channelUrl);
            else router.push('/channels/me');
        }
    }, [auth, loading]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            e.stopPropagation();
            if (e.key === 'Enter') {
                handleSubmit(e as unknown as MouseEvent);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [username, password, isLoading]);

    useEffect(() => {
        usernameInputRef.current?.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [username, password]);

    const handleSubmit = async (e: MouseEvent): Promise<void> => {
        e.preventDefault();

        if (isLoading || !username || !password) return;
        setIsLoading(true);

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
            setError(response.message || 'An error occurred');
            setIsLoading(false);
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

            setUsername('');
            setPassword('');
            setIsLoading(false);
            router.push('/channels/me');
        }
    };

    return (
        <div className={styles.loginBlock}>
            <div>
                <label
                    htmlFor='username'
                    style={{
                        color: error.length ? 'var(--error-light)' : 'var(--foreground-3)',
                    }}
                >
                    Username
                    {error.length ? (
                        <span className={styles.errorLabel}> - {error}</span>
                    ) : (
                        <span> *</span>
                    )}
                </label>
                <div className={styles.inputContainer}>
                    <input
                        ref={usernameInputRef}
                        id='username'
                        type='text'
                        name='username'
                        aria-label='Username'
                        autoCapitalize='off'
                        autoComplete='off'
                        autoCorrect='off'
                        spellCheck='false'
                        aria-labelledby='username'
                        aria-describedby='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>

            <div style={{ marginBottom: 0 }}>
                <label
                    htmlFor='password'
                    style={{
                        color: error.length ? 'var(--error-light)' : 'var(--foreground-3)',
                    }}
                >
                    Password
                    {error.length ? (
                        <span className={styles.errorLabel}>- {error}</span>
                    ) : (
                        <span>*</span>
                    )}
                </label>
                <div className={styles.inputContainer}>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        aria-label='Password'
                        autoCapitalize='off'
                        autoComplete='off'
                        autoCorrect='off'
                        spellCheck='false'
                        aria-labelledby='password'
                        aria-describedby='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <button
                type='button'
                className={styles.passwordForgot}
                onClick={(e) => {
                    e.preventDefault();
                    router.push('/forgot-password');
                }}
            >
                Forgot your password?
            </button>

            <button
                type='submit'
                className={styles.buttonSubmit}
                onClick={(e) => handleSubmit(e)}
            >
                {isLoading ? <LoadingDots /> : 'Log In'}
            </button>

            <div className={styles.bottomText}>
                <span>Need an account?</span>
                <Link href='/register'>Register</Link>
            </div>
        </div>
    );
};

export default Form;
