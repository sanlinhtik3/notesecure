This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/
#### STEP 1: 
Download, extract and open folder in VS code.

#### STEP 2:
Create .env.local file and copy and paste the following code.

```bash
MONGODB_URI=mongodb+srv://apple:apple@cluster0.de4nqgi.mongodb.net/savepassword?retryWrites=true&w=majority
```



```bash
CLERK_SECRET_KEY=sk_test_8w8m7dh87jDlfdIZNv1rdo1A2vW8u5jZgdh4BhrGGT
```

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c291Z2h0LXVyY2hpbi02MC5jbGVyay5hY2NvdW50cy5kZXYk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

NEXT_ENV="development"

#### STEP 2: 
Edit pub-domain.ts file into code below.

```bash
export let domain =
  process.env.NEXT_ENV !== "production"
    ? "http://localhost:3000"
    : "https://notesecure.vercel.app;
```

#### STEP 3: 
Open terminal in vs code and run `npm install` and wait for a while.

#### STEP 4: 
After that, `run npm run` dev.


#### STEP 5: 
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.