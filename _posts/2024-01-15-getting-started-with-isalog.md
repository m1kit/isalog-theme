---
layout: post
title: "Getting Started with the isalog Dark Theme"
date: 2024-01-15 10:30:00 +0000
author: "Theme Developer"
tags: [jekyll, theme, dark-mode, tutorial]
---

Welcome to **isalog**, a modern dark theme for Jekyll blogs! This post demonstrates the beautiful typography and code highlighting capabilities of this theme.

## Why Choose a Dark Theme?

Dark themes have become increasingly popular for several reasons:

- **Reduced eye strain** during long reading sessions
- **Better focus** on content with minimal distractions  
- **Modern aesthetic** that looks professional
- **Battery savings** on OLED displays

## Typography Showcase

The theme uses a carefully selected font stack:

- **Body text**: Open Sans with Kosugi fallback for Japanese characters
- **Headings**: Open Sans with Zen Maru Gothic fallback

### Different Heading Levels

# Heading 1 - Main Title
## Heading 2 - Section Header  
### Heading 3 - Subsection
#### Heading 4 - Sub-subsection
##### Heading 5 - Minor heading
###### Heading 6 - Smallest heading

## Code Highlighting Examples

The theme features beautiful Solarized Dark syntax highlighting. Here are some examples:

### JavaScript Example

```javascript
// Modern JavaScript with async/await
async function fetchBlogPosts() {
    try {
        const response = await fetch('/api/posts');
        const posts = await response.json();
        
        return posts.map(post => ({
            title: post.title,
            excerpt: post.content.substring(0, 150),
            publishedAt: new Date(post.date),
            tags: post.tags || []
        }));
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return [];
    }
}

// Usage
const posts = await fetchBlogPosts();
console.log(`Found ${posts.length} posts`);
```

### Python Example

```python
import datetime
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class BlogPost:
    title: str
    content: str
    author: str
    tags: List[str]
    published_at: datetime.datetime
    featured: bool = False
    
    def get_excerpt(self, length: int = 150) -> str:
        """Return a truncated excerpt of the post content."""
        if len(self.content) <= length:
            return self.content
        return self.content[:length].rsplit(' ', 1)[0] + '...'
    
    @classmethod
    def create_draft(cls, title: str, author: str) -> 'BlogPost':
        """Create a new draft blog post."""
        return cls(
            title=title,
            content="",
            author=author,
            tags=[],
            published_at=datetime.datetime.now(),
            featured=False
        )

# Example usage
post = BlogPost.create_draft(
    title="My New Post",
    author="John Doe"
)
print(f"Created draft: {post.title}")
```

### CSS/SCSS Example

```scss
// Theme variables
$primary-color: #64b5f6;
$background-dark: #263238;
$text-light: #e0e0e0;

.blog-post {
  background: $background-dark;
  color: $text-light;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  h1, h2, h3 {
    color: $primary-color;
    font-family: 'Open Sans', sans-serif;
  }
  
  code {
    background: rgba($primary-color, 0.1);
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
  
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
}
```

## Text Formatting

You can use various text formatting options:

- **Bold text** for emphasis
- *Italic text* for subtle emphasis  
- ~~Strikethrough~~ for corrections
- `Inline code` for technical terms
- [Links to other pages](/about/) are nicely styled

## Lists and Organization

### Unordered Lists
- First item with some longer text to show wrapping
- Second item
  - Nested item level 2
  - Another nested item
    - Even deeper nesting level 3
- Back to top level

### Ordered Lists
1. First step in the process
2. Second step with more detailed explanation
3. Final step to complete the task

## Blockquotes

> This is a blockquote that demonstrates how quoted text appears in the dark theme. The styling is subtle but readable, perfect for highlighting important quotes or citations.
>
> You can have multiple paragraphs in blockquotes as well.

## Tables

The theme also supports well-styled tables:

