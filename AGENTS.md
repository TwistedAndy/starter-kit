# CSS_BOX instructions

The directory that holds this `AGENTS.md` is the project root. All paths in this document are relative to it. The same rules apply to the WordPress theme that is built from this template. Its styles are in `assets/styles`, and its markup is in the PHP templates.

## Core rules

Treat these as mandatory:

1. **Reuse first.** Start from the closest existing section, its markup, variables, and modifiers. A different color, spacing, image, text, alignment, or item count is not a reason to create another section.
2. **Prefer meaningful modifiers.** Adapt an existing block with `is_*`, `has_*`, `.items_*`, `.item_*`, `.button_*`, and block-scoped CSS variables, but add a modifier only when it changes defined behavior, layout, appearance, or state. Do not add semantic-only modifiers such as `items_services` when plain `.items` behaves the same.
3. **Create a block only for a substantial difference.** A new `_box` is justified only by a different responsibility, DOM structure, interaction model, or layout relationship that would make the existing block misleading or full of exceptions.
4. **Use one block per element.** An HTML element may contain at most one class ending in `_box`. Never write `class="media_box heading_box"`.
5. **Scope block styles.** Every block-specific selector, variable, state, and responsive rule belongs under the matching `.name_box` root.
6. **Use the shared system.** Reuse the existing section layout, spacing tokens, `.fixed`, `.contents`, `.content`, `.items`, `.item`, `.buttons`, `.button`, `.image`, `.title`, `.text`, `.details`, `.wrapper`, `.container`, `.field`, and Sass placeholders before creating alternatives.
7. **Reuse CSS custom properties for style values.** For spacing, dimensions, colors, shadows, mask images, offsets, radii, typography, and control values, use an existing property at its owning level. Do not introduce a new property when an existing one is semantically close enough; accept a small design discrepancy instead. Create a new property only when the relationship is materially different or an exact value is essential and no existing property can express it. Keep any literal exception local and do not repeat it.
8. **Inherit global properties.** Do not redefine global CSS custom properties on a section or block just to restate their defaults. Override a global property only when that section genuinely needs a different value; otherwise let it inherit.

## Naming rules

### Blocks

- Every independent section or component uses a lowercase `<name>_box` class.
- A box element is an element whose class ends in `_box`, such as `.media_box`. It is the wrapper and the namespace of the elements inside it: their styles are scoped under its class.
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

### Elements

- Inner elements use short, one-word classes that say what the element is. Prefer these:
  - text: `.title`, `.subtitle`, `.heading`, `.caption`, `.label`, `.text`, `.content`, `.contents`, `.details`;
  - collections: `.items`, `.item`, `.list`, `.sections`, `.section`, `.tabs`, `.tab`;
  - media: `.image`, `.images`, `.media`, `.video`, `.icon`;
  - actions: `.buttons`, `.button`, `.links`, `.link`;
  - forms: `.field` (the wrapper of a control), `.options`, `.option`;
  - layout: `.wrapper`, `.container`, `.fixed`, `.sidebar`.

  Use a plural for the wrapper of a set and the singular for each member, as `.items` and `.item`.
- Write plain tags without classes where the tag already says what the element is: `h1` to `h6`, `p`, `em`, `strong`, `ul`, `ol`, `li`, `a`, `blockquote`, `table`. Style them under the class of their parent, such as `.details h3` or `.content p`.
- Do not add a class to a heading, `h1` to `h6`, unless it is strictly necessary.
- Another element takes a class when it is necessary. For example, `<label class="label">`: some elements have no `<label>`, but still need a caption that looks like one, so they take `.label` too.
- Do not repeat the block name in inner classes. Use `.pricing_box .title`, not `.pricing_title`, `.pricing__title`, or `.pricing-box__title`.

### Modifiers and states

A modifier or a state is a class beside the base class of an element. Its form depends on the element:

