<template>
  <footer>
    <div no-gutters align="center">
      <p class="pa-2">
        <strong>&copy;{{ new Date().getFullYear() }}</strong
        ><br />
        <a href="https://henryjin.dev">
          Henry Jin
        </a>
      </p>
      <p class="pa-2">
        <strong> Social</strong><br />
        <a href="https://www.linkedin.com/in/henry-jin/">LinkedIn</a>
        /
        <a href="https://github.com/henryjin3">Github</a>
      </p>
      <p class="pa-2">
        <a href="https://github.com/henryjin3/henryjin-dev">
          <v-icon>{{ githubIcon }}</v-icon>
        </a>
      </p>
    </div>
  </footer>
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
