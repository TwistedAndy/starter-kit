# CSS_BOX Starter Kit

A starter kit for the HTML, CSS and JavaScript of a site, written with the CSS_BOX approach. You lay out the pages of a
site here, as static HTML. Then the styles and the scripts move into a WordPress theme built on
[Twee](https://github.com/TwistedAndy/wp-theme), which keeps the same folders and the same rules.

The approach is described in this article:
[CSS_BOX: A better way to organize CSS on large projects](https://toniievych.medium.com/css-box-a-better-way-to-organize-css-on-large-projects-88b72841a4f6).

## The approach in short

- Every section of a page is a box: an element with one class that ends in `_box`, such as `.media_box`.
- Each box has one stylesheet, `styles/blocks/media.scss`, and all its styles are under `.media_box`.
- The elements inside a box have short classes, such as `.title`, `.items`, `.item` and `.button`.
- A box takes `is_*` and `has_*` modifiers, such as `.is_dark` or `.has_no_top`. An inner element takes
  `<element>_<modifier>`, such as `.button_outline`, and plain states, such as `.active`.
- Colors, sizes and spacing are CSS custom properties, declared in `styles/includes/properties.scss`.
- Behavior is written in small modules, one for each box, with `Twee.addModule()`.

[AGENTS.md](AGENTS.md) has the full set of rules, with examples. Read it before you add a section, a class or a
property. It is written for people and for AI agents.

## Folders

All the files of the kit are in the `template` folder:

| Path | Holds |
| --- | --- |
| `index.html` | A sample page with the header, a heading, a media section and the footer. |
| `styles/includes/` | The breakpoints, functions and mixins, and the custom properties. |
| `styles/base/` | The fonts, the reset, the form fields, the page layout, the section modifiers and the global classes. |
| `styles/elements/` | The Sass placeholders that boxes extend, such as `%image` or `%button_outline`. |
| `styles/blocks/` | One stylesheet for each box. |
| `styles/theme.scss` | The stylesheet that joins all the files above into `build/theme.css`. |
| `scripts/` | The loader, `app.js`, and the modules. They are joined into `build/scripts.js`. |
| `plugins/` | The libraries: jQuery, Embla Carousel and Bigger Picture. |
| `images/` | The images, `pic_*`, and the icons, `ico_*`. |
| `build/` | The built files. Do not edit them by hand. |

## Installation

Install [Node.js](https://nodejs.org/) 16 or newer. Then clone the repository and install the packages in the
`template` folder:

```bash
cd template
npm install
```

## Commands

Run these in the `template` folder:

| Command | Does |
| --- | --- |
| `npm run watch` | Builds the styles and the scripts again on each change. |
| `npm run styles` | Builds `build/theme.css`. |
| `npm run scripts` | Builds `build/scripts.js`. |
| `npm run imagemin` | Compresses the images in `images`. It needs `imagemin-cli`, installed globally. |
| `npm run svgo` | Minifies the SVG icons in `images`. It needs `svgo`, installed globally. |

The paths of the folders are set in `gulpfile.js`.

## Adding a section

1. Look for an existing box that is close to the design, and reuse it with a modifier where you can.
2. Write its markup in `index.html`, or in a new page, with one `_box` class on the section.
3. Add its styles in `styles/blocks/<name>.scss`, under `.<name>_box`.
4. Add a module in `scripts/<name>.js` only if the section has behavior.
5. Run `npm run styles`, and check the page on a desktop, a tablet and a phone.

## Moving to WordPress

The Twee theme has the same `styles` and `scripts` folders in `assets`. Copy the files of a section there. The theme
builds a stylesheet for each box, and loads it only on the pages that show that box.

## About

Author: Andrii Toniievych

Contact: [toniyevych@gmail.com](mailto:toniyevych@gmail.com)

Feel free to contact me if you have any questions.

## License

The starter kit is released under the [MIT License](LICENSE).
