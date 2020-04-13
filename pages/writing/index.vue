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

<script>
export default {
  async asyncData() {
    const context = await require.context(
      '~/assets/content/writing',
      true,
      /\.md$/
    );
    const posts = await context.keys().map((key) => {
      return {
        ...context(key),
        path: `/writing/${key.substring(
          key.lastIndexOf('/') + 1,
          key.lastIndexOf('.md')
        )}`
      };
    });
    return { posts: posts.reverse() };
  }
};
</script>
