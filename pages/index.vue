<template>
  <div class="home-hero fade-in">
    <div>
      <div class="title greeting">Hello, my name is Henry.</div>
      <div class="display-3">
        I make technology work
        <p>better.</p>
      </div>
    </div>
  </div>
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
