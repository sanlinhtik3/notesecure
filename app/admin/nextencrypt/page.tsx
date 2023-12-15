"use client"

import { useState } from 'react';
import { AES, enc } from 'crypto-js';

export default function Home() {
    const [originalText, setOriginalText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    const handleEncrypt = () => {
        const password = 'your-secret-password'; // Replace with your secret password
        const encrypted = AES.encrypt(originalText, password).toString();
        setEncryptedText(encrypted);
    };

    const handleDecrypt = () => {
        const password = 'your-secret-password'; // Replace with your secret password
        const decrypted = AES.decrypt(encryptedText, password).toString(enc.Utf8);
        setDecryptedText(decrypted);
    };

    return (
        <div className=' text-pink-500'>
            <h1>Text Encryption and Decryption</h1>
            <div>
                <label>Original Text:</label>
                <textarea
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleEncrypt} className=' text-blue-500'>Encrypt</button>
            </div>
            {encryptedText && (
                <div>
                    <label>Encrypted Text:</label>
                    <textarea readOnly value={encryptedText} />
                </div>
            )}
            <div>
                <button onClick={handleDecrypt}>Decrypt</button>
            </div>
            {decryptedText && (
                <div>
                    <label>Decrypted Text:</label>
                    <textarea readOnly value={decryptedText} />
                </div>
            )}
        </div>
    );
}
