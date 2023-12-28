import { cache } from 'react'
export const getUsers = cache(async () => {

    try {
        const item = await fetch(`http://localhost:3000/api/user/`);
        return await item.json()

    } catch (error) {
        console.log(error, 'Error from User Api')
    }
})

export async function getData(userId: string) {
    const res = await fetch(`http://localhost:3000/api/user?id=${userId}`, {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}