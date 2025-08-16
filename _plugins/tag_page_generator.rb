# frozen_string_literal: true

module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? "tag"
        dir = site.config["tag_dir"] || "tags"
        site.tags.each_key do |tag|
          site.pages << TagPage.new(site, site.source, File.join(dir, tag), tag)
        end
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir  = dir
      @name = "index.html"

      process(@name)
      read_yaml(File.join(base, "_layouts"), "tag.html")
      data["tag"] = tag
      data["title"] = "Posts tagged with \"#{tag}\""
      data["description"] = "All posts tagged with #{tag}"
    end
  end
end
