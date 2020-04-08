<template>
  <v-tabs grow color="orange base">
    <v-tab><nuxt-link to="/">HJ</nuxt-link></v-tab>
    <v-spacer />
    <v-tab><nuxt-link to="/about">about</nuxt-link></v-tab>
    <v-tab><nuxt-link to="/writing">writing</nuxt-link></v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>

<style scoped>
a {
  color: grey;
}
</style>
