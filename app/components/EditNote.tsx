"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { edit } from "../action";
import { ButtonX } from "./Button";
import Editor from "../note/create/Editor";
import { useState } from "react";

export default function EditNote({ note }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [editorContent, setEditorContent] = useState(note?.note)

    return (
        <>
            <Button onPress={onOpen}>Edit</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Note</ModalHeader>
                            <form action={edit}>
                                <ModalBody>
                                    {/* <p>{note?.note}</p> */}

                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div className="sm:col-span-2">
                                            {/* <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label> */}
                                            <input type="hidden" name="_id" defaultValue={note?._id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                                            <input type="hidden" name="user" id="user" defaultValue={note?.user} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
                                            <input name="note" id="note"
                                                type="hidden"
                                                value={JSON.stringify(editorContent, null, 2) ?? undefined} onChange={e => setEditorContent(JSON.parse(e.target.value))}
                                                defaultValue={note?.note} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here" />
                                            <Editor
                                                setEditorContent={setEditorContent}
                                                editorContent={editorContent}
                                                initialContent={note?.note}
                                            />
                                        </div>
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <ButtonX color="primary">Update</ButtonX>
                                    {/* <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button> */}
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
