import { cookies } from "next/headers";

export default function UserProfile() {
  const cookieStore = cookies();
  const email = cookieStore.get("email")?.value;
  const name = cookieStore.get("name")?.value;
  const asset = cookieStore.get("asset")?.value;
  const _id = cookieStore.get("_id")?.value;

  console.log(_id);

  return (
    <>
      <div className="mb-5">
        <h1 className="text-gray-400 text-xs">Name: {name}</h1>
        <h1 className="text-gray-400 text-xs">Email: {email}</h1>
        <h1 className="text-gray-400 text-xs">You are: {asset}</h1>
      </div>
    </>
  );
}