| Kind | On | Form | Examples |
| --- | --- | --- | --- |
| Box modifier | A box element | `is_<word>` for the kind, the scheme or the state of the block. `has_<word>` for what the block has, such as its content, spacing or border. | `.is_reversed`, `.is_dark`, `.is_sticky`, `.is_visible`, `.has_top`, `.has_border` |
| Element modifier | An inner element | `<element>_<modifier>`: the base class of the element, with the modifier after it. It changes the style or the behavior of the element. | `.button_outline`, `.items_3`, `.media_video`, `.contents_split`, `.content_compact` |
| Element state | An inner element | One word that names the state, with no prefix. | `.active`, `.hidden`, `.loading`, `.opened`, `.collapsed`, `.expanded` |

```html
<section class="posts_box is_dark has_no_top">
	<div class="items items_3">
		<div class="item active">...</div>
		<div class="item">...</div>
	</div>
	<div class="buttons">
		<a class="button button_outline" href="/news">All news</a>
	</div>
</section>
```

- `is_*` and `has_*` go only on a box element. A plain state goes only on an inner element: `.modal_box.is_visible`, but `.button.loading`. The `body` takes a plain state too, such as `.locked` while a modal is open.
- A box element never takes a `box_*` class.
- Keep as few modifiers as possible. Add a modifier or a state only when it is needed, and when it makes the code simpler.
- When most elements would share a modifier, make its style the default instead. Move the styles from the modifier to the base class, and add a modifier only to the elements that differ. For example, most buttons are filled, so `.button` is filled, and only the others take `.button_outline`.
- A modifier needs at least two variants to choose between. When a block has only one kind of card, `class="items"` is enough: the cards are the default look of its items.
- A modifier is one word after `is_`, `has_` or the base class. Do not join several words, such as `.items_featured_large`. Use two modifiers instead. Use a two-word modifier only when no short word describes it, as for `.has_no_top` and `.has_top_half`.
- Keep the base class: `class="button button_outline"`, not `class="button_outline"`.
- When every element in a set needs the same modifier, put it on the wrapper: `class="items items_cards"`, not `item_card` on each `.item`.
- `.carousel` is an exception. It is a common element with its own styles, and goes beside `.items`: `class="items items_3 carousel"`.
- Keep the classes of WordPress, WooCommerce, a plugin or a library, such as `.sub-menu`, `.gform_wrapper` and `.embla_container`, and the classes that an existing script relies on. They may stay at the top level of a stylesheet, outside a box.

### Element roles

- For repeatable card titles, use `.title` on the title/link element when shared title styling is needed, or use a semantic heading such as a bare `<h3>`. Do not invent heading-specific classes such as `.card_title`.
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
| `offset` | Positional offsets | `--offset-top`, `--offset-section-top` |
| `height` / `width` / `radius` | Physical dimensions | `--height-image`, `--width-item`, `--radius-regular` |
| `columns` | The columns of a grid | `--columns-count` |
| `mask` | Mask source | `--mask-image` |

