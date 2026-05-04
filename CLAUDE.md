# Project Name: The Green Tape Measure website

# Project Overview: The Green Tape Measure is an advocacy organization for interior designers. The website will serve as the central hub for all of the company's current and past research, lobbying efforts, and campaigns. The website will be designed as a single-page website.

## Tech Stack
- HTML5 (Semantic)
- Tailwind CSS
- Vanilla JavaScript (ES6+)

## Tailwind / CSS Constraints
- **Design Tokens:** Use ONLY variables defined in `css/tokens.css`. ASK me before creating a new variable.
- **Usage:** Use Tailwind classes throughout, in CSS with @apply for commonly used class names (i.e. card, btn) or directly in HTML for non-repeating elements. 
- **Layout:** Prefer Flexbox/Grid.
- **States:** Always include hover and focus states for interactive elements.

## HTML Standards
- Use Semantic HTML.
- If a Figma layer name matches a standard HTML tag, use that tag directly in the JSX/HTML. Otherwise, follow the instructions below.
- Figma layer names that have "Section" in it, are to use section tags with ID matching the remainder of the Figma layer name.
- Figma layer names that have "Stack" in the name are to use DIV tags.
- Figma layer names "Card" are to be DIVs with the "card" class.
- If a Figma layer name starts with "svg", this will be an SVG element that includes a USE element with an href with the following path: "/assets/sprites/solid.svg#name" -> Replace "name" with the rest of the Figma layer name after "svg-".

## Standards and Regulations
- Follow WCAG standards for accessibility throughout.
- Ask before adding something that may spark Cookie Banner requirements under law, including international / EU. We want to avoid the banner entirely.

## Commands
- Dev Server: `npx live-server`
- Linting: `npx stylelint "**/*.css"`
