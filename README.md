This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Background Removal API

A server-side endpoint `POST /api/remove-background` has been added using `@tensorflow-models/deeplab` (PASCAL model) and `sharp`.

### Request

Multipart/form-data with a single file field named `image`.

### Response

JSON containing:

```
{
	filename: string,
	mime: 'image/png',
	data: 'data:image/png;base64,<...>'
}
```

### Example (browser)

```js
async function removeBg(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch("/api/remove-background", {
    method: "POST",
    body: fd,
  });
  if (!res.ok) throw new Error("Failed background removal");
  const json = await res.json();
  // Create an <img>
  const img = document.createElement("img");
  img.src = json.data; // data URL
  document.body.appendChild(img);
  return json;
}
```

### Example (Node script)

```js
import fs from "node:fs";
import fetch from "node-fetch";
import FormData from "form-data";

async function run() {
  const form = new FormData();
  form.append("image", fs.createReadStream("input.jpg"));
  const res = await fetch("http://localhost:3000/api/remove-background", {
    method: "POST",
    body: form,
  });
  const json = await res.json();
  const base64 = json.data.split(",")[1];
  fs.writeFileSync("output.png", Buffer.from(base64, "base64"));
}
run();
```

### Notes

- Model base is `pascal`; currently only the person class (id 15) is treated as foreground.
- Adjust `foregroundClassIds` in `app/api/remove-background/route.ts` to include other classes.
- For large images you may wish to resize before segmentation to improve speed.
- Endpoint returns a data URL for simplicity; if you need a binary PNG response we can switch to streaming with a small type workaround.
