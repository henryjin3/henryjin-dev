<template>
  <v-container>
    <article>
      <h1>{{ title }}</h1>
      <!-- eslint-disable-next-line -->
      <p>{{ description }}</p>
      <div class="article" v-html="post" />
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
  async asyncData({ params }) {
    const markdown = await import(
      `~/assets/content/writing/${params.writing}.md`
    );

    return {
      post: markdown.html,
      title: markdown.attributes.title,
      description: markdown.attributes.description
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
