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
import { deletedNote } from "../action"
import { ButtonX } from "../components/Button"
import Avatar from "../components/@nextx3/avatar/avatar"

export function NoteCard({ note: note }: any) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <Avatar userId={note.user} />
                <CardTitle>{note.note}</CardTitle>
                {/* <CardDescription>{note.note}</CardDescription> */}
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className="flex justify-between">
                <form action={deletedNote}>
                    <input type="text" name="userId" hidden value={note?._id} readOnly />
                    <ButtonX>Delete</ButtonX>
                </form>
            </CardFooter>
        </Card>
    )
}