"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import Editor from "../note/create/Editor";
import NovaEditor from "../note/create/NovaEditor";

export default function HahaBox({ note }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [editorContent, setEditorContent] = useState(note?.note)

    // console.log(JSON.parse(note.note))

    return (
        <>
            <Button onPress={onOpen} className=" !bg-black text-white">Detail</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>

                            {/* <Editor
                                setEditorContent={setEditorContent}
                                editorContent={editorContent}
                                initialContent={note?.note}
                                editable={false}
                            /> */}

                            {/* <NovaEditor editorContent={note?.note} /> */}

                            <ModalBody>
                                {/* <p>{note?.note}</p> */}
                                <NovaEditor editorContent={note?.note} />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
