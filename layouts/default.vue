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
      <Navbar />
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
