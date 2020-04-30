<template>
  <v-footer>
    <v-row no-gutters align="center">
      <v-col class="pa-2">
        <strong>&copy;{{ new Date().getFullYear() }}</strong
        ><br />
        <n-link to="/">
          Henry Jin
        </n-link>
      </v-col>
      <v-col class="pa-2">
        <strong> Social</strong><br />
        <a href="https://www.linkedin.com/in/henry-jin/">LinkedIn</a>
        /
        <a href="https://github.com/henryjin3">Github</a>
      </v-col>
      <v-col class="pa-2">
        <a href="https://github.com/henryjin3/henryjin-dev">
          <v-icon>{{ githubIcon }}</v-icon>
        </a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mdiGithub } from '@mdi/js';

export default {
  name: 'Footer',
  data() {
    return {
      githubIcon: mdiGithub
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: underline;
  color: white;
}
</style>
