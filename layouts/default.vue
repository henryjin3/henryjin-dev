<template>
  <v-app dark>
    <v-app-bar fixed app>
      <Nav />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <Nav />
    </v-footer>
  </v-app>
</template>

<script>
import Nav from './nav';

export default {
  components: {
    Nav
  }
};
</script>
