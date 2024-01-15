"use client"

import { useState, useEffect } from 'react';
import { getData } from "@/app/utils/user";

export default function Avatar({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId) return;

                setLoading(true);

                const userData = await getData(userId);

                setData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) {
        // You can customize the loading state, for example, show a spinner or a loading message.
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available for the user</div>;
    }

    // console.log(data)

    return (
        <>
            <div className="mb-5">
                <h1 className="text-gray-400 text-xs">{data.name}</h1>
                <h1 className="text-gray-400 text-xs">{data.email}</h1>
            </div>
        </>
    );
}
