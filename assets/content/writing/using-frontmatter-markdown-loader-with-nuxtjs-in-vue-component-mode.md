---
title: Using frontmatter-markdown-loader with Nuxt.js in Vue component mode
date: 2020-05-08T00:00:00.000Z
description: A quick update to the site allows for a few more options.
---

As I mentioned in my [previous post](/writing/making-a-next-level-website-with-nuxtjs-vue-markdown-and-netlify-part-2), I was having trouble using [frontmatter-markdown-loader](https://github.com/hmsk/frontmatter-markdown-loader#readme) with Vue component mode. Every time I tried, I would get errors like "Cannot stringify a function render" and "Call stack size exceeded."

I searched the repository issue history and eventually found the answer, which is that Nuxt's `asyncData` function cannot be used with Vue component mode, because the `asyncData` function tries to stringify every property returned, and Vue component mode returns functions as a part of the component returned. The solution for now is to use the normal `data` function and then set up properties in `created`. Replace `asyncData` with the following:

```js
data() {
  return {
    post: null,
    title: null,
    description: null
  };
},
created() {
  const markdown = require(`~/assets/content/writing/${this.$route.params.writing}.md`);

  this.post = markdown.vue.component;
  this.title = markdown.attributes.title;
  this.description = markdown.attributes.description;
}
```

And in your `nuxt.config.js`, update the following:

```js
import FMMode from 'frontmatter-markdown-loader/mode';
```

```js
config.module.rules.push({
  test: /\.md/,
  loader: 'frontmatter-markdown-loader',
  options: {
    mode: [FMMode.VUE_COMPONENT],
    vue: {
      root: 'markdown-body'
    }
  }
});
```

You don't need to set the `vue` property if you don't want to set a class on the wrapper of your code elements, but I found it helpful for styling purposes.

## Issue #2&mdash;Handlebars Templates

After I set this up, I found that there was another issue where code blocks that contained handlebars templates would actually try to read them as if they were Vue template code. For example:

```html
{{ post.attributes.date }}
```

This would fail as attributes was not yet defined. I logged an [issue](https://github.com/hmsk/frontmatter-markdown-loader/issues/154) and [hmsk](https://github.com/hmsk) resolved it within just two days, allowing me to publish this now. Thanks, hmsk!

## Moving Images to the Assets Folder

Now that Vue component mode is working, image URLs in my Markdown files are also getting transformed by webpack, so I can simply change the reference from my static folder:

```md
![nuxt-setup](/media/nuxt-setup.png)
```

To my assets folder:

```md
![nuxt-setup](~/assets/content/writing/making-a-next-level-website-with-nuxtjs-vue-markdown-and-netlify-part-1/nuxt-setup.png)
```

This not only allows me to organize my images closer to the articles that they are used in, but makes it possible to use something like [nuxt-responsive-loader](https://github.com/geeogi/nuxt-responsive-loader#readme) to automatically generate and use different sizes of images within my Markdown-based posts.
