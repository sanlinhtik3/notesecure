import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { domain } from "../sign-in/page"

export default function SignUP() {

    const cookieStore = cookies()
    const hasCookie = cookieStore.has('email')

    if (hasCookie) {
        redirect('/admin')
    }

    async function signUp(formData: FormData) {
        'use server'
        try {
            const rawData = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                asset: 0,
            }

            // console.log(rawData)

            const response = await fetch(`${domain}/api/user`, {
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

            cookies().set('email', data.email,)
            cookies().set('name', data.name,)
            cookies().set('_id', data._id,)
            cookies().set('asset', data.asset,)

            console.log('Sign Up Success', data)
        } catch (e) {
            return { message: 'Failed to create' }
        }
    }

    return (
        <>
            <div className=" flex justify-center items-center h-screen">
                <form className="space-y-4 md:space-y-6" action={signUp}>
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
                            <button type="submit">Sign Up</button>
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