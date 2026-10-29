# YouTube publish pack: UiPath Agent Builder beginner guide (Build with Treesa)

Video: `uipath-agent-builder-guide.mp4` (11:46, 1080p). Everything below is drafted from the video's own script and
timing; check "Confirm before you publish" first.

## 1. Title

Recommended (56 characters, fits without truncation, matches thumbnail A):

> **UiPath Agent Builder Explained: How to Build an AI Agent**

Alternatives:

| Title | Chars | Use when |
| --- | --- | --- |
| UiPath Agent Builder for Beginners: Prompts, Tools, Context, Memory | 67 | you want the search keywords up front (may truncate on mobile) |
| How to Build an AI Agent in UiPath (Beginner Guide) | 51 | you want the plainest, most searchable wording |
| UiPath Agents: The 12-Step Checklist I Wish I'd Had | 51 | you want a curiosity hook (pairs with thumbnail B) |
| Not a Chatbot: Build Your First UiPath Agent | 44 | you want the contrast hook (pairs with thumbnail C) |

Avoid "Demo" or "Live demo": the screens are illustrations, not recordings of the product.

## 2. Thumbnails (1280x720 PNG, each under 0.5 MB)

| File | Look | Best for |
| --- | --- | --- |
| `thumbnail-A.png` | "HOW TO BUILD AN AI AGENT", Byte the robot, five building-block icons, "Beginner guide · 12 minutes" | **Default.** Matches the recommended title |
| `thumbnail-B.png` | "BUILD AN AGENT IN THIS ORDER" with the checklist as chips | A/B test: promises a takeaway, readable at phone size |
| `thumbnail-C.png` | Dark background, "Not a chatbot. An agent." with Reason + Act tiles | Feeds that are mostly light; the strongest curiosity hook |

If "Test & compare" is available in YouTube Studio, upload A, B and C as a test. They use only the video's own
characters, icons and palette (no UiPath logo, no product screenshots). Tweak or rebuild with
`node youtube/build-thumbnails.mjs`.

## 3. Description (paste as is)

```
New to UiPath Agent Builder? This beginner-friendly guide walks through the whole journey: what makes an agent (prompt, tools, context, memory, escalations), how Form View and Canvas View work, defining inputs and outputs, writing prompts, guardrails, model settings, and how to debug, evaluate and deploy.

CHAPTERS
0:00 Intro: simplifying the Agent Builder journey
0:37 What makes a UiPath agent
1:49 The Agent Builder workspace: Form View and Canvas View
2:37 Data Manager: inputs and outputs
3:30 Prompts: the agent's instructions
4:26 Tools: from reasoning to action
5:39 Context: giving the agent knowledge
6:24 Memory: learn from past experiences
7:31 Escalations: human in the loop
8:16 Guardrails: safe and responsible agents
8:58 Model settings
9:50 Debug, evaluate and deploy
10:47 The build checklist and wrap-up

THE CHECKLIST FROM THE VIDEO
1. Define the goal
2. Define your inputs and outputs
3. Write clear prompts
4. Configure the model
5. Add the right tools
6. Provide the right context
7. Use memory where it adds value
8. Define escalation paths
9. Add guardrails
10. Debug the execution
11. Evaluate the behaviour
12. Publish, observe and improve

WHAT YOU'LL LEARN
- The mental model: prompt = what to do, context = what to know, tools = how to act, memory = learning from experience, escalations = when to involve a human
- Form View and Canvas View are two views of the same agent definition
- Why clear inputs and outputs make an agent easy to plug into real automation
- How to write a system prompt that says when to use tools, context and escalation
- Why tool descriptions matter, and how Context Grounding, episodic memory and escalation memory work
- Guardrails: autonomy inside clearly defined boundaries
- Temperature, maximum tokens and maximum iterations
- Execution Trail, History and Evaluations: from "it worked once" to evidence it behaves consistently

LINKS
Agent Builder cheat sheet: [add link]
UiPath documentation: [add link]

ABOUT THIS VIDEO
- The screens are illustrations made for this explainer, not recordings of the product.
- The narration is a synthetic (AI text-to-speech) voice.
- Feature names and availability can change between releases. Check the current documentation.

If this helped, save the cheat sheet and share the video with someone starting out with UiPath agents. Subscribe to Build with Treesa for practical UiPath, automation, AI agent and agentic automation content.

#UiPath #AIagents #AgenticAutomation
```

