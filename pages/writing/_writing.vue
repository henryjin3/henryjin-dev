<template>
  <v-container>
    <article>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <component :is="post"></component>
    </article>
  </v-container>
</template>

<script>
import '~/assets/css/prism-vsc-dark-plus.css';

export default {
  data() {
    return {
      post: null,
      title: null,
      seoTitle: null,
      description: null,
      prettyDateString: null
    };
  },
  head() {
    return {
      title: this.seoTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        },
        {
          property: 'og:title',
          content: this.title
        },
        {
          property: 'og:description',
          content: this.description
        },
        {
          property: 'og:url',
          content: `https://henryjin.dev${this.$route.path}`
        },
        {
          property: 'og:type',
          content: 'article'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:domain',
          value: 'henryjin.dev'
        },
        {
          name: 'twitter:creator',
          value: 'https://twitter.com/henryjin'
        },
        {
          name: 'twitter:label1',
          value: 'Published on'
        },
        {
          name: 'twitter:data1',
          value: this.prettyDateString
        },
        {
          name: 'twitter:label2',
          value: 'Reading Time'
        },
        {
          name: 'twitter:data2',
          value: '5 minutes'
        }
      ]
    };
  },
  created() {
    const markdown = require(`~/assets/content/writing/${this.$route.params.writing}.md`);

    this.post = markdown.vue.component;
    this.title = markdown.attributes.title;
    this.seoTitle = 'Henry Writing | ' + this.title;
    this.description = markdown.attributes.description;
    this.prettyDateString = new Date(
      markdown.attributes.date
    ).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};
</script>

<style>
.markdown-body {
  color: #a7a9be;
}
h1 {
  color: orange;
}
.markdown-body h2,
h3 {
  color: #fffffe;
}
img {
  /* make images resize with screen width */
  display: block;
  max-width: 100%;
  height: auto;

  /* center images */
  margin-left: auto;
  margin-right: auto;
}
</style>
