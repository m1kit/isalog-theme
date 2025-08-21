---
layout: post
title: "Blog Features Showcase - isalog Theme Components"
date: 2024-01-25 16:00:00 +0000
author: "Theme Developer"
tags: [showcase, features, components, demo]
---

This post demonstrates all the advanced blog features and components available in the isalog theme. Each component is designed to work seamlessly with the dark theme aesthetic while providing enhanced functionality for content creators.

## 📸 Enhanced Images

The theme provides beautiful image handling with captions and hover effects:

{% include image.html src="/assets/images/snow_mountain.jpg" alt="Beautiful Snow Mountain in Hokkaido, Japan" caption="Stunning winter landscape from Hokkaido, Japan - showcasing how the theme handles landscape photography with elegant styling and responsive behavior." %}

### Responsive Images with Srcset

The theme also supports responsive images using srcset for optimized loading across different screen sizes:

{% include imageset.html src="snow_mountain" alt="Beautiful Snow Mountain with Responsive Loading" caption="Same beautiful mountain landscape, but now with responsive srcset loading - automatically serves appropriately sized images for small (480w), medium (800w), and large (1200w) screens." %}

{% include imageset.html src="37whkk1g" small=1 alt="Yet another snow mountain." %}

## 🚨 Alert Components

Use different alert types to highlight important information throughout your posts:

{% include alert.html type="info" title="Pro Tip" content="Use alerts to draw attention to important information, tips, or side notes that enhance your content without disrupting the reading flow." %}

{% include alert.html type="warning" title="Important Notice" content="This is a warning alert for highlighting important notices, breaking changes, or information that requires special attention from readers." %}

{% include alert.html type="success" title="Success Story" content="Perfect for highlighting achievements, successful implementations, or positive outcomes. Great for tutorials and case studies." %}

{% include alert.html type="danger" title="Critical Warning" content="Use danger alerts for critical issues, security warnings, or information that could cause problems if ignored. Handle with care!" %}

## 🔗 Link Previews

Create rich, card-style previews for external links:

{% include link-preview.html 
   url="https://jekyllrb.com" 
   title="Jekyll • Simple, blog-aware, static sites" 
   description="Transform your plain text into static websites and blogs. Simple, static site generator that's perfect for GitHub Pages and other static hosting solutions." 
%}

{% include link-preview.html 
   url="https://sass-lang.com" 
   title="Sass: Syntactically Awesome Style Sheets" 
   description="Sass is the most mature, stable, and powerful professional grade CSS extension language in the world. Used extensively in the isalog theme." 
%}

{% include link-preview.html 
   url="https://docs.github.com/pages" 
   title="GitHub Pages Documentation" 
   description="Learn how to create a website directly from a GitHub repository. Perfect hosting solution for Jekyll sites and the isalog theme." 
%}

## 🎥 Video Embeds

Embed videos with responsive containers (examples with placeholder URLs):

### YouTube video embed
{% include video.html 
   src="https://youtube.com/watch?v=vmH9-a0BhTY" 
   title="Jekyll Tutorial: Getting Started with Static Sites" %}

### Vimeo video embed  
{% include video.html 
   src="https://vimeo.com/19" 
   title="Advanced Jekyll Techniques" %}
