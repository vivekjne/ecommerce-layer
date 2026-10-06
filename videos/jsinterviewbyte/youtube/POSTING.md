# YouTube posting kit — JS InterviewByte

Files: `../jwt-explainer/out/jwt-explained.mp4` + `thumb-jwt.png`,
`../landscape-1/out/jsinterviewbyte-ep1-landscape.mp4` + `thumb-ep1.png` (1280×720, under 2 MB).

---------------------------------------------------------------------------
## Video 1 — JWT

**Title** (pick one, ≤ 100 chars)
- JWT Explained: How It Works, Why It's Popular, and the Mistakes That Get You Hacked
- JWT in 4 Minutes — Signed, Not Secret (Plus 4 Mistakes to Avoid)

**Description**
```
What is a JWT, and is it actually safe? We decode a real token, watch the signature get checked,
try to tamper with it, and then go through the downsides and the mistakes that cause real breaches.

Every example in this video was run and verified in code.

⏱ Chapters
0:00 What is a JWT?
0:18 The three parts
0:32 Reading the token (signed, not secret)
1:06 The signature
1:23 How it is used in a login
1:46 Trying to cheat
2:04 The upsides
2:14 The downsides
2:55 Mistakes to avoid (alg none, key confusion, weak secrets, skipped checks)
3:48 What to do instead
4:14 Recap

📚 References
RFC 7519 – JSON Web Token: https://www.rfc-editor.org/rfc/rfc7519
RFC 8725 – JWT Best Current Practices: https://www.rfc-editor.org/rfc/rfc8725
OWASP Session Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
RFC 9700 – OAuth 2.0 Security Best Current Practice: https://www.rfc-editor.org/rfc/rfc9700

#jwt #websecurity #javascript
```

**Tags**: jwt, json web token, jwt explained, jwt authentication, jwt vs session, jwt security,
alg none, refresh token, httponly cookie, web security, javascript interview, backend interview

---------------------------------------------------------------------------
## Video 2 — Episode 1: 4 JavaScript interview questions

**Title**
- 4 JavaScript Interview Questions, Explained with Animations (Higher-Order Functions, Currying, Events, Memoization)
- JavaScript Interview Prep: HOFs, Currying, Event Bubbling & Memoization — Visually Explained

**Description**
```
Four classic JavaScript interview questions, each explained step by step with animated diagrams.
Every code output on screen was run and verified.

⏱ Chapters
0:00 Intro
0:21 What is a higher-order function?
1:46 What is currying?
3:04 How do events travel? (capturing, bubbling, delegation)
4:41 What is memoization?

Questions adapted from the open-source list github.com/sudheerj/javascript-interview-questions,
re-explained and re-verified.

#javascript #codinginterview #webdevelopment
```

**Tags**: javascript interview questions, higher order functions, currying javascript, event bubbling,
event capturing, event delegation, memoization, closures, frontend interview, javascript tutorial

---------------------------------------------------------------------------
## Video 3: Browser storage

**Title:** Browser Storage Explained: localStorage vs sessionStorage vs Cookies vs IndexedDB

Alternatives:
- localStorage, Cookies or IndexedDB? Where Your Web App Should Store Data
- Why localStorage Returns "42" Instead of 42 (Browser Storage Explained)

**Description:**
```
Where should a web app store data? Browser storage explained with animations: localStorage, sessionStorage, cookies, IndexedDB and the Cache API, and when to use each one. Every behaviour shown was tested in Chrome.

You'll learn:
• Why localStorage only stores strings (42 comes back as "42", objects as "[object Object]"), and the JSON fix
• How tabs stay in sync with the storage event
• Why sessionStorage survives a reload but not a new tab
• How cookies travel with every request, and what HttpOnly, Secure and SameSite do
• Why a 5,000-character cookie gets silently dropped
• How IndexedDB stores real objects (Dates, arrays, Blobs) without freezing the page
• How the Cache API and a service worker make an app open offline
• The rules for all of them: origins, eviction, and why tokens don't belong in localStorage

Chapters
0:00 Why the page forgot dark mode
0:14 localStorage
1:09 sessionStorage
1:31 Cookies
2:24 IndexedDB
3:10 Cache API
3:27 Rules for all storage
3:57 Which one should you pick?

Cheat sheet
Login session → HttpOnly cookie
Theme, language → localStorage
Form draft for one tab → sessionStorage
Big or offline data → IndexedDB
Offline pages → Cache API

#javascript #webdevelopment #frontend
```

**Tags:** browser storage, localStorage, sessionStorage, cookies, IndexedDB, Cache API, web storage, localStorage vs sessionStorage, localStorage vs cookies, HttpOnly cookie, service worker, offline web app, javascript interview questions, frontend interview, web development, JS InterviewByte

**Thumbnail:** `thumb-storage.png` · **Subtitles:** `browser-storage.en.srt` (English)

## Upload checklist (YouTube Studio)
1. studio.youtube.com → **Create → Upload videos** → pick the MP4.
2. Paste title + description. Chapters appear automatically (first must be 0:00, at least 3, each ≥ 10 s — both lists meet this).
3. **Thumbnail → Upload file** (needs a phone-verified channel for custom thumbnails).
4. **Audience**: "No, it's not made for kids".
5. **Show more**: add tags; Category **Education**; Language **English**; Caption certification: none.
6. **Altered or synthetic content**: the voice is AI-generated (text-to-speech). YouTube asks you to
   disclose realistic synthetic content; a clearly cartoon explainer with a TTS narrator is generally
   not "realistic", but ticking **Yes** is the safe choice.
7. **Video elements**: add an end screen (subscribe + the other video) and cards if you like.
8. **Visibility**: Unlisted first, watch it once through on YouTube, then Public or Schedule.
9. Create a playlist "JS InterviewByte" and add both.
