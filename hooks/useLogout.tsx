'use client';

import useContextHook from './useContextHook';
import { useRouter } from 'next/navigation';

const useLogout = () => {
    const { auth, setAuth, setLoading }: any = useContextHook({ context: 'auth' });
    const router = useRouter();

    const logout = async () => {
        const channels = auth.user.channelIds;

        localStorage.removeItem('channel-url');
        localStorage.removeItem('friends-tab');
        localStorage.removeItem('user-settings');
        localStorage.removeItem('auth');

        if (channels.length > 0) {
            channels.forEach((channel: any) => {
                localStorage.removeItem(`channel-${channel}`);
            });
        }

        setAuth(null);
        router.push('/login');
    };

    return { logout };
};

export default useLogout;
