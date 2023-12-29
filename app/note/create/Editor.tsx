"use client"

import { useState } from "react";
import { BlockNoteEditor, Block, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

type editorProps = {
    initialContent?: string;
    editorContent?: any;
    setEditorContent?: any;
}

export default function Editor({ initialContent, editorContent, setEditorContent }: editorProps) {
    // Stores the editor's contents as an array of Block objects.
    const [blocks, setBlocks] = useState<Block[] | null>(null);

    // Creates a new editor instance.
    const editor: BlockNoteEditor = useBlockNote({
        // Listens for when the editor's contents change.
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : null,
        onEditorContentChange: (editor) => {
            // Converts the editor's contents to an array of Block objects.
            setBlocks(editor.topLevelBlocks)
            setEditorContent(editor.topLevelBlocks)
        }
    })

    // Renders the editor instance and its contents, as an array of Block
    // objects, below.
    return (
        <div>
            <BlockNoteView editor={editor} theme={"dark"} />
            <pre>{JSON.stringify(blocks, null, 2)}</pre>
        </div>
    );
}