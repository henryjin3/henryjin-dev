<template>
  <v-app dark>
    <v-app-bar fixed app>
      <Navbar />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <p class="footer__item">
        <strong>&copy;2020</strong><br />
        <a class="p-name u-url" rel="me" href="henryjin.dev">
          Henry Jin
        </a>
      </p>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from './navbar';

export default {
  components: {
    Navbar
  }
};
</script>
