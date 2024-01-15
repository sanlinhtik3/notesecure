"use client"

import { useEffect, useState } from "react"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from "../config";
import { useRouter } from "next/navigation";

import * as React from "react"

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

export default function Page() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOTP] = useState('');
    const [comfirmationResult, setComfirmationResult] = useState<any>(null);
    const [otpSent, setOTPSent] = useState(false);

    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'normal',
            'callback': (response: any) => {
                console.log(response);
            },
            'expired-callback': () => {
                console.log('expired-callback');
            }
        });
    }, [auth]);

    const handlePhoneNumberChange = (event: any) => {
        setPhoneNumber(event.target.value);
    }

    const handleOTPChange = (event: any) => {
        setOTP(event.target.value);
    }

    const handleSendOTP = async () => {
        try {
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            console.log(confirmation);
            setComfirmationResult(confirmation);
            setOTPSent(true);
            setPhoneNumber('');
            alert('OTP sent successfully');
        } catch (error) {
            console.log(error);
        }
    }

    const handleOTPSubmit = async () => {
        try {
            await comfirmationResult.confirm(otp);
            setOTP('');
            router.push('/note');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=" h-screen flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>OTP</CardTitle>
                    <CardDescription>Comfirm OTP</CardDescription>
                </CardHeader>
                <CardContent>
                    {!otpSent ? (
                        <div id="recaptcha-container"></div>
                    ) : null}

                    <div className="space-y-1">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            type="tel"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            placeholder="Enter phone number"
                            className="border border-gray-300 rounded-md p-2 mb-4"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="otp">OTP</Label>
                        <Input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={handleOTPChange}
                            placeholder="Enter OTP"
                            className="border border-gray-300 rounded-md p-2 mb-4"
                        />
                    </div>



                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        onClick={otpSent ? handleOTPSubmit : handleSendOTP}
                        variant={`${otpSent ? 'outline' : 'default'}`}
                        // className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white rounded-md p-2`}
                        // style={{ backgroundColor: otpSent ? 'green' : 'blue' }}
                    >
                        {otpSent ? 'Submit' : 'Request OTP'}
                    </Button>
                </CardFooter>
            </Card>
        </div >
    )
}