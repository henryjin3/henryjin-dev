<template>
  <v-container fluid>
    <article>
      <h1>{{ title }}</h1>
      <!-- eslint-disable-next-line -->
      <p>{{ description }}</p>
      <div class="article" v-html="post" />
    </article>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'Henry Writing | ' + this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ]
    };
  },
  async asyncData({ params }) {
    const rawFile = await import(
      `~/assets/content/writing/${params.writing}/${params.writing}.md`
    );
    const fm = require('front-matter')(rawFile.default);

    const highlighter = await require('shiki').getHighlighter({
      theme: 'Material-Theme-Palenight'
    });

    const md = require('markdown-it')({
      html: true,
      highlight: (code, lang) => {
        return highlighter.codeToHtml(code, lang);
      }
    });
    let html = md.render(fm.body);

    //from https://github.com/hmsk/frontmatter-markdown-loader/blob/master/index.js
    // const stringify = (src) =>
    //   JSON.stringify(src)
    //     .replace(/\u2028/g, '\\u2028')
    //     .replace(/\u2029/g, '\\u2029');
    // fm.attributes = stringify(fm.attributes);
    // html = stringify(html);

    return {
      post: html,
      title: fm.attributes.title,
      description: fm.attributes.description
    };
  }
};
</script>

<style>
.article {
  color: #a7a9be;
}
h1 {
  color: orange;
}
.article h2,
h3 {
  color: #fffffe;
}
</style>
