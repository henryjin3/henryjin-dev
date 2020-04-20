<template>
  <div id="hfeed layout">
    <Header />
    <div class="main container">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/header';
import Footer from '../components/footer';

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
body {
  overflow-x: hidden;
  transition: color 0.2s ease-out, background-color 0.2s ease-out;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  min-height: 100vh;
  position: relative;

  .header,
  .footer {
    flex: none;
  }

  .main {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;

    &::after {
      content: '';
      display: block;
      height: 0px;
      visibility: hidden;
    }
  }
}

.container {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  max-width: $container-max-width;

  &--narrow {
    max-width: $container-narrow-max-width;
  }
}

a {
  text-decoration: none;
}
</style>
