const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function uploadImage(pic: File) {
  const form = new FormData();
  form.append("img", pic, pic.name);

  const res = await fetch(`${API_BASE}/upload/`, {
    method: "POST",
    body: form,
    headers: { Accept: "application/json" },
  });

  if (!res.ok) throw new Error(`Server returned ${res.status}`);
  return await res.blob();
}
