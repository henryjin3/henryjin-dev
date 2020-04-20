<template>
  <div>
    <ol>
      <li v-for="post in posts" :key="post.attributes.title" cols="12" md="6">
        <div height="100%">
          <div>
            <nuxt-link :to="post.path">
              {{ post.attributes.title }}
            </nuxt-link>
          </div>
          <div>
            {{ post.attributes.description }}
          </div>
        </div>
      </li>
    </ol>
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
    return {
      posts: posts.sort(
        //sort by date in descending order
        (a, b) => new Date(b.attributes.date) - new Date(a.attributes.date)
      )
    };
  }
};
</script>

<style scoped></style>
