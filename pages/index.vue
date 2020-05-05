<template>
  <v-container fluid fill-height fill-width class="fade-in">
    <v-layout justify-center column>
      <div class="title greeting">Hello, my name is Henry.</div>
      <div class="display-3">
        <span>I make</span>
        <div class="rw-words">
          <span>software</span>
          <span>apps</span>
          <span>C#</span>
          <span>JavaScript</span>
        </div>
        <br />
        <p>better.</p>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'Henry Jin, Full Stack Developer',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Hello, my name is Henry. I make software better.'
        }
      ]
    };
  }
};
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

/* word rotator */
.rw-words span {
  animation: topToBottom 12.5s linear infinite 0s;
  position: absolute;
  width: 100%;
  opacity: 0;
}
.rw-words span:nth-child(2) {
  animation-delay: 3s;
}
.rw-words span:nth-child(3) {
  animation-delay: 6s;
}
.rw-words span:nth-child(4) {
  animation-delay: 9s;
}
@keyframes topToBottom {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 0;
    transform: translateY(-25px);
  }
  10% {
    opacity: 1;
    transform: translateY(0px);
  }
  25% {
    opacity: 1;
    transform: translateY(0px);
  }
  30% {
    opacity: 0;
    transform: translateY(50px);
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
