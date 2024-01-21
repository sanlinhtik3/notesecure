import { cache } from "react";
import { domain } from "../pub-domain";
export const getUsers = cache(async () => {
  try {
    const item = await fetch(`${domain}/api/user/`);
    return await item.json();
  } catch (error) {
    console.log(error, "Error from User Api");
  }
});

// export async function getData(userId: string) {
//   const res = await fetch(`${domain}/api/user?id=${userId}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }
