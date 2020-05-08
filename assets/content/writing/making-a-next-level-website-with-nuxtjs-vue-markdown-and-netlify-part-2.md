---
title: Making a next-level website with Nuxt.js/Vue, Markdown, and Netlify - Part 2
date: 2020-05-04T00:00:00.000Z
description: Set up your Nuxt.js site to use Markdown
---

Following on from [Part 1](/writing/making-a-next-level-website-with-nuxtjs-vue-markdown-and-netlify-part-1)
, let's get Markdown working with Nuxt.js. We're going to be doing a simple setup with just a few steps:

1. Set up frontmatter-markdown-loader
2. Create a barebones post page
3. Create a barebones writing index page
4. (optional) Set up routing for static site generation

First, let's talk about something.

## Is this a CMS?

Well, only sort of. As mentioned in [Part 1](/writing/making-a-next-level-website-with-nuxtjs-vue-markdown-and-netlify-part-1), we are using source control as our database, effectively making GitHub our CMS. However, typically a CMS will allow you to publish and make changes to a website from the website itself, as well as allowing multiple users to add content. You could technically do this with GitHub, but it's not really designed for that.

If you look back at [past versions](https://5e8df7af6feba60006ed9e96--henryjin-dev.netlify.app/) of this site, you will see that I actually had installed [Netlify CMS](https://www.netlifycms.org/) which provides the functionality mentioned while still using GitHub as a database. You can see it on that old version simply by going to `/admin`. I eventually decided to strip it out for two reasons.

1. I had no need for additional users to be able to publish on my site (for now), and
2. The site was running slower than I wanted it, so I wanted to get rid of additional scripts.

I wish had a nice web-based interface for publishing posts from my iPad, but other than that I don't miss it, as this is a single-user website, and I am happy for now to write my Markdown in VSCode.

Ok, let's get to implementation!

## Set up frontmatter-markdown-loader

To read our Markdown and convert it into HTML, I am using the [frontmatter-markdown-loader](https://github.com/hmsk/frontmatter-markdown-loader#readme) package, which takes the [front-matter](https://github.com/jxson/front-matter) and [markdown-it](https://github.com/markdown-it/markdown-it) packages and bundles them into a webpack loader for us. Installation is as simple as:

```powershell
npm i -D frontmatter-markdown-loader
```

From there, go to your `nuxt.config.js` and add the following:

```js
build: {
  extend(config, ctx) {
    // add markdownit-loader
    config.module.rules.push({
      test: /\.md/,
      loader: 'frontmatter-markdown-loader'
    });
  }
},
```

For those unfamiliar with webpack, this simply tells webpack to load all files which meet the `test` condition with the specified loader. In this case, we specify a RegExp which specified all files with the extention `.md`. This allows webpack to know how to load our Markdown files.

At this point, go ahead and create a test Markdown file. For an example, see my old [test file](https://github.com/henryjin3/henryjin-dev/commit/3d05d036e02ae6c2dc11356d7e8e463c803b85a9#diff-cbee00e6159e872b7ea2991d3d86958f). You'll note that I have some basic FrontMatter with three attributes, and then a bunch of test text. I put this file in `assets\content\writing`, but you can change this location.

Let's get to creating a basic post page so we can see it in action!

## Create a Post Page

In your `pages` folder, create a new `writing` folder. This folder will hold both your post list page and your post page. Creating the `writing` folder lets Nuxt know how to set up routing for these pages.

In this folder, create a `_writing.vue` file. In the template section, add the following:

```html
<template>
  <article>
    <h1>{{ title }}</h1>
    <!-- eslint-disable-next-line -->
    <div class="content" v-html="post" />
  </article>
</template>
<script>
```

We are just showing the title from FrontMatter and then the `post`, which is a variable that we will set up in the script section, see below:

```js
<script>
export default {
  async asyncData({ params }) {
    const markdown = await require(`~/assets/content/writing/${params.writing}.md`);
    return {
      post: markdown.html,
      title: markdown.attributes.title
    };
  }
};
</script>
```

Here, we pull the appropriate Markdown file. Thanks to the loader, it has already had the FrontMatter processed and HTML generated, so all we need to do is pull out that information and make it accessible to the template.

Note that the URL setup here is assumed to be `<your website>/writing/<your post>`. If you have a different you wish to have, adjust accordingly.

At this point, you should be able to see your post! Go check it out! We still don't have a way to access a list of pages, though, so let's set that up once you're ready.

## Create a Barebones Writing Index Page

In the same `writing` folder, create an `index.vue` page. This is the page that will load when you go to `<your website>/writing`.

Before we start writing code, let's think through what we need to happen. We want to:

1. Load a list of all our posts,
2. Link to each of our posts with correct routing, and
3. Sort the list by date descending (most recent first).

To do that, let's start with the script section.

```js
export default {
  async asyncData() {
    const path = require('path');
    const context = await require.context(
      '~/assets/content/writing',
      true,
      /\.md$/
    );
```

First, let's pull all of the Markdown files in our `writing` folder. Again, since we have `frontmatter-markdown-loader` set up, this loads these files with FrontMatter and Markdown already processed, although we will only be using the FrontMatter here.

```js
const posts = await context.keys().map((key) => {
  const pathStr = key.replace('.md', '').replace('./', '');
  return {
    ...context(key),
    path: `/writing/${path.basename(key, '.md')}`
  };
});
```

Next, we need to generate our path strings for each post. To do this, we take the file name, remove file extensions and unneeded slashes, and then generate the path needed by adding it to the end of `/writing/`.

```js
    return { posts: posts.sort(
      //sort by date in descending order
      (a, b) => new Date(b.attributes.date) - new Date(a.attributes.date)
    )};
  }
};
```

Finally, we use the date attribute from FrontMatter and sort it in descending order. Note that we are returning the whole collection of posts to end our `asyncData` function. As such, we will use `v-for` to generate an item for each of our posts.

```html
<template>
  <div>
    writing index
    <section>
      <ol>
        <li v-for="post in posts" :key="post.attributes.title">
          <nuxt-link :to="post.path">
            {{ post.attributes.title }}
          </nuxt-link>
        </li>
      </ol>
    </section>
  </div>
</template>
```

This is a fairly straightforward usage. You will note that we are using `nuxt-link` elements to do our linking. You could use standard anchor elements, but since we are using Nuxt.js we can use `nuxt-link` to enable smart prefetching, improving our site's responsiveness. You can read more at the [docs](https://nuxtjs.org/api/components-nuxt-link/).

Once you're done, you should see something like [this](https://5e8df7af6feba60006ed9e96--henryjin-dev.netlify.app/writing/). Great job! Add your own styling, and you now have a functional blog!

## (optional) Set up Routing for Static Site Generation

If you are following this guide from [Part 1](/writing/making-a-next-level-website-with-nuxtjs-vue-markdown-and-netlify-part-1) and using [Static Site Generation](https://nuxtjs.org/guide/commands#static-generated-deployment-pre-rendered-), then you'll need to add the following to `nuxt.config.js`:

```js
generate: {
  routes() {
    const fs = require('fs');
    return fs.readdirSync('./assets/content/writing').map((file) => {
      return {
        route: `/writing/${path.parse(file).name}`
      };
    });
  }
}
```

This allows the `npm run generate` command to know how to generate pages based on the `.md` files in our `content` folder and not just on the `.vue` pages in our `pages` folder. Without this, the site will work in dev or SSR mode, but the `generate` script will fail to generate the appropriate pages for our static site.

## Review

So, what did we accomplish?

1. We set up Nuxt.js to load Markdown files with FrontMatter,
2. Created a barebones post page, and
3. Created a barebones post index page.

Congratulations! You are well on your way to having your own personal site with Nuxt.js/Vue, Markdown, and Netlify. Now all you need to do is style it and get some real content onto your site. Go for it!

### Errata

There are a few things I wanted to explain here in greater detail for anyone curious.

First, our post filenames are doubling as slugs which are used to generate the routing for the pages. You could do this by using FrontMatter and specifying a `slug` attribute, but I felt that this was more clear, especially considering that our source control serves as our database. You can easily generate slugs as you write posts by using [Slugify](https://blog.tersmitten.nl/slugify/).

Also, images and media can't easily be accessed in the `assets` folder due to webpack not parsing the markdown at time of site generation. If you look at the [Nuxt documentation](https://nuxtjs.org/guide/assets/), you'll see that webpack is both parsing `.vue` file templates as well as renaming image files; however, this is not happening with our `.md` files. I am currently just using the `static` folder instead for images. It looks like this issue has been resolved [here](https://github.com/hmsk/frontmatter-markdown-loader/pull/74), but this requires me to use the Vue component mode, which leads to another issue&hellip;

If you look at the `frontmatter-markdown-loader` [documentation](https://hmsk.github.io/frontmatter-markdown-loader/), you might notice that it has an option to directly generate a Vue component instead of just normal HTML. Well, I've tried it several times, and it keeps giving me strange errors like "Call stack size exceeded". I think I must just be using it improperly, so it's on the back-burner to try it again. **Update: this is now resolved, see [article](using-frontmatter-markdown-loader-with-nuxtjs-in-vue-component-mode) for details.**

Finally, if you're familiar with Nuxt.js static site generation, you'll know there's an option to include a payload, which will lower site generation time. Since we are not making any calls to external sources, there is not much room for improvement, but we could lower build and deployment time by implementing that as well.
