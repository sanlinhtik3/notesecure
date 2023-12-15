"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function HahaBox({ note }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>Detail</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>{note?.note}</p>
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
