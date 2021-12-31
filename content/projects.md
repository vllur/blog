---
layout: post
title: Projects
permalink: /projects/
---

{% for project in site.projects %}
<article class="project">
  <img src="https://placekitten.com/250/250">
  <div>
    <h2><a href="#">{{ project.name }}</a></h2>
    <p class="project-tags">
    {% for tag in project.tags%}
      {{ tag }}
    {% endfor %}
    </p>

    {{ project.content | markdownify }}
  </div>
</article>
{% endfor %}
