import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { domain } from "../pub-domain"

async function getData(_id: any) {

    const res = await fetch(`${domain}/api/user?id=${_id}`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function SignIn() {

    const cookieStore = cookies()
    const hasCookie = cookieStore.has('email')

    if (hasCookie) {
        redirect('/otp')
    }

    async function create(formData: FormData) {
        'use server'
        try {
            const email = formData.get('email')
            const password = formData.get('password')

            const rawData = {
                email: email,
                password: password
            }

            const response = await fetch(`${domain}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rawData)
            })


            if (!response.ok) {
                return { message: 'Failed to login' }
            }

            const data = await response.json()

            cookies().set('email', data.user.email, { secure: true })
            cookies().set('name', data.user.name, { secure: true })
            cookies().set('_id', data.user._id, { secure: true })
            cookies().set('asset', data.user.asset, { secure: true })

            console.log('Login Success', data)
        } catch (e) {
            return { message: 'Failed to login' }
        }
    }

    return (
        <>
            <div className=" flex justify-center items-center h-screen">
                <form className="space-y-4 md:space-y-6" action={create}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign In Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Name</Label>
                                <Input id="email" type="email" name="email" defaultValue="example@example.com" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" name="password" defaultValue="@peduarte" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button type="submit" className=" w-full block">Sign In</Button>
                            <Link href={'/sign-up'} className=" block">Don't have account?</Link>
                        </CardFooter>
                    </Card>
                </form>
            </div>


        </>
    )
}