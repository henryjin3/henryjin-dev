<template>
  <v-container fluid>
    <article>
      <h1>{{ title }}</h1>
      <!-- eslint-disable-next-line -->
      <div class="article" v-html="post" />
    </article>
  </v-container>
</template>

<script>
export default {
  async asyncData({ params }) {
    const markdown = await require(`~/assets/content/writing/${params.writing}/${params.writing}.md`);
    return {
      post: markdown.html,
      title: markdown.attributes.title
    };
  }
};
</script>

<style>
.article {
  color: #a7a9be;
}
.article h2,
h3 {
  color: #fffffe;
}
</style>
