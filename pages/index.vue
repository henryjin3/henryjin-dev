<template>
  <v-container fluid fill-height fill-width class="home-hero">
    <v-layout justify-center column>
      <div class="title greeting">Hello, my name is Henry.</div>
      <div class="display-3">
        I make technology work
        <p>better.</p>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    };
  }
};
</script>

<style scoped>
.greeting {
  color: #f25f4c;
}
p {
  color: orange;
}
</style>
