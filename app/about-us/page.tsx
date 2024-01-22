import { Editor } from "novel";
import { aboutContent } from "./default-content";

export default function Page() {

    return (
        <>
            <Editor
                defaultValue={aboutContent}
            // disableLocalStorage={true}
            />
        </>
    )
}