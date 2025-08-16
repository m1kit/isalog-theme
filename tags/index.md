---
layout: default
title: "All Tags"
permalink: /tags/
---

# All Tags

Explore posts by topic. Click on any tag to see all related posts.

{% comment %}
  Collect all tags from posts and count them
{% endcomment %}
{% assign tags_list = "" | split: "," %}
{% assign tag_counts = "" | split: "," %}

{% for post in site.posts %}
  {% for tag in post.tags %}
    {% unless tags_list contains tag %}
      {% assign tags_list = tags_list | push: tag %}
    {% endunless %}
  {% endfor %}
{% endfor %}

{% assign sorted_tags = tags_list | sort %}

<div class="tags-cloud">
  {% for tag in sorted_tags %}
    {% assign tag_posts = site.posts | where: "tags", tag %}
    <div class="tag-item">
      <a href="/tags/{{ tag | slugify }}/" class="tag-link">
        <span class="tag-name">{{ tag }}</span>
        <span class="tag-count">{{ tag_posts.size }}</span>
      </a>
    </div>
  {% endfor %}
</div>

## Popular Tags

<div class="popular-tags">
  {% assign all_tags = "" | split: "," %}
  {% for post in site.posts %}
    {% for tag in post.tags %}
      {% assign all_tags = all_tags | push: tag %}
    {% endfor %}
  {% endfor %}
  
  {% assign tag_frequencies = "" | split: "," %}
  {% for tag in sorted_tags %}
    {% assign tag_posts = site.posts | where: "tags", tag %}
    {% assign tag_with_count = tag | append: ":" | append: tag_posts.size %}
    {% assign tag_frequencies = tag_frequencies | push: tag_with_count %}
  {% endfor %}
  
  {% comment %} Show top 5 most used tags {% endcomment %}
  {% assign popular_tags_raw = tag_frequencies | sort %}
  {% assign popular_tags = popular_tags_raw | reverse | slice: 0, 5 %}
  
  {% for tag_data in popular_tags %}
    {% assign tag_parts = tag_data | split: ":" %}
    {% assign tag_name = tag_parts[0] %}
    {% assign tag_count = tag_parts[1] %}
    {% if tag_count > "1" %}
      <div class="popular-tag">
        <a href="/tags/{{ tag_name | slugify }}/" class="popular-tag-link">
          <span class="popular-tag-name">{{ tag_name }}</span>
          <span class="popular-tag-count">{{ tag_count }} posts</span>
          <div class="popular-tag-preview">
            {% assign sample_posts = site.posts | where: "tags", tag_name | slice: 0, 2 %}
            {% for post in sample_posts %}
              <span class="sample-post">{{ post.title }}</span>
            {% endfor %}
          </div>
        </a>
      </div>
    {% endif %}
  {% endfor %}
</div>

---

<div class="tags-navigation">
  <a href="{{ '/' | relative_url }}" class="btn-link">← Back to Home</a>
</div>