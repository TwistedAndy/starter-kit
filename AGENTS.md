# CSS_BOX instructions

The directory containing this `AGENTS.md` is the project root. All paths in this document are relative to that directory.

## Core rules

Treat these as mandatory:

1. **Reuse first.** Start from the closest existing section, its markup, variables, and modifiers. A different color, spacing, image, text, alignment, or item count is not a reason to create another section.
2. **Prefer meaningful modifiers.** Adapt an existing block with `is_*`, `box_*`, `.items_*`, `.item_*`, `.button_*`, and block-scoped CSS variables, but add a modifier only when it changes defined behavior, layout, appearance, or state. Do not add semantic-only modifiers such as `items_services` when plain `.items` behaves the same.
3. **Create a block only for a substantial difference.** A new `_box` is justified only by a different responsibility, DOM structure, interaction model, or layout relationship that would make the existing block misleading or full of exceptions.
4. **Use one block per element.** An HTML element may contain at most one class ending in `_box`. Never write `class="media_box heading_box"`.
5. **Scope block styles.** Every block-specific selector, variable, state, and responsive rule belongs under the matching `.name_box` root.
6. **Use the shared system.** Reuse the existing section layout, spacing tokens, `.fixed`, `.contents`, `.content`, `.items`, `.item`, `.buttons`, `.button`, `.image`, `.icon`, `.title`, `.text`, `.details`, `.wrapper`, `.container`, `.field`, and Sass placeholders before creating alternatives.
7. **Reuse CSS custom properties for style values.** For spacing, dimensions, colors, shadows, mask images, offsets, radii, typography, and control values, use an existing property at its owning level. Do not introduce a new property when an existing one is semantically close enough; accept a small design discrepancy instead. Create a new property only when the relationship is materially different or an exact value is essential and no existing property can express it. Keep any literal exception local and do not repeat it.
8. **Inherit global properties.** Do not redefine global CSS custom properties on a section or block just to restate their defaults. Override a global property only when that section genuinely needs a different value; otherwise let it inherit.

## Naming rules

### Blocks

- Every independent section or component uses a lowercase `<name>_box` class.
- The block class, file, and top-level SCSS selector must match:

  ```text
  .pricing_box -> styles/blocks/pricing.scss -> .pricing_box { ... }
  ```

- Use singular names for one entity or detail view: `.product_box`, `.post_box`.
- Use plural names for collections: `.products_box`, `.posts_box`, `.cards_box`.
- Do not use `_box` for an ordinary inner wrapper.
- Blocks are normally siblings. Nest blocks only for a real component composition, such as `.modal_box` containing `.form_box`; they must still be separate elements.

### Canonical block names

Always search for and reuse these blocks before inventing a synonym:

| Block | Purpose |
| --- | --- |
| `.header_box` | Site or page header. |
| `.footer_box` | Site or page footer. |
| `.heading_box` | Normal page or section heading. |
| `.hero_box` | Large heading/intro, usually with a background image. |
| `.media_box` | Image/media on one side and text on the other. |
| `.content_box` | Simple text-content section. |
| `.posts_box` | Post or article collection. |
| `.products_box` | Product collection. |
| `.cards_box` | Generic cards or feature tiles. |
| `.terms_box` | Taxonomy or term collection. |
| `.category_box` | Category-specific section or page. |
| `.comments_box` | Comments or reviews. |
| `.faq_box` | Frequently asked questions. |
| `.message_box` | Centered message with an optional logo/image above it. |
| `.contact_box` | Contact information. |
| `.breadcrumbs_box` | Breadcrumb navigation. |
| `.subscribe_box` | Subscription CTA. |
| `.form_box` | Form wrapper. |
| `.modal_box` | Modal wrapper. |
| `.wrapper_box` | Main content with sidebar, filters, or widgets. |
| `.post_box` / `.article_box` | Single post/article with additional formatting; use the name already established by the project. |
| `.product_box` | Single product or top product-detail section. |

Use one canonical block as the basis and modify it. For example, reuse `.posts_box` with `.items_featured` or `.media_box` with `.is_reversed`; do not create `.featured_posts_box` or `.reverse_media_box` for those differences alone.

### Elements and modifiers

- Inner elements use short semantic classes: `.contents`, `.content`, `.items`, `.item`, `.image`, `.icon`, `.details`, `.title`, `.text`, `.buttons`, `.button`, `.label`, `.field`, `.sidebar`, `.tabs`, and similar.
- Do not repeat the block name in inner classes. Use `.pricing_box .title`, not `.pricing_title`, `.pricing__title`, or `.pricing-box__title`.
- Use `is_*` for a state or mode: `.is_active`, `.is_open`, `.is_loading`, `.is_reversed`, `.is_sticky`.
- Use `<element>_<variant>` for an element variation: `.items_cards`, `.items_featured`, `.item_featured`, `.button_white`.
- Modifiers are additive. Keep the base class: `class="items items_3 items_cards"`, not `class="items_cards"`.
- Use `.items_xxx` and `.item_xxx` only for an implemented or deliberately shared behavior/layout/state variation. Do not use a modifier merely to label the content type: use `class="items"`, not `class="items items_services"`, when services have no special treatment.
- Use `.active` or vendor classes only when an existing JavaScript, WordPress, WooCommerce, or plugin contract requires them.
- For repeatable card titles, use `.title` on the title/link element when shared title styling is needed, or use a semantic heading such as a bare `<h3>`. Do not add classes to headings or invent heading-specific classes such as `.card_title`.
- Use `.text` for short plain text in a card. Use `.content` when the text may contain formatting, lists, or longer WYSIWYG content.
- Use `.caption` or `.label` for small supporting labels near headings or inside compact cards, while preserving the semantic meaning of a real form label.
- If a card contains a read-more link, put `.link` on an explicit `<a>` element.

### CSS custom properties

Project-owned variables use lowercase kebab-case and a strict type-first grammar:

```text
--<type>-<role>[-<qualifier>]
```

| Type | Purpose | Examples |
| --- | --- | --- |
| `font` | Font families | `--font-main`, `--font-heading` |
| `size` / `line` | Font size and matching line height | `--size-content`, `--line-content` |
| `theme` | Global color constants/source palette | `--theme-primary`, `--theme-secondary`, `--theme-tertiary` |
| `color` | Contextual colors consumed by styles and overridable by a section | `--color-background`, `--color-heading`, `--color-primary` |
| `button` / `field` | Control property and optional state | `--button-border-active`, `--field-text-disabled` |
| `shadow` | Shadow scale | `--shadow-small`, `--shadow-regular`, `--shadow-large` |
| `gap` | Spacing relationship and optional axis/position | `--gap-grid-x`, `--gap-section-side`, `--gap-field-y` |
| `offset` | Positional offsets | `--offset-header`, `--offset-section-top` |
| `height` / `width` / `radius` | Physical dimensions | `--height-image`, `--width-item`, `--radius-regular` |
| `mask` | Mask source | `--mask-image` |

