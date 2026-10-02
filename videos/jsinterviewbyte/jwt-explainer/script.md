## Hook
SAM: What is a [JWT|J W T|c]? And is it safe to use?
BYTE: A [JWT|J W T|c] is a signed note from the server. It says: this is user forty two. (after 0.6)
BYTE: It is very useful, but also easy to misuse. So let us look at both sides. (after 0.5)

## Three parts
BYTE: Here is a real token. It looks random, but it has two dots. (after 0.5)
BYTE: The dots split it into three parts. The header. (after 0.3)
BYTE: The payload. (after 0.3)
BYTE: And the signature. (after 0.8)

## Reading it
BYTE: The header and payload are just JSON, encoded as base sixty four. (after 0.4)
BYTE: The header says which algorithm signed it: [HS256|H S two fifty six|c]. (after 0.8)
BYTE: The payload holds the claims. [sub|sub|c] is the user. [role|role|c] is what they may do. (after 0.6)
BYTE: And [exp|exp|c] is when the token expires: fifteen minutes after it was issued. (after 0.8)
SAM: Did you need a key to read all that?
BYTE: No. Anyone with the token can read it. A [JWT|J W T|c] is signed, not secret. (after 1.0)

## The signature
SAM: Then what stops me from changing it?
BYTE: The signature. The server feeds the header, the payload, and its secret key into [HMAC|H MAC|c]. (after 0.6)
BYTE: Out comes the signature. Only someone with the key can make one that matches. (after 0.8)

## The flow
BYTE: Now, a real login. Your app sends your email and password. (after 0.5)
BYTE: The server checks them, signs a token, and sends it back. (after 0.5)
BYTE: Your app sends that token with every request, in the Authorization header. (after 0.5)
BYTE: The server recomputes the signature, and checks the expiry. No database lookup needed. (after 0.8)

## Tampering
BYTE: Let us try to cheat. We change the role from user to admin. (after 0.6)
BYTE: The server recomputes the signature from the edited payload. It does not match. (after 0.6)
BYTE: So the token is rejected. Without the key, you cannot forge a signature. (after 0.8)

## Upsides
SAM: So why is it so popular?
BYTE: The server stays stateless, and any service with the key can check the token by itself. (after 1.0)

## Downsides
SAM: And what is the catch?
BYTE: Catch one: you cannot take a token back. (after 0.3)
BYTE: A user logs out at ten. But a copied token still works until it expires, at ten fifteen. (after 0.8)
BYTE: Catch two: claims go stale. (after 0.3)
BYTE: The role changes to editor in the database, but the token still says user. (after 0.8)
BYTE: Catch three: size. A session id is thirty two characters. Our token is two hundred thirty five, and it grows with every claim. (after 0.8)
BYTE: Catch four: in local storage, one cross site scripting bug lets a script steal the token. (after 1.0)

## Mistakes
BYTE: Now, the mistakes to avoid. (after 0.3)
BYTE: One: trusting the algorithm in the header. An attacker sets [alg|alg|c] to [none|none|c], meaning no signature. (after 0.5)
BYTE: A careless verifier skips the check, and accepts a fake admin token. (after 0.6)
BYTE: The fix: pin the algorithm on the server, and reject anything else. (after 0.8)
BYTE: Pinning also stops key confusion, where a public key is misused as the secret. (after 1.6)
BYTE: Two: a weak secret. With one token, an attacker guesses offline. (after 0.4)
BYTE: Our test secret fell on the fifth guess. Use at least thirty two random bytes. (after 0.8)
BYTE: Three: skipping checks. Always check expiry, issuer, and audience. (after 0.8)
BYTE: Four: secrets in the payload. Remember, anyone can read it. (after 0.8)

## Do instead
SAM: So what should I do instead?
BYTE: Keep access tokens short: five to fifteen minutes. (after 0.5)
BYTE: Keep the refresh token in an [HttpOnly|HTTP only|c] cookie, so scripts cannot read it. (after 0.5)
BYTE: Rotate it on every use. If an old one comes back, it was stolen. (after 0.8)
BYTE: And for a single server, a classic session is simpler, and easy to revoke. (after 0.8)

## Wrap
SAM: So a [JWT|J W T|c] is a tool, not a default.
BYTE: Exactly. Signed, not secret. Short lived. Verified strictly. (after 1.0)
