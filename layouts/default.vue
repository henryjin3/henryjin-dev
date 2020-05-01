<template>
  <v-app dark>
    <Navbar />

    <v-content>
      <nuxt />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './navbar';
import Footer from './footer';

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
a {
  text-decoration: none;
}
.v-application code {
  /* need this to get rid of some default vuetify styling */
  background-color: transparent;
  color: inherit;
}
</style>
