"use client"

import { domain } from '@/app/pub-domain';
import { useState, useEffect } from 'react';

export async function getData(userId: string) {
    const res = await fetch(`${domain}/api/user?id=${userId}`, {
        // const res = await fetch(`http://localhost:3000/api/user?id=658e3b14629718e6fff489b5`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default function Avatar({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId) return;

                setLoading(true);

                const userData = await getData(userId);

                console.log(userData)

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
