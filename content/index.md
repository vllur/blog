---
layout: post
title: Home
permalink: /
---

<nav>
  <ul>
{%- assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" -%}
{%- for year in postsByYear -%}
    <li>
      <h2>{{- year.name -}}</h2>
        <ul>
        {%- for post in year.items -%}
          <li><a href="{{- post.url | relative_url -}}">{{- post.title -}}</a></li>
        {%- endfor -%}
        </ul>
    </li>
{%- endfor -%}
  </ul>
</nav>
