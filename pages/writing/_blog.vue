<template>
  <article>
    <h1>{{ title }}</h1>
    <!-- eslint-disable-next-line -->
    <div class="content" v-html="post" />
  </article>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    if (payload) return { blogPost: payload };
    else {
      const markdown = await require(`~/assets/content/writing/${params.blog}/${params.blog}.md`);
      return {
        post: markdown.html,
        title: markdown.attributes.title
      };
    }
  }
};
</script>