- Put the type first: use `--width-gallery`, `--height-logo`, and `--gap-features`; never `--gallery-width`, `--logo-height`, `--pricing-gap`, camelCase, or value-based names such as `--blue` and `--gap-20`.
- Append qualifiers in semantic order: role, then variant/state/axis. Use `--theme-primary-alt`, `--button-border-disabled`, and `--gap-grid-x`.
- `--size-*` is for typography, not generic dimensions. Use `--width-*` or `--height-*` for layout sizes.
- Treat `--theme-*` colors as global constants. Declare them in `:root` and do not redefine them on a section, block, element, state, or breakpoint.
- Map theme constants to contextual `--color-*` variables in `styles/includes/properties.scss`, for example `--color-primary: var(--theme-primary)` and `--color-text: var(--theme-text)`.
- Base styles, blocks, and elements should prefer `--color-*` variables for colors. Control-specific variables such as `--button-*` and `--field-*` may provide another semantic layer. Do not use `--theme-*` directly in ordinary selectors, except when an element intentionally needs a fixed source color that must not follow the current section theme; use the appropriate `--theme-*` constant only for that exception.
- Override `--color-*`, not `--theme-*`, on a section or block. Descendants then inherit the local color scheme without changing the global palette.
- A box with a color scheme of its own maps `--theme-*` to `--color-*` on its root. Its elements then use only `--color-*`. For example, a dark footer sets `--color-text: var(--theme-secondary-text)`.
- Use `primary`, `secondary`, and `tertiary` as the standard accent-color roles. Each role may expose a base color, alternate/active color, and readable text color through `-alt` and `-text`, for example `--theme-primary`, `--theme-primary-alt`, `--theme-primary-text` and their `--color-*` mappings. Do not create competing accent names when these roles are sufficient.
- For fixed or repeated style values, reuse an existing CSS custom property for colors, shadows, mask images, offsets, radii, typography, and controls instead of writing a literal. Content-driven per-instance values may use inline custom properties when the integration requires them.
- A value used in one place stays a literal at that place. Do not add a property for it.
- Use `--gap-*` for spacing; do not create parallel `--margin-*`, `--padding-*`, or `--space-*` systems. Preserve meaningful singular/plural distinctions such as `--gap-button` versus `--gap-buttons-*` and `--gap-content` versus `--gap-contents`.
- In `styles/includes/properties.scss`, group variables by type in this order: fonts; sizes and lines; theme colors; contextual colors; buttons; fields; shadows; gaps; offsets; heights; widths; columns; radii; masks. Separate groups with comments and blank lines.
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
<section class="cards_box is_dark has_top_half">
	<div class="fixed">
		<div class="contents">
			<h2>Section title</h2>
			<div class="content">
				<p>Supporting text.</p>
			</div>
		</div>

		<div class="items items_3">
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
			<a class="button button_outline" href="#">View all</a>
		</div>
	</div>
