import { cache } from 'react'
import User from '../models/user.model'
import { NextResponse } from 'next/server';

export const getUsers = cache(async () => {

    try {
        // const item = await User.find();
        // return item

        const item = await fetch(`http://localhost:3000/api/user/`);
        return await item.json()

    } catch (error) {
        console.log(error, 'Error from User Api')
    }

    // const item = await fetch(`http://localhost:3000/api/user`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })

    // const users = await item.json()
    // return users
})

export async function getData(userId: string) {
    const res = await fetch(`http://localhost:3000/api/user?id=${userId}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}