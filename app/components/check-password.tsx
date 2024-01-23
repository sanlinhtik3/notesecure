"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';


// Password validation function
const getPasswordStrength = (password: string): number => {
    const minLength = 6;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);

    const criteriaMet = [hasSpecialChar, hasLowerCase, hasUpperCase, hasDigit]
        .filter(Boolean)
        .length;

    const strength = Math.min((criteriaMet / 4) * 100, 100);
    return Math.max(strength, password.length >= minLength ? 25 : 0);
};

export default function CheckPassword({ name }: any) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

    const handleRecaptchaChange = (value: string | null) => {
        setRecaptchaValue(value);
        localStorage.setItem('recaptchaValue', value || '');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        console.log(formData)

        // Validate password on input change
        if (name === 'password') {
            validatePassword(value);
        }
    };

    const validatePassword = (password: string) => {
        const errors: string[] = [];

        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long.');
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character.');
        }

        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter a-z.');
        }

        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter A-Z.');
        }

        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one digit 0-1.');
        }

        setPasswordErrors(errors);
    };

    const getProgressBarColor = (strength: number): string => {
        if (strength < 25) {
            return 'bg-red-500';
        } else if (strength < 50) {
            return 'bg-yellow-500';
        } else if (strength < 75) {
            return 'bg-blue-500';
        } else {
            return 'bg-green-500';
        }
    };

    const getPasswordStrengthText = (strength: number): string => {
        if (strength < 25) {
            return 'Weak';
        } else if (strength < 50) {
            return 'Moderate';
        } else if (strength < 75) {
            return 'Strong';
        } else {
            return 'Very Strong';
        }
    };

    const strength = getPasswordStrength(formData.password);
    const strengthText = getPasswordStrengthText(strength);
    const strengthPercentage = Math.round(strength);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate password
        validatePassword(formData.password);

        // Check if there are any errors
        if (passwordErrors.length > 0) {
            return;
        }

        // Continue with signUp logic
        // ...

        try {
            // ...
        } catch (error) {
            console.error('Failed to create', error);
        }
    };

    return (
        <div className="">
            {/* <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}> */}
            {/* ... (your existing code) ... */}
            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    name={name}
                    value={formData.password}
                    onChange={handleInputChange}
                />
                {passwordErrors.length > 0 && (
                    <div className="text-red-500 text-sm">
                        <ul>
                            {passwordErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    type="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
            </div>

            {formData.password === formData.confirmPassword ? (
                <div className="text-green-500 text-sm"> Passwords match</div>
            ) : (
                <div className="text-red-500 text-sm"> Passwords do not match</div>
            )}

            <div className="flex items-center space-x-2">
                <div className={`h-2 w-full ${getProgressBarColor(strength)}`} />
                <div className={`text-sm ${getProgressBarColor(strength)}`}>
                    {strengthText} ({strengthPercentage}%)
                </div>
            </div>
            <div className="mb-4">
                <ReCAPTCHA
                    sitekey="6LdPxEIpAAAAABD4yu122OiSSAndenZdSbuSSmGv"
                    onChange={handleRecaptchaChange}
                />
            </div>
            {/* <Button type="submit">Sign Up</Button> */}
            {/* ... (your existing code) ... */}
            {/* </form> */}
        </div>
    );
}
