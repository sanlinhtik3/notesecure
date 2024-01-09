import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '../components/@nextx3/table'
import { getUsers } from '../utils/user'
import UserTable from './UserTable'

export default async function Home() {
    const cookieStore = cookies()
    const theme = cookieStore.get('email')
    const hasCookie = cookieStore.has('email')

    if (!hasCookie) {
        redirect('/sign-in')
    }

    return (
        <div>
            <h1 className=' my-10'>All User</h1>
            <UserTable />
        </div>
    )
}