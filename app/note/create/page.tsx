import { cookies } from "next/headers"
import { create } from "../../action"
import { ButtonX } from "@/app/components/Button"
import Editor from "./Editor"
import { useState } from "react"

export default function Page() {
    const [editorContent, setEditorContent] = useState(null)

    console.log(JSON.stringify(editorContent, null, 2))

    const cookieStore = cookies()
    const email = cookieStore.get('email')
    const _id = cookieStore.get('_id')

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new note</h2>
                <form action={create}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-5">
                        <div className="sm:col-span-2">
                            <input type="hidden" name="user" id="user" value={_id?.value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                            {/* <input type="hidden" name="user" id="user" value={"658e3b14629718e6fff489b5"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" /> */}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
                            <textarea value={JSON.stringify(editorContent, null, 2) ?? undefined} onChange={e => setEditorContent(JSON.parse(e.target.value))} name="note" id="note" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                            {/* <textarea name="note" id="note" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea> */}
                        </div>
                        <Editor
                            setEditorContent={setEditorContent}
                            editorContent={editorContent}
                            initialContent=""
                        />
                    </div>
                    <ButtonX>Save</ButtonX>
                </form>
            </div>
        </section>
    )
}