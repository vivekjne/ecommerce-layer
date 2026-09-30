# YouTube publish pack: UiPath Delegate explainer

Video: `uipath-delegate-explainer.mp4` (9:51, 1080p). Everything below is drafted from the video's own
script; check the items under "Confirm before you publish" first.

## 1. Title

Recommended (52 characters, fits without truncation, matches thumbnail A):

> **UiPath Delegate Explained: Hire Your First AI-Intern**

Alternatives:

| Title | Chars | Use when |
| --- | --- | --- |
| UiPath Delegate in 10 Minutes: What It Does and How It Works | 60 | you want search-style clarity and the length up front |
| What Is UiPath Delegate? An AI Sidekick for Your Busywork | 57 | the audience is new to the product |
| UiPath Delegate: Delegate the Busywork, Keep the Judgment | 57 | you want the tagline (pairs with thumbnail C) |
| How UiPath Delegate Works (and How You Stay in Control) | 55 | you want to lead with governance and trust |

Avoid "Demo" or "Live demo" in the title or thumbnail: the screens in the video are illustrations,
not recordings of the product, and viewers who expect a demo will drop off.

## 2. Thumbnails (1280x720 PNG, each under 0.5 MB)

| File | Look | Best for |
| --- | --- | --- |
| `thumbnail-A.png` | "HIRE YOUR FIRST AI-INTERN", Delegate the intern, four ways-to-start icons, "Explained in 10 minutes" | **Default.** Matches the recommended title and the script's title card |
| `thumbnail-B.png` | Before/after split: "BUSYWORK" (stressed Sam, 99+ inbox, calendar clash) vs "DONE" (Delegate, ticked list) | A/B test against A: tells a story with no reading needed |
| `thumbnail-C.png` | Dark background, "Delegate the busywork. Keep the judgment." | Feeds that are mostly light; stands out on white pages |

If "Test & compare" is available for your channel in YouTube Studio, upload A, B and C as a test
and let it pick a winner. Each thumbnail has 3 words or fewer as its main message and reads at
phone size. They use only the video's own characters, icons and palette (no UiPath logo, no
invented screens). Rebuild or tweak with `node youtube/build-thumbnails.mjs`.

## 3. Description (paste as is; replace nothing unless you want to)

```
UiPath Delegate is an AI agent that works across your browser and applications: you ask in plain language, it plans, it acts where you can see it, and it stops for your approval when it should. This 10-minute animated explainer covers what it does, how it works, and how you keep control.

CHAPTERS
0:00 The Monday busywork problem
0:42 What UiPath Delegate is
1:42 How it works: ask, plan, act, stop
2:57 Tasks that cross applications
3:48 A support engineer's day
4:16 Teach it by showing it
5:07 From raw data to a finished deliverable
5:54 Real screens inside the chat (MCP Apps)
6:39 Save and reuse work with Routines
7:25 Approval modes
8:13 Allow and deny lists, audit trail, governance
8:56 Recap and next steps

WHAT YOU'LL LEARN
- The four-step loop: you ask, Delegate plans, it acts and shows you, and it stops when it should
- Four ways to start: type a prompt, speak a command, record your screen, or start from a template
- How to teach Delegate by showing it, and save what works as Routines you can run on demand, schedule, and share with your team
- How it turns raw data into presentations, proposals and reports
- How it shows a connected system's real screens (lists, forms, tables, dashboards) inside the conversation (MCP Apps)
- Approval modes: Cautious, Adaptive (with a Smart approvals toggle) and Full access
- Governance: allow and deny lists, audit trail, and the UiPath platform controls it inherits (Orchestrator, credential vault, AI Trust Layer, role-based access)

LINKS
Product page: https://www.uipath.com/product/delegate
Getting started: https://docs.uipath.com/delegate/standalone/latest/user-guide/getting-started-with-delegate
Delegate overview (docs): https://docs.uipath.com/delegate/standalone/latest/user-guide/delegate-overview

ABOUT THIS VIDEO
- The screens are illustrations made for this explainer, not recordings of the product.
- The narration is a synthetic (AI text-to-speech) voice.
- Feature names and availability can change between releases. Check the current documentation.

#UiPath #AIagents #Automation
```

Notes:
- Only the first two lines show before "Show more", so the opening sentence carries the keywords.
- YouTube shows the first three hashtags above the title.
- Add your channel's own disclaimer line if you are not part of UiPath (see the checklist).

## 4. Tags

Tags matter little for ranking now; one line is enough (223 of 500 characters):

```
uipath delegate,uipath,ai agent,ai agents,computer use,agentic automation,ai automation,rpa,workflow automation,ai assistant,enterprise ai,mcp apps,ai governance,human in the loop,ai productivity,automate busywork,ai intern
```

## 5. Pinned comment

```
Which task on your Monday list would you hand to an AI-intern first? Tell me below.

Chapters and the docs links are in the description. Heads-up: the screens in this video are illustrations, so check the product itself for exact names and options.
```

## 6. Upload settings checklist

- **Captions:** upload `uipath-delegate-explainer.en.srt` (Subtitles > Add language > English > Upload file > With timing). It is generated from the same timing as the voice, so it is in sync.
- **Thumbnail:** `thumbnail-A.png` (or run A/B/C as a test).
- **Category:** Science & Technology (or Education). **Language:** English. **Audience:** not made for kids.
- **Altered or synthetic content question:** the narrator is a clearly synthetic voice over cartoon visuals, so "No" is the likely answer, but read the current wording in Studio, since the question targets realistic content that could be mistaken for real.
- **Playlist:** create one for the product (for example "UiPath Delegate") so follow-up videos chain.
- **End screen:** the end slide with the links is on screen for the final 13 seconds (from about 9:38); place end-screen elements on the right and bottom edges and check the preview so they don't cover the link chips.
- **Shorts to cut later (optional):** 0:00 to 0:42 (the Monday problem and the title), 5:07 to 5:54 (data to deliverable), 7:25 to 8:13 (approval modes). Say the word and I will cut vertical 9:16 versions.

## 7. Social posts

LinkedIn:

```
Your first AI-intern doesn't need a job description. It needs a task, and a boss who stays in charge.

I made a 10-minute animated walkthrough of UiPath Delegate: what it does, how the ask, plan, act, stop loop works, how you teach it by showing it, and how approval modes, audit trails and platform governance keep you in control.

Delegate the busywork. Keep the judgment.

[video link]

#UiPath #AIagents #Automation
```

Short post (X or community tab):

```
Delegate the busywork. Keep the judgment. A 10-minute animated tour of UiPath Delegate: what it does, how it works, and how you stay in control. [video link]
```

## 8. Confirm before you publish

1. **Links.** The docs and product links come from your request and the script; I could not open them from the build environment. Click each one once.
2. **Approval-mode names.** The video uses the script's names (Cautious, Adaptive, Full access). Your script's editor note said the older deck used Always ask, Smart and Unrestricted; confirm which set is current.
3. **Script-only claims.** MCP Apps, saving/scheduling/sharing routines, Smart approvals, and "no new IT approval or upgrade process" are narrated as the script states them and were not checked against the product.
4. **Rights and affiliation.** The 20 icons on the dark tiles are images from the "UiPath Delegate - Premium" deck. If you are not publishing on UiPath's behalf, confirm you may use them, and add an "unofficial" line to the description, for example: `This is an independent explainer and is not produced or endorsed by UiPath.`
5. **"Linked below".** The narration says the guide and product page are linked below, so keep the LINKS block in the description.
