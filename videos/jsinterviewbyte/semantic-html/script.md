## Hook
SAM: My page looks perfect. So why do people say it is not accessible?
BYTE: Because a screen reader does not see your page. It reads the structure underneath. (after 0.6)
BYTE: And underneath this page, everything is a [div|div|c]. (after 1.4)

## The tree
BYTE: The browser builds an accessibility tree. Every element gets a role, and a name. (after 0.6)
BYTE: With only divs, every role is generic. Even the big title is just text, not a heading. (after 1.2)
BYTE: So a screen reader user cannot jump anywhere. They have to listen to everything, line by line. (after 1.0)

## Landmarks
BYTE: Semantic elements fix this. Swap the divs for [header|header|c], [nav|nav|c], [main|main|c], [aside|aside|c], and [footer|footer|c]. (after 0.6)
BYTE: Each one becomes a landmark. The header is the banner. Nav is navigation. Main is the main content. (after 0.8)
BYTE: Aside is complementary content. And the footer is content info. (after 0.8)
BYTE: The newer [search|search|c] element adds a search landmark too. (after 1.4)

## Jumping
BYTE: Now a screen reader can list every landmark, and jump straight to one. (after 1.0)
BYTE: In [NVDA|N V D A], the D key moves to the next landmark. In JAWS, it is the R key. (after 0.8)
BYTE: Add a skip link at the top, and keyboard users can jump past the menu too. (after 1.0)

## Gotchas
SAM: So every header becomes a banner?
BYTE: No. Only the page level one. A header inside an [article|article|c] is just that article's header. (after 0.8)
BYTE: And a [section|section|c] only becomes a region landmark when it has a name, like a heading linked with [aria-labelledby|aria labelled by|c]. (after 0.8)
BYTE: Also, use just one [main|main|c] per page. (after 1.0)

## Headings
BYTE: Landmarks are the rooms. Headings are the signs inside them. (after 0.4)
BYTE: WebAIM surveys screen reader users. In twenty twenty four, they asked: how do you find things on a long page? (after 0.4)
BYTE: Almost seventy two percent said: by jumping through the headings. (after 1.2)
BYTE: So use one [h1|h one|c], and do not skip levels. Choose the level by structure, never by font size. (after 1.0)

## Lists and labels
BYTE: Other elements carry meaning too. A real list tells the user how many items it has. (after 0.6)
BYTE: And a [label|label|c] gives an input its name. Without one, the field is announced with no name at all. (after 1.0)

## Buttons
SAM: What about buttons? A div with a click handler works fine for me.
BYTE: With a mouse, yes. But press Tab, and the div is skipped. It has no role either. (after 0.8)
BYTE: Add [role|role|c] button and [tabindex|tab index|c], and now it gets focus. (after 0.5)
BYTE: But Enter and Space still do nothing. We tested it. (after 1.0)
BYTE: A real [button|button|c] gets focus, both keys, and the right role, for free. (after 0.6)
BYTE: That is the first rule of [ARIA|ah ree ah|c]: use the native element whenever one exists. (after 1.0)

## Wrap
SAM: So semantic HTML is not extra work.
BYTE: Exactly. Same page, same design. But now everyone can find their way around it. (after 1.0)
