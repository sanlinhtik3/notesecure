import { cache } from "react";
import Note from "../models/note.model";
import { domain } from "../pub-domain";

export const getNotes = cache(async () => {
  try {
    // const item = await Note.find();
    // return item

    const item = await fetch(`${domain}/api/note/`);
    return await item.json();
  } catch (error) {
    console.log(error, "Error from Note Api utils note.ts getNotes");
  }
});

export async function getNotesById(userId: string) {
  try {
    const item = await fetch(`${domain}/api/note/${userId}`);
    return await item.json();
  } catch (error) {
    console.log(error, "Error from Note Api utils note.ts getNotesById");
  }
}
