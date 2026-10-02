## Hook
SAM: What is a [JWT|J W T|c], and is it safe to use?
BYTE: A [JWT|J W T|c] is a signed note that says who you are. It is very useful, but easy to misuse. Let us see both sides.

## Anatomy
BYTE: A [JWT|J W T|c] has three parts, separated by dots: the header, the payload, and the signature.
BYTE: The header names the algorithm. The payload holds claims, like the user, and when the token expires.
BYTE: The signature is a hash of the first two parts, made with a secret key.
BYTE: But look. The parts are only base sixty four encoded. Anyone can read the payload. It is signed, not secret.

## Flow
BYTE: Here is the flow. You log in, and the server signs a token and sends it back.
BYTE: Your app sends it with every request. The server recomputes the signature, and checks the expiry. No database lookup.
BYTE: Change one letter of the payload, say role admin, and the signature no longer matches. The token is rejected.

## Upsides
BYTE: That is the upside. The server stays stateless, and any service that has the key can verify the token.

## Downsides
SAM: So what is the catch?
BYTE: First, you cannot take a token back. After logout, it still works until it expires.
BYTE: Second, claims go stale. If the role changes, the old token still says the old role.
BYTE: Third, it is bigger than a session id, and travels with every request.
BYTE: Fourth, in local storage, one cross site scripting bug can steal it.

## Dont
BYTE: Now, what not to do.
BYTE: Never trust the algorithm in the header.
BYTE: An attacker sets [alg|alg|c] to [none|none|c], and a careless library skips the signature check.
BYTE: Pin the allowed algorithm on the server. That also stops key confusion, where a public key is misused as a secret.
BYTE: Never use a weak secret. Short words are cracked offline. Use at least thirty two random bytes.
BYTE: Never skip the checks: expiry, issuer, and audience. And never put secrets in the payload.

## Do
BYTE: Instead, keep access tokens short, five to fifteen minutes.
BYTE: Keep the refresh token in an [HttpOnly|HTTP only|c], Secure, SameSite cookie, and rotate it on every use.
BYTE: And if one server session is all you need, plain sessions are simpler. That is a fine choice.

## Wrap
SAM: So a [JWT|J W T|c] is a tool, not a default.
BYTE: Exactly. Signed, not secret. Short lived. Verified strictly.