- Put the type first: use `--width-gallery`, `--height-logo`, and `--gap-features`; never `--gallery-width`, `--logo-height`, `--pricing-gap`, camelCase, or value-based names such as `--blue` and `--gap-20`.
- Append qualifiers in semantic order: role, then variant/state/axis. Use `--theme-primary-alt`, `--button-border-disabled`, and `--gap-grid-x`.
- `--size-*` is for typography, not generic dimensions. Use `--width-*` or `--height-*` for layout sizes.
- Treat `--theme-*` colors as global constants. Declare them in `:root` and do not redefine them on a section, block, element, state, or breakpoint.
- Map theme constants to contextual `--color-*` variables in `styles/includes/properties.scss`, for example `--color-primary: var(--theme-primary)` and `--color-text: var(--theme-text)`.
- Base styles, blocks, and elements should prefer `--color-*` variables for colors. Control-specific variables such as `--button-*` and `--field-*` may provide another semantic layer. Do not use `--theme-*` directly in ordinary selectors, except when an element intentionally needs a fixed source color that must not follow the current section theme; use the appropriate `--theme-*` constant only for that exception.
- Override `--color-*`, not `--theme-*`, on a section or block. Descendants then inherit the local color scheme without changing the global palette.
- Use `primary`, `secondary`, and `tertiary` as the standard accent-color roles. Each role may expose a base color, alternate/active color, and readable text color through `-alt` and `-text`, for example `--theme-primary`, `--theme-primary-alt`, `--theme-primary-text` and their `--color-*` mappings. Do not create competing accent names when these roles are sufficient.
- For fixed or repeated style values, reuse an existing CSS custom property for colors, shadows, mask images, offsets, radii, typography, and controls instead of writing a literal. Content-driven per-instance values may use inline custom properties when the integration requires them.
- Do not add a new custom property merely because a design value differs slightly. Reuse the closest existing property and accept the small discrepancy; a new property requires a materially different relationship or an essential exact value that the existing system cannot express.
- Use `--gap-*` for spacing; do not create parallel `--margin-*`, `--padding-*`, or `--space-*` systems. Preserve meaningful singular/plural distinctions such as `--gap-button` versus `--gap-buttons-*` and `--gap-content` versus `--gap-contents`.
- In `styles/includes/properties.scss`, group variables by type in this order: fonts; sizes and lines; theme colors; contextual colors; buttons; fields; shadows; gaps; offsets; heights; widths; radii; masks. Separate groups with comments and blank lines.
- Declare a base before its derived variables, for example `--gap-grid` before `--gap-grid-x`/`--gap-grid-y`, and theme colors before contextual color aliases.
- Within a selector or breakpoint, place custom-property declarations before ordinary CSS declarations and keep adjacent variables grouped by type.
- Group block-local declarations by the same type-first scheme. Responsive mixins should override existing variables and retain the same grouping/order where practical.
- Reuse an existing name with the same meaning. Do not introduce a synonym or block-prefixed variable when the block scope already provides the namespace.
- Preserve third-party variables such as WordPress/plugin properties even when they do not follow this project grammar.

### Assets

- Name ordinary images with the `pic_` prefix: `pic_hero.jpg`, `pic_product_1.webp`.
- Name SVG interface icons with the `ico_` prefix: `ico_search.svg`, `ico_arrow_down.svg`.

## Usage examples

### Standard section structure

Use this composition when it matches the design:

```html
<section class="cards_box box_dark box_top_half">
	<div class="fixed">
		<div class="contents">
			<h2>Section title</h2>
			<div class="content">
				<p>Supporting text.</p>
			</div>
		</div>

		<div class="items items_3 items_featured">
			<div class="item">
				<a class="image" href="#">
					<img src="images/pic_example.jpg" width="640" height="480" alt="Description">
				</a>
				<div class="details">
					<a href="#" class="title">Item title</a>
					<div class="text">Item text.</div>
				</div>
			</div>
		</div>

		<div class="buttons">
			<a class="button button_white" href="#">View all</a>
		</div>
	</div>
</section>
```

The usual order inside `.fixed` is `.contents`, `.items`, then `.buttons`. Omit parts that are not needed.

## Usage rules

### Content and collections

- `.contents` groups a section title and intro. Use an appropriate `h1`, `h2`, or `h3` and optional `.content` inside it.
- `.content` contains body copy or WYSIWYG output: paragraphs, headings, lists, tables, images, links, blockquotes, and embeds. Reuse its existing typography and spacing.
- `.items` is the wrapper for repeatable content; its repeated children are normally direct `.item` elements.
- Put `.items_xxx` modifiers on `.items`, never on the block or each item. Use only variants implemented by the repository.
- Existing numeric variants are normally `.items_1` through `.items_6`. Use plain `.items` plus `--width-item` when custom columns are required.
- Use named modes such as `.items_cards`, `.items_featured`, `.items_icons`, `.items_large`, or `.items_inline` only when they already exist or are deliberately added as shared behavior. A content label alone is not a mode.
- Add `.carousel` to the same `.items` wrapper when the collection is a slider: `class="items items_3 carousel"`. Follow the existing carousel/Embla markup and script conventions.
- Use a block-local `.card` only for a deliberate non-standard card or menu-tile structure. Do not create a second global card/grid system.

