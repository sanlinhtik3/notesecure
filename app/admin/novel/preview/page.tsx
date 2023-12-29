"use client"

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import { Editor } from "novel";
import { defaultEditorContent } from './default-content';

export default () => {
    const [editable, setEditable] = useState(false)
    const editor = useEditor({
        editable,
        content: `
        <p>
          This text is <strong>read-only</strong>. No matter what you try, you are not able to edit something. Okay, if you toggle the checkbox above you’ll be able to edit the text.
        </p>
        <p>
          If you want to check the state, you can call <code>editor.isEditable()</code>.
        </p>
      `,
        extensions: [StarterKit],
    })

    useEffect(() => {
        if (!editor) {
            return undefined
        }

        editor.setEditable(editable)
    }, [editor, editable])

    if (!editor) {
        return null
    }

    return (
        <>
            <div className="checkbox">
                <input
                    type="checkbox"
                    id="editable"
                    value={editable.toString()}
                    onChange={event => setEditable(event.target.checked)}
                />
                <label htmlFor="editable">editable</label>
            </div>
            <EditorContent editor={editor} />
            <Editor
                onUpdate={(editor) => {
                    console.log(editor?.getHTML());
                }}

                defaultValue={defaultEditorContent}
                disableLocalStorage={true}
            />
        </>
    )
}