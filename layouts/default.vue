<template>
  <v-app dark>
    <Navbar />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
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
</style>
