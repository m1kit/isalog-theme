# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name          = "jekyll-theme-isalog"
  s.version       = "1.0.0"
  s.license       = "CC0-1.0"
  s.authors       = ["m1kit", "Jason Long", "GitHub, Inc."]
  s.email         = ["me@mikit.dev"]
  s.homepage      = "https://isalog.mikit.dev"
  s.summary       = "isalog is a dark Jekyll theme for blogs"

  s.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^((_includes|_layouts|_sass|assets)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  s.required_ruby_version = ">= 2.4.0"

  s.platform = Gem::Platform::RUBY
  s.add_runtime_dependency "jekyll", "~> 3.10.0"
  s.add_runtime_dependency "jekyll-seo-tag", "2.8.0"
  s.add_development_dependency "html-proofer", "~> 3.0"
  s.add_development_dependency "rubocop-github", "~> 0.16"
  s.add_development_dependency "w3c_validators", "~> 1.3"
end
