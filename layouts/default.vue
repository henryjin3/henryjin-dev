<template>
  <div id="app">
    <Navbar />

    <nuxt />
    <Footer />
  </div>
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
