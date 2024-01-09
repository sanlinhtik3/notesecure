export let domain =
  process.env.NEXT_ENV === "production"
    ? "https://notesecure.vercel.app"
    : "http://localhost:3000";