</section>
```

The usual order inside `.fixed` is `.contents`, `.items`, then `.buttons`. Omit parts that are not needed.

## Usage rules

### Content and collections

- `.contents` groups a section title and intro. Use an appropriate `h1`, `h2`, or `h3` and optional `.content` inside it.
  - `.contents_split` puts the title on one side and the buttons on the other.
  - `.contents_heading` balances the title and the intro, for the heading of a page.
- `.content` contains body copy or WYSIWYG output: paragraphs, headings, lists, tables, images, links, blockquotes, and embeds. Reuse its existing typography and spacing.
  - `.content_compact` shows the start of a long text with a toggle. The script adds `.collapsed` or `.expanded` to it.
- `.items` is the wrapper for repeatable content; its repeated children are normally direct `.item` elements.
- Put `.items_xxx` modifiers on `.items`, never on the block or each item. Use only variants implemented by the repository.
- `.items` sets `--width-item: calc(100% / var(--columns-count))`.
  - `.items_1` through `.items_6` set `--columns-count` on a wide screen. `.items_5` and `.items_6` show four columns below `desktop_large`.
  - For other columns, set `--columns-count` on the `.items` of the block. Set it again in a media query for fewer columns on a smaller screen.
- Add an `.items_*` mode only when the same `.items` is shown in more than one way. A content label alone is not a mode.
- Add `.carousel` to the same `.items` wrapper when the collection is a slider: `class="items items_3 carousel"`. Follow the existing carousel/Embla markup and script conventions.
- Use a block-local `.card` only for a deliberate non-standard card or menu-tile structure. Do not create a second global card/grid system.

### Section themes and boundaries

- A section has one `_box` class, and may also have the global section modifiers below. They are defined in `styles/base/layout.scss`.
- Use a global `.is_<scheme>` class for color schemes, such as `.is_dark` or `.is_light`. A scheme overrides contextual `--color-*` variables on the section and lets descendants inherit them; it must not redefine global `--theme-*` constants. If a required scheme does not exist, define it once in `styles/base/layout.scss`.
- Use `.has_no_top` and `.has_no_bottom` to remove edge spacing.
- Use `.has_top` and `.has_bottom` for the full spacing, where a section would have none.
- Use `.has_top_half` and `.has_bottom_half` for half spacing; do not emit `.has_half_top` or `.has_half_bottom` unless those aliases first exist in `styles/base/layout.scss`.
- Use `.has_border` for the border between sections. Do not reimplement the same boundary in individual blocks.
- In the theme, `tw_block_attributes()` writes these classes from the settings of a block: the background, the top and bottom spacing, and the border.

### Spacing and variable ownership

Use the existing spacing and sizing system. Before writing a literal for `gap`, margin, padding, width, height, min/max dimensions, radius, or a similar value, search the existing CSS custom properties and reuse the closest semantic token. Do not choose an arbitrary value when an existing property represents the relationship.

| Relationship | Owner | Use |
| --- | --- | --- |
| Section top/bottom padding | Section/block root | `--gap-section`, `--gap-scale-top` and `--gap-scale-bottom` (multipliers of `--gap-section`), `--gap-section-top` and `--gap-section-bottom` (the computed lengths, read-only), the `has_*` spacing modifiers. |
| Section side padding | Section/block root | `--gap-section-side`; `.fixed` should not duplicate it. |
| Content width | `.fixed` | `--width-fixed` or a justified scoped `max-width`. |
| Major section parts | `.contents`, `.items`, `.buttons` relationship | `--gap-contents`. |
| Rich-text children | `.content` | `--gap-content`, `--gap-heading`, `--gap-list`, `--gap-table`. |
| Collection gutters | `.items` | `--gap-grid-x`, `--gap-grid-y`. |
| Repeated item width | The block's `.items` | `.items_1` through `.items_6`, `--columns-count`, or `--width-item` for a width that is not a share of the row. |
| Card/item padding | `.item` | `--gap-card`. |
| Split-layout columns | Owning inner layout | `--gap-section-inner`. |
| Button spacing/padding | `.buttons`, `.button` | `--gap-buttons-x`, `--gap-buttons-y`, `--gap-button`. |
| Form fields | Field/group owner | `--gap-field`, `--gap-field-x`, `--gap-field-y`. |

For `.items`/`.item` layouts, start with `--gap-grid-x`, `--gap-grid-y`, and `--columns-count`. If a scoped CSS Grid implementation replaces the shared item geometry, explicitly reset the inherited width, margins, and flex behavior.

Keep project-wide tokens in shared properties, block-wide values on `.name_box`, collection geometry on `.items`, and item-local values on `.item` or its element. Create a block-scoped variable only for a real local relationship that has no suitable existing property, and reuse it. If an exact one-off value is absolutely necessary, keep the literal at the owning selector and document why it cannot use an existing property.

### Buttons and forms

- Wrap actions in `.buttons` and put `.button` on every button or action link.
- Add an existing variant such as `.button_outline`, `.button_secondary`, `.button_tertiary`, `.button_white` or `.button_black`; keep `.button` present.
- A button that waits for a response takes `.loading`. A button that has nothing more to load takes `.hidden`.
- Make block-specific button adjustments under the block root and through existing button variables. Do not copy the global button implementation.
- In an authored `.form_box`, wrap each field in `.item`, use `<label class="label">`, and wrap the input/control in `.field`.
- Preserve vendor-generated form classes and integration hooks.
- Use `rem()` for explicit `font-size` and `line-height` values on controls, including buttons, input fields, menu items, labels, tabs, pagination, and badges. Use `px` for explicit typography values on non-control/content elements. Prefer shared typography tokens when available.

### Images and icons

- Wrap almost every ordinary image in an `.image` link or `div`; put `.image` on the wrapper.
- For a fixed aspect ratio, use `.image { @extend %image; }` inside the block and set percentage-based `--height-image` on the block or image.
- Include useful `alt`, `width`, and `height` attributes. Use empty `alt` only for decorative images.
- The element that an icon belongs to draws it as its `::before` or `::after`. The icon is a mask of the image in `--mask-image`, in `currentColor`. It has no empty element of its own.
  - A button draws it with `%button_icon_before` or `%button_icon_after`.
  - The stylesheet of the element sets `--mask-image` by its class, such as `.button_arrow`.
  - An icon that comes from data is an inline property instead. The theme writes it with `tw_image_attribute()`.
- Use an `<img>` instead of a mask when the asset must preserve multiple internal colors.

### WordPress-compatible menus

Keep menu markup close to WordPress output:

```html
<nav class="navigation" id="main-menu">
	<ul class="menu">
		<li class="submenu active">
			<a href="/products/">Products</a>
			<ul class="sub-menu">
				<li class="active"><a href="/products/category/" aria-current="page">Category</a></li>
			</ul>
		</li>
	</ul>