### Section themes and boundaries

- A section has one `_box` class and may also have global `box_*` modifiers.
- Use a global `.box_<scheme>` class for color schemes, such as `.box_dark` or `.box_light`. A scheme overrides contextual `--color-*` variables on the section and lets descendants inherit them; it must not redefine global `--theme-*` constants. If a required scheme does not exist, define it once in `styles/base/layout.scss`.
- Use `.box_no_top` and `.box_no_bottom` to remove edge spacing.
- Half-spacing names are repository-specific. In this project, use `.box_top_half` and `.box_bottom_half`; do not emit `.box_half_top` or `.box_half_bottom` unless those aliases first exist in `styles/base/layout.scss`.
- Use `.box_border` for the border between sections. Do not reimplement the same boundary in individual blocks.

### Spacing and variable ownership

Use the existing spacing and sizing system. Before writing a literal for `gap`, margin, padding, width, height, min/max dimensions, radius, or a similar value, search the existing CSS custom properties and reuse the closest semantic token. Do not choose an arbitrary value when an existing property represents the relationship.

| Relationship | Owner | Use |
| --- | --- | --- |
| Section top/bottom padding | Section/block root | `--gap-section`, `--gap-section-top`, `--gap-section-bottom`, `box_*` modifiers. |
| Section side padding | Section/block root | `--gap-section-side`; `.fixed` should not duplicate it. |
| Content width | `.fixed` | `--width-fixed` or a justified scoped `max-width`. |
| Major section parts | `.contents`, `.items`, `.buttons` relationship | `--gap-contents`. |
| Rich-text children | `.content` | `--gap-content`, `--gap-heading`, `--gap-list`, `--gap-table`. |
| Collection gutters | `.items` | `--gap-grid-x`, `--gap-grid-y`. |
| Repeated item width | Block root or `.items` | `--width-item`. |
| Card/item padding | `.item` | `--gap-card`. |
| Split-layout columns | Owning inner layout | `--gap-section-inner`. |
| Button spacing/padding | `.buttons`, `.button` | `--gap-buttons-x`, `--gap-buttons-y`, `--gap-button`. |
| Form fields | Field/group owner | `--gap-field`, `--gap-field-x`, `--gap-field-y`. |

For `.items`/`.item` layouts, start with `--gap-grid-x`, `--gap-grid-y`, and `--width-item`. If a scoped CSS Grid implementation replaces the shared item geometry, explicitly reset the inherited width, margins, and flex behavior.

Keep project-wide tokens in shared properties, block-wide values on `.name_box`, collection geometry on `.items`, and item-local values on `.item` or its element. Create a block-scoped variable only for a real local relationship that has no suitable existing property, and reuse it. If an exact one-off value is absolutely necessary, keep the literal at the owning selector and document why it cannot use an existing property.

### Buttons and forms

- Wrap actions in `.buttons` and put `.button` on every button or action link.
- Add an existing variant such as `.button_outline`, `.button_secondary`, `.button_white`, `.button_prev`, or `.button_download`; keep `.button` present.
- Make block-specific button adjustments under the block root and through existing button variables. Do not copy the global button implementation.
- In an authored `.form_box`, wrap each field in `.item`, use `<label class="label">`, and wrap the input/control in `.field`.
- Preserve vendor-generated form classes and integration hooks.
- Use `rem()` for explicit `font-size` and `line-height` values on controls, including buttons, input fields, menu items, labels, tabs, pagination, and badges. Use `px` for explicit typography values on non-control/content elements. Prefer shared typography tokens when available.

### Images and icons

- Wrap almost every ordinary image in an `.image` link or `div`; put `.image` on the wrapper.
- For a fixed aspect ratio, use `.image { @extend %image; }` inside the block and set percentage-based `--height-image` on the block or image.
- Include useful `alt`, `width`, and `height` attributes. Use empty `alt` only for decorative images.
- Use `.icon` for SVG interface icons. Prefer a mask supplied through `--mask-image` and color it with `currentColor`:

  ```html
  <span class="icon" style="--mask-image: url(images/ico_search.svg);"></span>
  ```

