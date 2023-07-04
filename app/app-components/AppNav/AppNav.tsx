'use client';

import { ReactElement, useEffect, useState, useMemo } from 'react';
import useContextHook from '@/hooks/useContextHook';
import { usePathname } from 'next/navigation';
import pusher from '@/lib/pusher/connection';
import styles from './AppNav.module.css';
import NavIcon from './NavIcon';

const AppNav = (): ReactElement => {
    const [url, setUrl] = useState<string>('/channels/me');
    const [trigger, setTrigger] = useState<any>(null);
    const [notifDM, setNotifDM] = useState<
        {
            channel: TChannel;
            count: number;
        }[]
    >([]);

    const { auth, setAuth }: any = useContextHook({ context: 'auth' });
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.startsWith('/channels/me')) {
            localStorage.setItem('channel-url', pathname);
            setUrl(pathname);
        }
    }, [pathname]);

    useEffect(() => {
        if (auth.user.notifications.length) {
            const filtered = auth.user.notifications.filter((notification: any) =>
                auth.user.channelIds.includes(notification?.channel)
            );

            const notifications = filtered.map((notification: any) => {
                const channel = auth.user.channels.find((channel: any) => channel.id === notification?.channel);

                let name = channel?.name;
                if (channel.type === 'DM') {
                    const user = channel.recipients.find((user: any) => user.id !== auth.user.id);
                    name = user?.username;
                } else if (channel.type === 'GROUP_DM' && !channel.name) {
                    const filteredMembers = channel.recipients.filter((user: any) => user.id !== auth.user.id);
                    name = filteredMembers.map((user: any) => user.username).join(', ');
                }

                let src = `${process.env.NEXT_PUBLIC_CDN_URL}${channel?.icon}/`;
                if (channel.type === 'DM') {
                    const user = channel.recipients.find((user: any) => user.id !== auth.user.id);
                    src = `${process.env.NEXT_PUBLIC_CDN_URL}${user.avatar}/`;
                }

                return {
                    channel: {
                        ...channel,
                        name: name,
                        icon: src,
                    },
                    count: notification?.count,
                };
            });

            setNotifDM(notifications);
        }
    }, [auth.user.notifications]);

    useEffect(() => {
        const setPusherListener = () => {
            pusher.bind(`user-updated`, (data: any) => setData(data));
            pusher.bind(`message-sent`, (data: any) => setTrigger(data));

            pusher.bind(`user-friend`, (data: any) => {
                setUserData({
                    data: data,
                    type: 'friend',
                });
            });

            pusher.bind(`user-request`, (data: any) => {
                setUserData({
                    data: data,
                    type: 'request',
                });
            });

            pusher.bind(`user-blocked`, (data: any) => {
                setUserData({
                    data: data,
                    type: 'blocked',
                });
            });

            pusher.bind(`user-unblocked`, (data: any) => {
                setUserData({
                    data: data,
                    type: 'unblocked',
                });
            });

            pusher.bind(`user-removed`, (data: any) => {
                setUserData({
                    data: data,
                    type: 'removed',
                });
            });
        };

        setPusherListener();

        return () => {
            pusher.unbind('user-updated');
            pusher.unbind('message-sent');
            pusher.unbind('user-friend');
            pusher.unbind('user-request');
            pusher.unbind('user-blocked');
            pusher.unbind('user-unblocked');
            pusher.unbind('user-removed');
        };
    }, []);

    const setUserData = ({ data, type }: any) => {
        if (![data.sender.id, data.user.id].includes(auth.user.id)) return;

        if (type === 'request' && data.user.id === auth.user.id) {
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    requestsReceived: [...(auth.user.requestsReceived || []), data.sender],
                    requestsReceivedIds: [...(auth.user.requestsReceivedIds || []), data.sender.id],
                },
            });
            return;
        } else if (type === 'friend' && data.user.id === auth.user.id) {
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    requestsSent: auth.user.requestsSent?.filter((request: any) => request.id !== data.sender.id),
                    requestsSentIds: auth.user.requestsSentIds?.filter((request: any) => request !== data.sender.id),
                    requestsReceived: auth.user.requestsReceived?.filter(
                        (request: any) => request.id !== data.sender.id
                    ),
                    requestsReceivedIds: auth.user.requestsReceivedIds?.filter(
                        (request: any) => request !== data.sender.id
                    ),
                    friends: [...(auth.user.friends || []), data.sender],
                    friendIds: [...(auth.user.friendIds || []), data.sender.id],
                },
            });
            return;
        } else if ((type === 'blocked' || type === 'removed') && data.user.id === auth.user.id) {
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    requestsSent: auth.user.requestsSent?.filter((request: any) => request.id !== data.sender.id),
                    requestsSentIds: auth.user.requestsSentIds?.filter((request: any) => request !== data.sender.id),
                    requestsReceived: auth.user.requestsReceived?.filter(
                        (request: any) => request.id !== data.sender.id
                    ),
                    requestsReceivedIds: auth.user.requestsReceivedIds?.filter(
                        (request: any) => request !== data.sender.id
                    ),
                    friends: auth.user.friends?.filter((friend: any) => friend.id !== data.sender.id),
                    friendIds: auth.user.friendIds?.filter((friend: any) => friend !== data.sender.id),
                },
            });
            return;
        }

        if (type === 'friend' && data.sender.id === auth.user.id) {
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    requestsSent: auth.user.requestsSent?.filter((request: any) => request.id !== data.user.id),
                    requestsSentIds: auth.user.requestsSentIds?.filter((request: any) => request !== data.user.id),
                    friends: [...(auth.user.friends || []), data.user],
                    friendIds: [...(auth.user.friendIds || []), data.user.id],
                },
            });
        } else if (type === 'request' && data.sender.id === auth.user.id) {
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    requestsSent: [...(auth.user.requestsSent || []), data.user],
                    requestsSentIds: [...(auth.user.requestsSentIds || []), data.user.id],
                },
            });
        } else if (type === 'blocked') {
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    blocked: [...(auth.user.blocked || []), data.user],
                    blockedIds: [...(auth.user.blockedIds || []), data.user.id],
                    requestsReceived: auth.user.requestsReceived?.filter((request: any) => request.id !== data.user.id),
                    requestsReceivedIds: auth.user.requestsReceivedIds?.filter(
                        (request: any) => request !== data.user.id
                    ),
                    requestsSent: auth.user.requestsSent?.filter((request: any) => request.id !== data.user.id),
                    requestsSentIds: auth.user.requestsSentIds?.filter((request: any) => request !== data.user.id),
                    friends: auth.user.friends?.filter((friend: any) => friend.id !== data.user.id),
                    friendIds: auth.user.friendIds?.filter((friend: any) => friend !== data.user.id),
                },
            });
        } else if (type === 'unblocked') {
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    blocked: auth.user.blocked?.filter((blocked: any) => blocked.id !== data.user.id),
                    blockedIds: auth.user.blockedIds?.filter((blocked: any) => blocked !== data.user.id),
                },
            });
        } else if (type === 'removed') {
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    requestsReceived: auth.user.requestsReceived?.filter((request: any) => request.id !== data.user.id),
                    requestsReceivedIds: auth.user.requestsReceivedIds?.filter(
                        (request: any) => request !== data.user.id
                    ),
                    requestsSent: auth.user.requestsSent?.filter((request: any) => request.id !== data.user.id),
                    requestsSentIds: auth.user.requestsSentIds?.filter((request: any) => request !== data.user.id),
                    friends: auth.user.friends?.filter((friend: any) => friend.id !== data.user.id),
                    friendIds: auth.user.friendIds?.filter((friend: any) => friend !== data.user.id),
                },
            });
        }
    };

    useEffect(() => {
        if (!trigger) return;

        if (pathname.includes(trigger.channel) || !auth.user.channelIds.includes(trigger.channel)) {
            return;
        }

        const notification = notifDM.find((notif: any) => notif?.channel.id === trigger.channel);

        const channelToMove = auth.user.channels.find((channel: any) => channel.id === trigger.channel);
        const channelsFiltered = auth.user.channels.filter((channel: any) => channel.id !== trigger.channel);

        setAuth({
            ...auth,
            user: {
                ...auth.user,
                notifications: notification
                    ? auth.user.notifications.map((notification: any) => {
                          notification?.channel === trigger.channel
                              ? {
                                    ...notification,
                                    count: notification?.count + 1,
                                }
                              : notification;
                      })
                    : [
                          {
                              channel: trigger.channel,
                              count: 1,
                          },
                          ...auth.user.notifications,
                      ],
                channels: [channelToMove, ...channelsFiltered],
            },
        });

        const audio = new Audio('/assets/sounds/ping.mp3');
        audio.volume = 0.5;
        audio.play();
    }, [trigger]);

    const setData = async (data: any) => {
        if (data.userId === auth.user.id) {
            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    username: data.username || auth.user.username,
                    displayName: data.displayName || auth.user.displayName,
                    description: data.description || auth.user.description,
                    avatar: data.avatar || auth.user.avatar,
                    banner: data.banner || auth.user.banner,
                    primaryColor: data.primaryColor || auth.user.primaryColor,
                    accentColor: data.accentColor || auth.user.accentColor,
                },
            });
        } else if (auth.user.friendIds.includes(data.userId)) {
            auth.user.friends.map((friend: any) => {
                if (friend.id === data.userId) {
                    return {
                        ...friend,
                        username: data.username || friend.username,
                        displayName: data.displayName || friend.displayName,
                        description: data.description || friend.description,
                        avatar: data.avatar || friend.avatar,
                        banner: data.banner || friend.banner,
                        primaryColor: data.primaryColor || friend.primaryColor,
                        accentColor: data.accentColor || friend.accentColor,
                    };
                }

                return friend;
            });
        }
    };

    return useMemo(
        () => (
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {notifDM.map((notification: any) => (
                        <NavIcon
                            key={notification.channel.id}
                            name={notification.channel.name}
                            link={`/channels/me/${notification.channel.id}`}
                            src={notification.channel.icon}
                            count={notification.count}
                        />
                    ))}

                    <NavIcon
                        special={true}
                        name='Direct Messages'
                        link={url}
                        icon='chatApp'
                    />

                    <div className={styles.listItem}>
                        <div className={styles.separator} />
                    </div>

                    <NavIcon
                        green={true}
                        name='Add a Server'
                        link={'/channels/add'}
                        icon='addServer'
                    />

                    <NavIcon
                        green={true}
                        name='Discover Servers'
                        link={'/channels/discover'}
                        icon='discoverServers'
                    />
                </ul>
            </nav>
        ),
        [notifDM, url]
    );
};

export default AppNav;