</nav>
```

- `.menu` is the top-level list.
- `.submenu` belongs to the parent `li` that owns children.
- `.sub-menu` belongs to the nested `ul` at every depth. WordPress writes it.
- `.active` belongs to the `li` of the current page, and to every `li` above it. The theme writes it in place of the `current-*` classes of WordPress.
- On a small screen, the script adds `.opened` to the `li` whose submenu is open, and `.parent` to every `li` above it.
- In this project, menu styles belong under `.header_box` in `styles/blocks/header.scss` because `.navigation` is owned by the header.
- Preserve menu IDs, matching `aria-controls`, and JavaScript state hooks.

### Modals

- Use `.modal_box` as each modal root and give it a unique `id="modal_<name>"`. An open modal takes `.is_visible`.
- Place all modal roots at the end of the page, after the main content and footer.
- Preserve the existing trigger, close, loader, accessibility, and JavaScript contracts.

### SCSS boundaries

Place one block in one file and keep all block-specific code beneath its root:

```scss
.cards_box {
	--height-image: 62.5%;

	.items {
		--columns-count: 3;

		@include desktop_small {
			--columns-count: 2;
		}

		@include tablet_small {
			--columns-count: 1;
		}
	}

	.image {
		@extend %image;
	}

	.item {
		padding: var(--gap-card);
	}
}
```

- Never put unscoped `.title`, `.item`, `.image`, or similar block-specific rules in a block file or global stylesheet.
- Search `styles/elements` and `styles/base` before adding styles. Reuse concrete global classes and `%...` placeholders that actually exist.
- Treat globally defined `.items`, `.item`, `.buttons`, `.button`, `.contents`, `.content`, `.image`, and other base classes as the default implementation. If a section needs a local change, keep the base class and customize it under the block, for example `.cards_box .items` or `.cards_box .button`.
- Do not create a block-local replacement for a global class when a scoped override can express the required difference. Create a new class only for a genuinely different semantic role or behavior.
- Add a `%name` placeholder only when at least two blocks share the pattern.
- Add a concrete global class only when markup uses it project-wide.
- Never extend another `_box` selector or import one block stylesheet into another.
- An outer block may adjust a nested block root's layout, visibility, or inherited variables, but must not reach into the nested block's elements.
- Inside a block, nest two or three levels deep. Use four only for a solid reason.
- A child selector names its parent: `& > .caption`, not `> .caption`.
- Nest the rules of an element inside it: `.link { .title {} .text {} }`, not `.link .title` and `.link .text`.
- Nest the state of a parent the same way: `&.opened { .item {} }`, not `&.opened .item`. A child selector may follow a state: `&:hover > .buttons`.
- A comment is at most two lines, above what it explains.
- There is no `!important`, except to override the inline styles of WordPress or a plugin. A rule that has to win gets a selector that wins.

### Responsive rules

- Prefer the existing named mixins: `desktop_large`, `desktop_small`, `tablet_large`, `tablet_small`, `phone_large`, and `phone_small`.
- Use `media_min($breakpoint)` only for intentional min-width behavior, with an existing breakpoint variable.
- Write a hover style inside `@include hover`. Write what a screen without hover needs, such as a touch screen, inside `@include hoverless`.
- Do not introduce raw pixel breakpoints when a project mixin or variable represents the boundary. The breakpoints of the WordPress admin bar, 782 and 600, are the exception.
- Override the smallest relevant variables/rules inside the owning block.

### JavaScript modules

Behavior is written in modules. A module is a function that runs once for each element that matches its selector. The loader, `Twee`, runs the modules when the page loads. It is `scripts/app.js` in the template, and the plugin `assets/plugins/app` in the theme.

```js
Twee.addModule('faq', '.faq_box', function($, wrapper) {

	wrapper.on('click', '.title', function() {

		var item = $(this).closest('.item');

		item.toggleClass('opened').siblings().removeClass('opened');

	});

});
```

`Twee.addModule(key, selector, callback, deps, multiple)` takes these arguments:

- `key` is a unique name of the module. Name it after the behavior, not the page, such as `faq` or `carousel`.
- `selector` is the element that the module is bound to: a `_box` root, a few roots that share the same markup, or an element such as `.content > table`. A global behavior is bound to `html`, and runs once for the page.
- `callback` receives jQuery as `$` and the element, wrapped in jQuery. `this` is the element itself.
- `deps` lists what the module needs first: the keys of other modules, such as `['sticky']`, or the names of global variables that a library defines, such as `EmblaCarousel`. The module waits until each one exists.
- `multiple` lets the module run again on an element that it has already run on. It is `false` by default.

After a module runs on an element, the loader triggers `twee_init_<key>` on that element.

Write a module by these rules:

- Keep one behavior in one module and one module in one file, `scripts/<key>.js`.
- Scope queries and events to the bound element: `$('.item', wrapper)` and `wrapper.on('click', '.title', …)`. Do not query the whole document for the behavior of a block.
- Bind a global behavior to `html`, and still delegate its events to specific elements, such as `wrapper.on('click', '[data-modal]', …)`.
- Set the state of a box with `is_*`, and the state of an inner element with a plain word, as "Modifiers and states" says: `wrapper.addClass('is_menu')`, `button.addClass('loading')`.
- Read the behavior of an element from stable `data-*` attributes, such as `data-modal` or `data-loader`, not from its style classes.
- Take values from PHP from the object that the theme passes to the scripts, `tw_template`, such as `tw_template.ajaxurl`, `tw_template.nonce` and `tw_template.lang_more`. Do not write URLs or visible text into a script.
- Use the helpers of `Twee` instead of writing new ones:
  - `Twee.debounce(callback, delay)` and `Twee.throttle(callback, limit)` for input, scroll and resize;
  - `Twee.lockScroll()` and `Twee.unlockScroll()` for a modal or a menu over the page;
  - `Twee.runOnce(element, slug)` for code that must run once for an element outside a module;
  - `Twee.setCookie()` and `Twee.getCookie()`.
- After a script adds markup to the page, such as the items that the loader brings, run the modules on it: `Twee.runModules(wrapper)`.
- Let modules talk through jQuery events on the element they share, not through global variables. The existing events are:
  - `open` and `close` on a `.modal_box`;
  - `reset` and `loaded` on the section of the loader;
  - `form_success` and `form_error` on a form.
- Listen to the events of WordPress, WooCommerce and plugins where they are triggered, such as `$(document.body).on('updated_cart_totals', …)`.

### Script files

- The modules in `scripts/` are joined into one file, `build/scripts.js`, which every page loads. Run `npm run scripts` after a change, in the template or in the `assets` folder of the theme.
- A module that only some pages need, or that needs a library, is a plugin in the theme: a folder in `assets/plugins/<name>/`. Its `index.php` returns its files and what they depend on:

  ```php
  return [
      'script' => [
          'embla-carousel.umd.js',
          'carousel.js',
      ],
      'deps' => ['app']
  ];
  ```

  The template that shows the markup loads the plugin: `tw_asset_enqueue('embla')`. The plugin is loaded only on the pages that use it.
- Keep the files of a library as they are. Write the module that uses the library in a file of its own beside them.
- In the theme, `functions.php` registers the scripts with `tw_asset_register()`. Its `localize` function returns the values of `tw_template`. A new value that a script needs from PHP is added there.

## General recommendations

### Workflow

1. Search nearby HTML, block SCSS, base styles, placeholders, scripts, and assets.
2. Select the closest canonical block and try existing markup, `is_*`, `has_*`, `.items_*`, `.item_*`, button variants, and variables.
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
| Section layout, schemes and spacing modifiers | `styles/base/layout.scss` |
| Variables, functions, mixins | `styles/includes/*.scss` |
| JavaScript modules | `scripts/<module>.js` |
| Libraries and the modules that use them, in the theme | `assets/plugins/<name>/`, with an `index.php` |
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
- Box modifiers are `is_*` or `has_*`, element modifiers are `<element>_<modifier>`, and element states are plain words. No class starts with `box_`.
- Modifiers describe real behavior/layout/state; no modifier exists only to label content, such as `items_services` without special treatment.
- `.contents`, `.content`, `.items`, `.item`, `.buttons`, `.button`, and `.image` follow their defined roles.
- Global base classes were reused and any section-specific changes were scoped under the owning `.name_box`.
- Global CSS custom properties are inherited where possible; section/block overrides are limited to properties that genuinely need different values.
- Collection geometry uses `--gap-grid-x`, `--gap-grid-y`, and `.items_1` through `.items_6` or `--columns-count`; sliders use `.carousel` on `.items`.
- Section, content, card, button, and form spacing use the correct existing tokens.
- Existing CSS custom properties were searched before adding style-value literals or new properties; small design discrepancies reuse existing tokens, while every exact-value or new-property exception is necessary, local, and not duplicated.
- New CSS custom properties follow `--<type>-<role>[-<qualifier>]`, use established vocabulary, and are grouped by type.
- `--theme-*` colors remain global constants; normal styles prefer `--color-*`, and direct `--theme-*` use is limited to intentional element colors that must not follow the current section theme.
- Accent colors use the `primary`, `secondary`, and `tertiary` roles with existing `-alt` and `-text` variants.
- Images use `.image`, `%image`, and `--height-image` where appropriate; assets use `pic_` and `ico_` prefixes.
- Icon masks use `--mask-image` and `currentColor`, on the `::before` or `::after` of their element.
- Menus retain `.menu`, `li.submenu`, `ul.sub-menu` and `li.active` plus required IDs/ARIA hooks.
- Forms, modals, vendor hooks, and JavaScript contracts remain intact.
- Card titles, text, labels, and read-more links follow the `.title`, `.text`, `.content`, `.caption`/`.label`, and `.link` roles above; headings remain unclassed.
- Responsive rules use existing mixins; explicit typography uses `rem()` for controls and `px` for non-control/content elements.
- Block JavaScript is bound and scoped to its parent.
- `build/*` was not edited manually.
- `npm run styles` succeeds after SCSS changes, and `git diff --check` is clean.

## References

- [CSS_BOX article](https://toniievych.medium.com/css-box-a-better-way-to-organize-css-on-large-projects-88b72841a4f6)
- [CSS_BOX discussion](https://www.reddit.com/r/css/comments/1apomz1/css_box_a_better_way_to_write_css/)