- Use an `<img>` instead of a mask when the asset must preserve multiple internal colors.

### WordPress-compatible menus

Keep menu markup close to WordPress output:

```html
<nav class="navigation" id="main-menu">
	<ul class="menu">
		<li class="submenu">
			<a href="/products/">Products</a>
			<ul class="sub-menu">
				<li><a href="/products/category/">Category</a></li>
			</ul>
		</li>
	</ul>
</nav>
```

- `.menu` is the top-level list.
- `.submenu` belongs to the parent `li` that owns children.
- `.sub-menu` belongs to the nested `ul` at every depth.
- In this project, menu styles belong under `.header_box` in `styles/blocks/header.scss` because `.navigation` is owned by the header.
- Preserve menu IDs, matching `aria-controls`, WordPress classes, and JavaScript state hooks.

### Modals

- Use `.modal_box` as each modal root and give it a unique `id="modal_<name>"`.
- Place all modal roots at the end of the page, after the main content and footer.
- Preserve the existing trigger, close, loader, accessibility, and JavaScript contracts.

### SCSS boundaries

Place one block in one file and keep all block-specific code beneath its root:

```scss
.cards_box {
	--width-item: 33.333%;
	--height-image: 62.5%;

	.image {
		@extend %image;
	}

	.item {
		padding: var(--gap-card);
	}

	@include desktop_small {
		--width-item: 50%;
	}

	@include tablet_small {
		--width-item: 100%;
	}
}
```

- Never put unscoped `.title`, `.item`, `.image`, or similar block-specific rules in a block file or global stylesheet.
- Search `styles/elements` and `styles/base` before adding styles. Reuse concrete global classes and `%...` placeholders that actually exist.
- Treat globally defined `.items`, `.item`, `.buttons`, `.button`, `.contents`, `.content`, `.image`, `.icon`, and other base classes as the default implementation. If a section needs a local change, keep the base class and customize it under the block, for example `.cards_box .items` or `.cards_box .button`.
- Do not create a block-local replacement for a global class when a scoped override can express the required difference. Create a new class only for a genuinely different semantic role or behavior.
- Add a `%name` placeholder only when at least two blocks share the pattern.
- Add a concrete global class only when markup uses it project-wide.
- Never extend another `_box` selector or import one block stylesheet into another.
- An outer block may adjust a nested block root's layout, visibility, or inherited variables, but must not reach into the nested block's elements.

### Responsive rules

- Prefer the existing named mixins: `desktop_large`, `desktop_small`, `tablet_large`, `tablet_small`, `phone_large`, and `phone_small`.
- Use `media_min($breakpoint)` only for intentional min-width behavior, with an existing breakpoint variable.
- Do not introduce raw pixel breakpoints when a project mixin or variable represents the boundary.
- Override the smallest relevant variables/rules inside the owning block.

### JavaScript modules

Use independent behavior modules bound to stable parents:

```js
Twee.addModule('cards', '.cards_box', function($, wrapper) {
	wrapper.on('click', '.button', function() {
		// Behavior is scoped to this block.
	});
});
```

- Bind section behavior to one `_box` root or a small group of parents that expose the same contract.
- Bind truly global behavior to `html` and still delegate to specific descendants.
- Scope queries and delegated events to the bound parent. Do not use unscoped document queries for block behavior.
- Use existing `is_*` classes and stable `data-*` hooks for state and behavior.
- Preserve the repository's module loader, dependency, once-only, and dynamic-content conventions.
- Name modules after behavior, not pages, and keep one behavior per module.

## General recommendations

### Workflow

1. Search nearby HTML, block SCSS, base styles, placeholders, scripts, and assets.
2. Select the closest canonical block and try existing markup, `is_*`, `box_*`, `.items_*`, `.item_*`, button variants, and variables.
3. If reuse is impossible, record the substantial structural or behavioral reason for a new block.
4. Add semantic HTML with exactly one `_box` class per element.
5. Add or update the matching block stylesheet; add JavaScript only when interaction requires it.
6. Build styles and inspect desktop, tablet, and phone layouts.
7. Review the diff for leakage, duplicate systems, generated-file edits, and unrelated changes.

