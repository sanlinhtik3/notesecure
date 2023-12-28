import { Button } from "@/components/ui/button"
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
import Link from "next/link"
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function SignUP() {

    const cookieStore = cookies()
    const hasCookie = cookieStore.has('email')

    if (hasCookie) {
        redirect('/admin')
    }

    async function create(formData: FormData) {
        'use server'
        try {
            const name = formData.get('name')
            const email = formData.get('email')
            const password = formData.get('password')

            const rawData = {
                name: name,
                email: email,
                password: password
            }

            // console.log(rawData)

            const response = await fetch('http://localhost:3000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rawData)
            })

            if (!response.ok) {
                return { message: 'Failed to create' }
            }

            const data = await response.json()

            cookies().set('email', data.user.email, { secure: true })
            cookies().set('name', data.user.name, { secure: true })
            cookies().set('_id', data.user._id, { secure: true })

            console.log('Sign Up Success', data)
        } catch (e) {
            return { message: 'Failed to create' }
        }
    }

    return (
        <>
            <div className=" flex justify-center items-center h-screen">
                <form className="space-y-4 md:space-y-6" action={create}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="name" name="name" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" name="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Sign Up</Button>
                            <Link href={'/sign-in'}>Don't have account?</Link>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </>
    )
}