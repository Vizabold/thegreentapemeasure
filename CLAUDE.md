# Project Name: The Green Tape Measure website

# Project Overview: The Green Tape Measure is an advocacy organization for interior designers. The website will serve as the central hub for all of the company's current and past research, lobbying efforts, and campaigns. The website will be designed as a single-page website.

## Tech Stack
- HTML5 (Semantic)
- Tailwind CSS
- Vanilla JavaScript (ES6+)

## Frontend Constraints
- **Design Tokens:** Use ONLY variables defined in `css/tokens.css`. If a token doesn't have a clear base variable match, ASK me before creating a new one.
- **Mapping:** Do NOT create new CSS variables for semantic tokens. 
- **Usage:** Map semantic Figma token names directly to their base variable counterparts in the component's CSS.
- **Example:** If a Figma color token is `about/background`, the CSS color for the background-color of the about section should reference the corresponding CSS variable, in this example --neutral-four

## Coding Standards
- Figma layer names that have "Section" in it, are to use HTML section tags with ID matching the remainder of the Figma layer name.
- If a Figma layer name matches a standard HTML tag, use that tag directly in the JSX/HTML.
- If a Figma layer name has "Stack" in it or is named "Card", interpret it as a Flexbox container.
- If a Figma layer name starts with "svg", this will be an svg html element that includes a "use" element with an href with the following path: "/assets/sprites/solid.svg#name" -> Replace "name" with the rest of the Figma layer name after "svg-". For svg's in the footer element, the file path will use the brands.svg file, not the solid.svg file.
- Prefer Flexbox/Grid for layouts. Use the Figma file variables and design tokens as a guide for what additional Tailwind classes should be applied to each element.
- Always include hover and focus states for interactive elements.
- Follow WCAG standards for accessibility throughout.
- Ask before adding something that may spark Cookie Banner requirements under EU law. We want to avoid the banner entirely.

## Commands
- Dev Server: `npx live-server`
- Linting: `npx stylelint "**/*.css"`
