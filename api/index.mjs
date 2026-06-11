// Vercel Node serverless function: forwards requests to the TanStack Start
// SSR handler produced by `vite build` at dist/server/server.js.
import handler from "../dist/server/server.js";

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

function requestUrl(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  return `${Array.isArray(proto) ? proto[0] : proto}://${Array.isArray(host) ? host[0] : host}${req.url || "/"}`;
}

export default async function vercelHandler(req, res) {
  try {
    const body = req.method === "GET" || req.method === "HEAD" ? undefined : await readBody(req);
    const response = await handler.fetch(
      new Request(requestUrl(req), {
        method: req.method || "GET",
        headers: req.headers,
        body,
      }),
      {},
      {},
    );

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));

    if (response.body) {
      const buffer = Buffer.from(await response.arrayBuffer());
      res.end(buffer);
    } else {
      res.end();
    }
  } catch (error) {
    console.error("Vercel SSR handler error:", error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}
