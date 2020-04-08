<template>
  <v-tabs grow>
    <v-tab><nuxt-link to="/">HJ</nuxt-link></v-tab>
    <v-tab><nuxt-link to="/about">about</nuxt-link></v-tab>
    <v-tab><nuxt-link to="/writing">writing</nuxt-link></v-tab>
    <v-spacer />
    <v-btn v-for="(item, i) in items" :key="i" icon :to="item.to">
      <v-icon> {{ item.icon }}</v-icon>
    </v-btn>
  </v-tabs>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Inspire',
          to: '/inspire'
        }
      ]
    };
  }
};
</script>

<style scoped></style>
