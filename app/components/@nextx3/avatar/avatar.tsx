import { getData } from "@/app/utils/user"

export default async function Avatar({ userId }: { userId: string }) {
    const data = await getData(userId)
    console.log(data)
    return (
        <>
            <div className=" mb-5">
                <h1>{data.name} </h1>
                <h1 className=" text-gray-400 text-xs">{data.email} </h1>
            </div>
        </>
    )
}