Notes:
- Only the first two lines show before "Show more", so the opening sentence carries the keywords.
- Replace both `[add link]` placeholders: the video says the cheat sheet is available, so it must be linked.
- YouTube shows the first three hashtags above the title.

## 4. Tags

```
uipath agent builder,uipath agents,uipath,ai agent,ai agents,build ai agent,agentic automation,uipath tutorial,uipath for beginners,prompt engineering,context grounding,ai agent memory,human in the loop,ai guardrails,ai agent evaluation,rpa,automation,build with treesa
```

## 5. Pinned comment

```
Which part of building an agent is hardest for you: writing the prompt, choosing tools, or setting guardrails? Tell me below and I'll cover it in a follow-up.

The chapters and the checklist are in the description. Heads-up: the screens in this video are illustrations, so check the product itself for exact names and options.
```

## 6. Upload settings checklist

- **Captions:** upload `uipath-agent-builder-guide.en.srt` (Subtitles > Add language > English > Upload file > With timing). It is generated from the same measured word timing as the video, so it is in sync. "Treesa" is spelled correctly in the captions even though the voice says "Tree suh".
- **Thumbnail:** `thumbnail-A.png` (or run A/B/C as a test).
- **Chapters:** the first is at 0:00 and each is over 10 seconds, so YouTube will show them. Paste the CHAPTERS block as is.
- **Category:** Education (or Science & Technology). **Language:** English. **Audience:** not made for kids.
- **Altered or synthetic content question:** the narrator is a clearly synthetic voice over cartoon visuals, so "No" is the likely answer, but read the current wording in Studio.
- **Playlist:** create one such as "UiPath Agents" so follow-ups chain.
- **End screen:** the last scene (from about 10:47) holds the channel name, "Save the cheat sheet", "Share" and "Subscribe"; the final 20 seconds are good for end-screen elements. Place them on the right and bottom edges and check the preview.
- **Shorts to cut later (optional):** 6:24 to 7:31 (memory), 7:31 to 8:16 (escalations and the refund example), 8:16 to 8:58 (guardrails), 10:47 to the end (the 12-step checklist). Say the word and I will cut vertical 9:16 versions.

## 7. Social posts

LinkedIn:

```
Prompts, tools, context, memory, escalations, guardrails, evaluations. UiPath Agent Builder can feel like a lot at first.

I made a beginner-friendly walkthrough of the whole journey, in the order you'd actually build an agent: define the goal, define inputs and outputs, write clear prompts, configure the model, add tools, provide context, use memory, define escalations, add guardrails, then debug, evaluate and deploy.

A good agent isn't one that works once. It's one that behaves reliably across many real-world situations.

[video link]

#UiPath #AIagents #AgenticAutomation
```

Short post (X or community tab):

```
Not a chatbot. An agent. A beginner guide to building one in UiPath Agent Builder: prompts, tools, context, memory, escalations, guardrails and evaluations, in the order you'd build them. [video link]
```

## 8. Confirm before you publish

1. **Links.** Add the cheat sheet and documentation links to the description; the video promises the cheat sheet.
2. **Voice.** The narrator is a synthetic voice that says "welcome back to Build with Treesa". Make sure that is how you want to present it, and keep the disclosure line in the description.
3. **Facts.** Product behaviour (episodic and escalation memory, Memory Spaces, Context Grounding, the Execution Trail and History) is narrated exactly as your script states it and was not checked against UiPath's pages. Check it against the current documentation.
4. **Affiliation.** The video and thumbnails use text only, with no UiPath logo or screenshots. If you are not publishing on UiPath's behalf, consider adding: `This is an independent explainer and is not produced or endorsed by UiPath.`
5. **Length in thumbnail A.** It says "12 minutes"; the video is 11:46. Change it in `build-thumbnails.mjs` if you want it exact.
