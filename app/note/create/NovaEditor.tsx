"use client"

import { Editor } from "novel";

export default function NovaEditor({ setEditorContent, editorContent }: any) {
    return <Editor defaultValue={JSON.parse(editorContent)}
        // value?.getJSON()
        onUpdate={(value) => {
            setEditorContent(JSON.stringify(value?.getJSON(), null, 2))
        }}
        disableLocalStorage={true}
    />;
}