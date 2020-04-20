<template>
  <article>
    <h1>{{ title }}</h1>
    <!-- eslint-disable-next-line -->
    <div class="content" v-html="post" />
  </article>
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
.content {
  color: #a7a9be;
}
h2 {
  color: red;
}
</style>
