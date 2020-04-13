<template>
  <v-container fluid fill-height fill-width class="home-hero fade-in">
    <v-layout justify-center column>
      <div class="title greeting">Hello, my name is Henry.</div>
      <div class="display-3">
        I make technology work
        <p>better.</p>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.greeting {
  color: #f25f4c;
}
p {
  color: orange;
}
.fade-in {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000;
  animation: fadeInUp 0.5s ease;
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
