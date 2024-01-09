"use client"; // this registers <Editor> as a Client Component

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import dynamic from 'next/dynamic';

type editorProps = {
    initialContent?: any;
    editorContent?: any;
    setEditorContent?: any;
    editable?: boolean;
}

export default function Editor({ initialContent, editorContent, setEditorContent, editable }: any) {
    // Stores the editor's contents as an array of Block objects.
    // const [blocks, setBlocks] = useState<any | null>(null);

    // Creates a new editor instance.
    const editor: BlockNoteEditor = useBlockNote({
        editable,

        // Listens for when the editor's contents change.
        initialContent: initialContent ? JSON.parse(initialContent) as any : undefined,
        onEditorContentChange: (editor) => {
            // Converts the editor's contents to an array of Block objects.
            // setBlocks(editor.topLevelBlocks)
            setEditorContent(editor.topLevelBlocks)
        }
    })

    return (
        <div>
            <BlockNoteView editor={editor} theme={"light"} />
        </div>
    );
}