export let domain =
  process.env.NEXT_ENV === "production"
    ? "https://notesecure.vercel.app"
    : "https://notesecure.vercel.app";
