import { useEffect, useState } from 'react';
import style from "./style.module.css";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { INotification } from '../../interfaces';

const getMessages = async (): Promise<INotification[]> => {
    const response = await axios.get('http://localhost:3001/api/v1/chat');
    return response.data;
};

const sendMessage = async (message: string): Promise<INotification> => {
    const response = await axios.post('http://localhost:3001/api/v1/chat', { message });
    return response.data;
};

function MessageBlock() {
    const [message, setMessage] = useState<string>('');
    const [isInitWS, setIsInitWS] = useState(false);
    const queryClient = useQueryClient();


    const { data, isLoading, error } = useQuery<INotification[]>({
        queryKey: ['messages'],
        queryFn: getMessages,
    });

    const mutation = useMutation<INotification, Error, string>({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        },
    });

    const wsUrl = 'ws://localhost:3001';
    useEffect(() => {
        if (isInitWS) {
            return;
        }

        const ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data);
            if (type === 'add') {
                queryClient.setQueryData(['messages'], (oldMessages: INotification[] = []) => {
                    if (oldMessages.some(({ id }) => id === data.id)) return oldMessages;
                    return [
                        ...oldMessages,
                        data
                    ]
                });
            } else if (type === 'remove') {
                queryClient.setQueryData(['messages'], (oldMessages: INotification[] = []) =>
                    oldMessages.filter(({ id }) => id !== data.id)
                );
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
        setIsInitWS(true);
    }, [wsUrl]);


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <div className={style.container}>
            <div className={style.messages}>
                {data?.map((el) => (
                    <div key={el.id} className={style.messageItem}>
                        <span className={style.messageText}>{el.message}</span>
                        <span className={style.messageDate}>{formatDate(el.id)}</span>
                    </div>
                ))}
            </div>

            <div className={style.inputContainer}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={style.messageInput}
                />
                <button
                    onClick={() => {
                        mutation.mutate(message);
                        setMessage('');
                    }}
                    className={style.sendButton}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default MessageBlock
