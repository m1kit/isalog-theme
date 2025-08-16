---
layout: post
title: "Getting Started with the islog Dark Theme"
date: 2024-01-15 10:30:00 +0000
author: "Theme Developer"
tags: [jekyll, theme, dark-mode, tutorial]
---

Welcome to **islog**, a modern dark theme for Jekyll blogs! This post demonstrates the beautiful typography and code highlighting capabilities of this theme.

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

## Conclusion

The islog theme provides a comprehensive dark blogging experience with modern typography, excellent code highlighting, and thoughtful design details. Whether you're writing technical tutorials, personal reflections, or creative content, this theme will present your work beautifully.

Ready to start blogging with islog? Check out the documentation in the README file for setup instructions!