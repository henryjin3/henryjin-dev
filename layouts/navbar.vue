<template>
  <v-app-bar fixed app>
    <v-tabs grow color="orange base">
      <v-tab to="/">HJ</v-tab>
      <v-spacer />
      <v-tab to="/about">about</v-tab>
      <v-tab to="/writing">writing</v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>
