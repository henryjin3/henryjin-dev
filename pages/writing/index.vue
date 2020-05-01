<template>
  <v-container fluid align-center>
    <v-row dense>
      <v-col
        v-for="post in posts"
        :key="post.attributes.title"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card height="100%">
          <v-card-title>
            <n-link :to="post.path">
              {{ post.attributes.title }}
            </n-link>
          </v-card-title>
          <v-card-subtitle>
            {{ post.prettyDateString }}
          </v-card-subtitle>
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
      posts: posts
        .map((post) => {
          return {
            ...post,
            //add in the pretty date
            prettyDateString: new Date(post.attributes.date).toLocaleDateString(
              undefined,
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }
            )
          };
        })
        .sort(
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