Useful search:

```powershell
rg -n "_box|\.contents|\.content|\.items|\.item|\.buttons|\.button|submenu|sub-menu|ico_|pic_" .
```

### File locations

| Purpose | Location |
| --- | --- |
| Page HTML | `*.html` |
| Block styles | `styles/blocks/<block>.scss` |
| Shared placeholders | `styles/elements/<element>.scss` |
| Global element classes | `styles/base/base.scss` |
| Section layout and `box_*` modifiers | `styles/base/layout.scss` |
| Variables, functions, mixins | `styles/includes/*.scss` |
| JavaScript modules | `scripts/<module>.js` |
| Images and icons | `images/*` |
| Generated output | `build/*`; never edit manually. |

Keep platform-specific selectors in the existing integration stylesheet, such as `styles/woo/*`. Preserve the current import and loader conventions.

### HTML and integration safety

- Use semantic elements, sensible heading levels, real buttons for actions, links for navigation, and lists for list content.
- Preserve IDs, `aria-*`, `data-*`, WordPress, WooCommerce, form, and JavaScript hooks.
- Keep dynamic inline CSS limited to per-instance custom properties such as `--mask-image`; fixed component styling belongs in SCSS.
- Test realistic content lengths, keyboard use, image alternatives, and interactive states.

## Best practices

Before handing off a section, verify:

- The closest existing canonical block was reused, or a substantial reason for a new block is recorded.
- No element contains more than one `_box` class.
- The block class, file name, and root selector match.
- All block-specific styles and responsive rules are scoped under that root.
- Color, spacing, item-count, and state differences use global or existing modifiers instead of duplicate blocks.
- Modifiers describe real behavior/layout/state; no modifier exists only to label content, such as `items_services` without special treatment.
- `.contents`, `.content`, `.items`, `.item`, `.buttons`, `.button`, `.image`, and `.icon` follow their defined roles.
- Global base classes were reused and any section-specific changes were scoped under the owning `.name_box`.
- Global CSS custom properties are inherited where possible; section/block overrides are limited to properties that genuinely need different values.
- Collection geometry uses `--gap-grid-x`, `--gap-grid-y`, and `--width-item`; sliders use `.carousel` on `.items`.
- Section, content, card, button, and form spacing use the correct existing tokens.
- Existing CSS custom properties were searched before adding style-value literals or new properties; small design discrepancies reuse existing tokens, while every exact-value or new-property exception is necessary, local, and not duplicated.
- New CSS custom properties follow `--<type>-<role>[-<qualifier>]`, use established vocabulary, and are grouped by type.
- `--theme-*` colors remain global constants; normal styles prefer `--color-*`, and direct `--theme-*` use is limited to intentional element colors that must not follow the current section theme.
- Accent colors use the `primary`, `secondary`, and `tertiary` roles with existing `-alt` and `-text` variants.
- Images use `.image`, `%image`, and `--height-image` where appropriate; assets use `pic_` and `ico_` prefixes.
- Icon masks use `--mask-image` and `currentColor` where appropriate.
- Menus retain `.menu`, `li.submenu`, and `ul.sub-menu` plus required IDs/ARIA hooks.
- Forms, modals, vendor hooks, and JavaScript contracts remain intact.
- Card titles, text, labels, and read-more links follow the `.title`, `.text`, `.content`, `.caption`/`.label`, and `.link` roles above; headings remain unclassed.
- Responsive rules use existing mixins; explicit typography uses `rem()` for controls and `px` for non-control/content elements.
- Block JavaScript is bound and scoped to its parent.
- `build/*` was not edited manually.
- `npm run styles` succeeds after SCSS changes, and `git diff --check` is clean.

## References

- [CSS_BOX article](https://toniievych.medium.com/css-box-a-better-way-to-organize-css-on-large-projects-88b72841a4f6)
- [CSS_BOX discussion](https://www.reddit.com/r/css/comments/1apomz1/css_box_a_better_way_to_write_css/)
