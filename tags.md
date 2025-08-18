---
layout: default
title: "All Tags"
permalink: /tags/
---

# All Tags

Explore posts by topic.

{% assign tags = site.tags | sort %}
{% for tag in tags %}
  <h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
  <ul class="post-list">
    {% for post in tag[1] %}
      <li>
        <h3>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

<div class="tags-navigation">
  <a href="{{ '/' | relative_url }}" class="btn-link">← Back to Home</a>
</div>