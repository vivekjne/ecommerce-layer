// Verifies every JWT fact the video shows, using only node:crypto (no JWT library).
import crypto from "node:crypto";
const b64u = (b) => Buffer.from(b).toString("base64url");
const unb64u = (s) => Buffer.from(s, "base64url").toString();
const hmac = (data, key) => crypto.createHmac("sha256", key).update(data).digest("base64url");
const out = [];
const log = (k, v) => { out.push(`${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`); };

const secret = crypto.createHash("sha256").update("jwt-demo-key-for-video").digest(); // fixed demo key so the token on screen is reproducible
const sign = (payload, key = secret, header = { alg: "HS256", typ: "JWT" }) => {
  const h = b64u(JSON.stringify(header)), p = b64u(JSON.stringify(payload));
  return `${h}.${p}.${hmac(`${h}.${p}`, key)}`;
};
const now = 1_700_000_000;
const payload = { sub: "user_42", role: "user", iss: "https://auth.example.com", aud: "shop-api", iat: now, exp: now + 900 };
const token = sign(payload);
const [h, p, s] = token.split(".");
log("1 parts", token.split(".").length);
log("1 header decoded", unb64u(h));
log("1 payload decoded", unb64u(p));
log("1 signature bytes", Buffer.from(s, "base64url").length);
log("1 has padding '='", token.includes("="));
// 2. signature = HMAC-SHA256(header.payload, secret)
log("2 recomputed signature matches", hmac(`${h}.${p}`, secret) === s);
// 3. tampering: change role -> signature check fails
const evilP = b64u(JSON.stringify({ ...payload, role: "admin" }));
log("3 tampered payload verifies", hmac(`${h}.${evilP}`, secret) === s);
log("3 recomputed signature for tampered payload", hmac(`${h}.${evilP}`, secret));
log("3 tampered payload part", evilP);
// naive vs strict verifier
function verify(tok, { key, algs, aud, iss, at }) {
  const [hh, pp, ss] = tok.split(".");
  const header = JSON.parse(unb64u(hh));
  if (!algs.includes(header.alg)) return { ok: false, why: `alg ${header.alg} not allowed` };
  if (header.alg === "HS256" && hmac(`${hh}.${pp}`, key) !== ss) return { ok: false, why: "bad signature" };
  const c = JSON.parse(unb64u(pp));
  if (c.exp !== undefined && at >= c.exp) return { ok: false, why: "expired" };
  if (aud && c.aud !== aud) return { ok: false, why: "wrong audience" };
  if (iss && c.iss !== iss) return { ok: false, why: "wrong issuer" };
  return { ok: true, claims: c };
}
log("4 valid token", verify(token, { key: secret, algs: ["HS256"], aud: "shop-api", iss: payload.iss, at: now + 10 }));
log("4 after exp", verify(token, { key: secret, algs: ["HS256"], at: now + 901 }));
log("4 wrong issuer", verify(token, { key: secret, algs: ["HS256"], iss: "https://evil.example.com", at: now + 10 }));
log("4 wrong audience", verify(token, { key: secret, algs: ["HS256"], aud: "billing-api", at: now + 10 }));
// 5. alg none: a naive verifier that trusts the header's alg accepts an unsigned token
const noneTok = `${b64u(JSON.stringify({ alg: "none", typ: "JWT" }))}.${b64u(JSON.stringify({ ...payload, role: "admin" }))}.`;
const naive = (tok) => { const [hh, pp, ss] = tok.split("."); const hd = JSON.parse(unb64u(hh)); if (hd.alg === "none") return { ok: true, claims: JSON.parse(unb64u(pp)) }; return { ok: hmac(`${hh}.${pp}`, secret) === ss }; };
log("5 naive accepts alg none", naive(noneTok));
log("5 pinned verifier on alg none", verify(noneTok, { key: secret, algs: ["HS256"], at: now + 10 }));
// 6. algorithm confusion RS256 -> HS256 with the public key as HMAC secret
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const pubPem = publicKey.export({ type: "spki", format: "pem" });
const rsTok = (() => { const hh = b64u(JSON.stringify({ alg: "RS256", typ: "JWT" })), pp = b64u(JSON.stringify(payload)); const sg = crypto.sign("sha256", Buffer.from(`${hh}.${pp}`), privateKey).toString("base64url"); return `${hh}.${pp}.${sg}`; })();
const rsOk = (() => { const [hh, pp, sg] = rsTok.split("."); return crypto.verify("sha256", Buffer.from(`${hh}.${pp}`), publicKey, Buffer.from(sg, "base64url")); })();
log("6 real RS256 token verifies with public key", rsOk);
const forgedHH = b64u(JSON.stringify({ alg: "HS256", typ: "JWT" })), forgedPP = b64u(JSON.stringify({ ...payload, role: "admin" }));
const forged = `${forgedHH}.${forgedPP}.${hmac(`${forgedHH}.${forgedPP}`, pubPem)}`;
const confusedVerifier = (tok) => { const [hh, pp, sg] = tok.split("."); const hd = JSON.parse(unb64u(hh)); if (hd.alg === "HS256") return hmac(`${hh}.${pp}`, pubPem) === sg; return crypto.verify("sha256", Buffer.from(`${hh}.${pp}`), publicKey, Buffer.from(sg, "base64url")); };
log("6 confused verifier accepts forged admin token", confusedVerifier(forged));
const pinnedRS = (tok) => { const hd = JSON.parse(unb64u(tok.split(".")[0])); if (hd.alg !== "RS256") return "rejected: alg " + hd.alg; return "checked as RS256"; };
log("6 pinned RS256 verifier on forged token", pinnedRS(forged));
// 7. weak secret: a dictionary finds it offline
const weak = sign(payload, "secret");
const words = ["password", "123456", "admin", "letmein", "secret", "qwerty"];
const [wh, wp, ws] = weak.split(".");
log("7 dictionary finds weak secret", words.find((w) => hmac(`${wh}.${wp}`, w) === ws));
// 8. size: session id vs JWT with a few more claims
const bigClaims = { ...payload, name: "Ada Lovelace", email: "ada@example.com", roles: ["user", "editor", "billing"], permissions: Array.from({ length: 12 }, (_, i) => `resource:${i}:read`) };
log("8 session id length (bytes)", crypto.randomBytes(24).toString("base64url").length);
log("8 basic JWT length", token.length);
log("8 JWT with more claims length", sign(bigClaims).length);
// 9. logout does not invalidate a stateless token
const stateless = (tok, at) => verify(tok, { key: secret, algs: ["HS256"], at }).ok;
log("9 valid right after 'logout' (no server state)", stateless(token, now + 60));
log("9 role change in DB not seen until exp", unb64u(p).includes('"role":"user"'));
// 10. payload readable by anyone
log("10 payload readable without key", JSON.parse(unb64u(p)).sub);
console.log(out.join("\n"));
import fs from "node:fs"; fs.writeFileSync("verified.txt", out.join("\n") + "\n");
fs.writeFileSync("sample.json", JSON.stringify({ token, h, p, s, payload }, null, 1));
