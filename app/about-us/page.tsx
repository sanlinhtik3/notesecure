import { Editor } from "novel";
import { aboutContent } from "./default-content";

export default function Page() {

    return (
        <div className=" max-w-screen-lg mx-auto">
            <Editor
            className=" w-full"
                defaultValue={aboutContent}
            // disableLocalStorage={true}
            />
        </div>
    )
}