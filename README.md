# The isalog theme

*isalog is a dark Jekyll theme for blogs, forked from the Cayman theme. You can [use it today](#usage) for your Jekyll blog.*

## Usage

To use the isalog theme:

1. Add the following to your site's `_config.yml`:

    ```yml
    remote_theme: your-username/isalog-theme
    plugins:
    - jekyll-remote-theme # add this line to the plugins list if you already have one
    ```

2. Optionally, if you'd like to preview your site on your computer, add the following to your site's `Gemfile`:

    ```ruby
    gem "github-pages", group: :jekyll_plugins
    ```

## Customizing

### Configuration variables

isalog will respect the following variables, if set in your site's `_config.yml`:

```yml
title: [The title of your site]
description: [A short description of your site's purpose]
```

Additionally, you may choose to set the following optional variables:

```yml
show_downloads: ["true" or "false" (unquoted) to indicate whether to provide a download URL]
google_analytics: [Your Google Analytics tracking ID]
```

### Stylesheet

If you'd like to add your own custom styles:

1. Create a file called `/assets/css/style.scss` in your site
2. Add the following content to the top of the file, exactly as shown:
    ```scss
    ---
    ---

    @import "jekyll-theme-isalog";
    ```
3. Add any custom CSS (or Sass, including imports) you'd like immediately after the `@import` line

*Note: If you'd like to change the theme's Sass variables, you must set new values before the `@import` line in your stylesheet.*

### Color customization

The theme uses these main color variables that you can override:

```scss
// Headers
$header-bg-color: #1a252f;
$header-bg-color-secondary: #2c3e50;

// Text
$body-text-color: #e0e0e0;
$body-link-color: #64b5f6;
$section-headings-color: #64b5f6;

// Code
$code-bg-color: #37474f;
$code-text-color: #e8eaf6;
```

### Layouts

If you'd like to change the theme's HTML layout:

1. For some changes such as a custom `favicon`, you can add custom files in your local `_includes` folder.
2. For more extensive changes, copy the original template from the theme's repository
3. Create a file called `/_layouts/default.html` in your site
4. Paste the default layout content and customize as needed

### Customizing Google Analytics code

Google has released several iterations to their Google Analytics code over the years. If you would like to take advantage of the latest code, paste it into `_includes/head-custom-google-analytics.html` in your Jekyll site.

## Previewing the theme locally

If you'd like to preview the theme locally:

1. Clone down the theme's repository
2. `cd` into the theme's directory
3. Run `script/bootstrap` to install the necessary dependencies
4. Run `bundle exec jekyll serve` to start the preview server
5. Visit [`localhost:4000`](http://localhost:4000) in your browser to preview the theme

## Credits

This theme is a fork of the [Cayman theme](https://github.com/pages-themes/cayman) by Jason Long and GitHub, Inc. The original Cayman theme is licensed under CC0-1.0.

### Changes from Cayman
- Converted to dark theme with professional color palette
- Updated to use modern Japanese fonts (Kosugi and Zen Maru Gothic)
- Integrated Base16 Solarized Dark syntax highlighting
- Enhanced for blog-focused layouts and typography

## License

This theme inherits the CC0-1.0 license from the original Cayman theme.