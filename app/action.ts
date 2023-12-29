"use server";

import { revalidatePath } from "next/cache";
import { domain } from "./pub-domain";

export async function create(formData: FormData) {
  "use server";

  const user = formData.get("user");
  const note = formData.get("note");

  const rawData = {
    user: user,
    note: note,
  };

  console.log(rawData);

  const createUser = await fetch(`${domain}/api/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawData),
  });

  if (!createUser.ok) {
    return { message: "Failed to create" };
  }

  revalidatePath("/");
  return await createUser.json();
}

export async function deletedNote(formData: FormData) {
  "use server";

  const userId = formData.get("userId") as string;

  // console.log("userId", userId);

  const deletedNote = await fetch(`${domain}/api/note/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: userId }),
  });

  if (!deletedNote.ok) {
    return { message: "Failed to delete" };
  }

  revalidatePath("/");

  console.log("deletedNote", deletedNote);
}

export async function edit(formData: FormData) {
  "use server";

  const _id = formData.get("_id");
  const user = formData.get("user");
  const note = formData.get("note");

  const rawData = {
    user: user,
    note: note,
  };

  console.log(rawData);

  const createUser = await fetch(`${domain}/api/note/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawData),
  });

  if (!createUser.ok) {
    return { message: "Failed to Edit" };
  }

  revalidatePath("/");
  return await createUser.json();
}

export async function deletedUser(formData: FormData) {
  "use server";

  const userId = formData.get("userId") as string;

  // console.log("userId", userId);

  const deletedNote = await fetch(`${domain}/api/user/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: userId }),
  });

  if (!deletedNote.ok) {
    return { message: "Failed to delete" };
  }

  // revalidatePath("/");

  console.log("deletedNote", deletedNote);
}

export async function editUser(formData: FormData) {
  "use server";

  const _id = formData.get("_id");
  // const user = formData.get('user')
  const name = formData.get("name");
  const asset = formData.get("asset");

  const rawData = {
    _id: _id,
    name: name,
    asset: asset,
  };

  console.log(rawData);

  const createUser = await fetch(`${domain}/api/user/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawData),
  });

  if (!createUser.ok) {
    return { message: "Failed to Edit" };
  }

  revalidatePath("/");
  return await createUser.json();
}
