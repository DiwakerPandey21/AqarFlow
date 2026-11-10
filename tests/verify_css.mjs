async function check() {
  const res = await fetch("http://localhost:3000");
  const html = await res.text();
  const match = html.match(/href="(\/_next\/static\/css\/[^"]+)"/);
  if (!match) {
    console.log("No CSS stylesheet link found in HTML.");
    return;
  }
  const cssUrl = "http://localhost:3000" + match[1];
  console.log("Fetching CSS from:", cssUrl);
  const cssRes = await fetch(cssUrl);
  const css = await cssRes.text();
  console.log("CSS Length:", css.length, "bytes");
  console.log("Contains 'bg-white':", css.includes("bg-white"));
  console.log("Contains 'text-slate-900':", css.includes("text-slate-900"));
  console.log("Contains 'grid':", css.includes("grid"));
  console.log("Contains 'rounded-2xl':", css.includes("rounded-2xl"));
  console.log("Contains 'flex':", css.includes("flex"));
}

check().catch(console.error);
