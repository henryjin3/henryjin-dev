<template>
  <v-container fluid align-center>
    <v-row dense>
      <v-col
        v-for="post in posts"
        :key="post.attributes.title"
        cols="12"
        md="4"
      >
        <v-card height="100%">
          <v-card-title>
            <nuxt-link :to="post.path">
              {{ post.attributes.title }}
            </nuxt-link>
          </v-card-title>
          <v-card-text>
            {{ post.attributes.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'Henry | Writing',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "All of Henry's writing"
        }
      ]
    };
  },
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

<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal;
}
</style>
