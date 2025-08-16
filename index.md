---
layout: default
---

# Welcome to islog

This is a dark, modern Jekyll theme designed for blogs with excellent typography and readability.

## Recent Posts

{% if site.posts.size > 0 %}
  <div class="post-list">
    {% for post in site.posts limit:5 %}
      <article class="post-item">
        <h3 class="post-title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <div class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: "%B %d, %Y" }}
          </time>
          {% if post.author %}
            <span class="post-author">by {{ post.author }}</span>
          {% endif %}
        </div>
        {% if post.excerpt %}
          <div class="post-excerpt">
            {{ post.excerpt | strip_html | truncatewords: 30 }}
          </div>
        {% endif %}
        <div class="post-tags">
          {% for tag in post.tags limit:3 %}
            <a href="/tags/{{ tag | slugify }}/" class="tag">{{ tag }}</a>
          {% endfor %}
        </div>
      </article>
    {% endfor %}
  </div>

  {% if site.posts.size > 5 %}
    <div class="view-all-posts">
      <a href="/archive" class="btn-link">View All Posts →</a>
    </div>
  {% endif %}
{% else %}
  <div class="no-posts">
    <p>No posts yet. Create your first post in the <code>_posts</code> directory.</p>
    <p>Posts should be named with the format: <code>YYYY-MM-DD-title.md</code></p>
  </div>
{% endif %}

## About

This theme features:

- **Dark theme** with professional color palette
- **Modern typography** using Open Sans and Japanese fonts
- **Syntax highlighting** with Solarized Dark theme
- **Responsive design** that works on all devices
- **Clean, readable layout** focused on content