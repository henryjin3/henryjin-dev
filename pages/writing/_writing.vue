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
