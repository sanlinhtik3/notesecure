"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Editor from "../note/create/Editor";
import { useState } from "react";

export default function HahaBox({ note }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [editorContent, setEditorContent] = useState(note?.note)

    return (
        <>
            <Button onPress={onOpen}>Detail</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>

                            <Editor
                                setEditorContent={setEditorContent}
                                editorContent={editorContent}
                                initialContent={note?.note}
                                editable={false}
                            />

                            <ModalBody>
                                {/* <p>{note?.note}</p> */}
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
