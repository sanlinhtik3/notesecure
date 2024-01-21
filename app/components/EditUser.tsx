import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { ButtonX } from "./Button";
import { AES, enc } from 'crypto-js';
import { useState } from "react";
import { domain } from "../pub-domain";
import { cookies } from "next/headers";

export async function editUser(formData: FormData) {
    const _id = formData.get("_id");
    const name = formData.get("name");
    const asset = formData.get("asset");
    const password = formData.get("password");

    const rawData = {
        _id: _id,
        name: name,
        asset: asset,
        password: password,
    };

    console.log("omghhhhhh", rawData);

    const updatedUser = await fetch(`${domain}/api/user/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rawData),
    });

    if (!updatedUser.ok) {
        return { message: "Failed to Edit" };
    }

    return await updatedUser.json();
}


export default function EditUser({ note }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [asset, setAsset] = useState(note.asset);

    return (
        <>
            <Button onPress={onOpen}>Edit Profile</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <Button variant="light">
                                    Edit Note
                                </Button>
                            </ModalHeader>
                            <form action={editUser}>
                                <ModalBody>
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div className="sm:col-span-2">
                                            <input type="hidden" name="_id" defaultValue={note?._id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                                            <Input id="name" name="name" defaultValue={note?.name === null ? "Unknown" : note?.name} placeholder="Your description here" />
                                        </div>
                                        {/* <div className="sm:col-span-2">
                                            <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Asset</label>
                                            <Input id="note" name="asset" value={asset} onChange={(e) => setAsset(e.target.value)} placeholder="Asset" />
                                        </div> */}
                                        <div className="sm:col-span-2">
                                            <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                                            <Input id="note" name="password" placeholder="New Password" />
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <ButtonX>Update</ButtonX>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