| Feature | Status | Notes |
|---------|--------|-------|
| Dark theme | ✅ Complete | Solarized Dark colors |
| Typography | ✅ Complete | Open Sans + Japanese fonts |
| Code highlighting | ✅ Complete | Rouge with Solarized Dark |
| Responsive design | ✅ Complete | Mobile-friendly layout |
| Blog features | ✅ Complete | Post lists, tags, metadata |

## Images and Media

The theme handles images beautifully with proper sizing and spacing. Here's how images appear:

{% include image.html src="/assets/images/snow_mountain.jpg" alt="Beautiful Snow Mountain in Hokkaido, Japan" caption="Beautiful Snow Mountain in Hokkaido, Japan - demonstrating how landscape photography appears in the isalog dark theme with enhanced styling and hover effects." %}

### Image Formatting Tips

You have two options for adding images to your posts:

**Method 1: Using the image include (recommended)**
```liquid
{% raw %}{% include image.html src="/path/to/image.jpg" alt="Alt text" caption="Caption text" %}{% endraw %}
```

**Method 2: Standard Markdown syntax**
```markdown
![Alt text](/path/to/image.jpg)
*Optional caption in italics*
```

The image include provides enhanced styling with:
- Rounded corners and subtle shadows
- Hover effects for better interactivity
- Better caption formatting and typography
- Responsive behavior and lazy loading
- Additional customization options (width, custom classes)

Images automatically scale to fit the content width and look great on both desktop and mobile devices. The dark theme's styling ensures images blend well with the overall aesthetic.

### Inline Images

You can also reference images inline within sentences. For example, when discussing ![Small icon example](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iIzY0YjVmNiIvPgo8dGV4dCB4PSIxMCIgeT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iQXJpYWwiPmk8L3RleHQ+Cjwvc3ZnPgo=) design elements, they integrate seamlessly with the text.

## Advanced Blog Features

The isalog theme includes several powerful include templates for enhanced content presentation:

### Alert Callouts

Use alerts to highlight important information:

{% include alert.html type="info" title="Information" content="This is an informational alert with useful tips and general information." %}

{% include alert.html type="warning" title="Warning" content="This is a warning alert for important notices that users should pay attention to." %}

{% include alert.html type="success" title="Success" content="This is a success alert for positive feedback and completed actions." %}

{% include alert.html type="danger" title="Danger" content="This is a danger alert for critical issues and error messages." %}

### Enhanced Code Blocks

Show code with titles and copy functionality:

```json
{
  "name": "isalog-theme",
  "version": "1.0.0",
  "description": "A beautiful dark Jekyll theme",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

```bash
#!/bin/bash
# Quick blog setup script
bundle install
npm install
bundle exec jekyll serve --host 0.0.0.0
echo "Blog is running at http://localhost:4000"
```

### Link Previews

Create rich link previews for external resources:

{% include link-preview.html 
   url="https://jekyllrb.com" 
   title="Jekyll • Simple, blog-aware, static sites" 
   description="Transform your plain text into static websites and blogs. Simple, blog-aware, static site generator perfect for GitHub Pages and other static hosting." 
%}

{% include link-preview.html 
   url="https://github.com/jekyll/jekyll" 
   title="Jekyll - Transform plain text into static websites and blogs" 
   description="A simple, blog-aware, static site generator perfect for personal, project, or organization sites. Written in Ruby by Tom Preston-Werner." 
%}

### Video Embeds

Embed videos responsively (example with placeholder):

<!-- Note: This would work with real YouTube/Vimeo URLs -->
{% include video.html src="https://youtube.com/watch?v=dQw4w9WgXcQ" title="Tutorial: Getting Started with Jekyll" %}

### Table of Contents

For longer posts, add a table of contents:

```liquid
{% raw %}{% include toc.html title="Contents" min_level="2" max_level="3" %}{% endraw %}
```

## Conclusion

The isalog theme provides a comprehensive dark blogging experience with modern typography, excellent code highlighting, image support, advanced blog features, and thoughtful design details. Whether you're writing technical tutorials, personal reflections, or creative content, this theme will present your work beautifully.

Ready to start blogging with isalog? Check out the documentation in the README file for setup instructions!