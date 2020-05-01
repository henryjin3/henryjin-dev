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

/* need this to get rid of some default vuetify styling, not sure why it's there? */
.v-application code {
  background-color: transparent;
  color: inherit;
  box-shadow: none;
}
.v-application code::before {
  content: none;
}
.v-application code::after {
  content: none;
}
</style>
