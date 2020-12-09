# Gutenberg Block: Header with Parallax


## Usage

### Gutenberg

Add the _index.js_ and _edit.js_ files to the regular Gutenberg JavaScript structure (inside a subfolder _header-parallax_).

The Block currently doesn't support custom colours. All the pre-defined colours from the assets/settings.json file will be 
made available for selection as a gradient colour and as a text colour.

### JavaScript

- Install [jquery.parallax](https://github.com/pixelcog/parallax.js/) from npm: `npm i --save jquery-parallax.js`
- Add _parallax.js to the regular _scripts_ folder as _scripts/parallax/index.js_.
- Add the snippet from [this example code](./scripts/index.js) to _scripts/ui/index.js_.

### SCSS

- Add _sht-header-parallax.scss_ to the regular SCSS structure.

## Author

mark@sayhello.ch November 2020
