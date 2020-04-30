<template>
  <v-container fluid>
    <h1 class="intro_title">Welcome.</h1>
    <v-row>
      <v-col cols="12" sm="6">
        <v-img src="profile.png" alt="Henry Jin" max-width="400px"></v-img>
      </v-col>
      <v-col class="intro_text" cols="12" sm="6">
        <p>
          I'm Henry Jin, a full stack developer and software consultant from the
          US.
        </p>
      </v-col>
    </v-row>
    <div class="intro_text">
      <h2>Software</h2>
      <p>
        My primary areas of experience are with C# backends, JavaScript
        frontends (React, Vue.js), and SQL databases.
      </p>
      <p>
        That said, I'm a generalist and I have also dabbled in the following:
      </p>
      <ul>
        <li>Azure DevOps and SDLC best practices</li>
        <li>Project Leadership and Management</li>
        <li>Cloud infrastructure</li>
        <li>Machine Learning</li>
      </ul>
      <br />
      <p>
        I also did a stint as a middle school math teacher, teaching low-income
        and at-risk children in the Houston area.
      </p>
      <h2>Demos</h2>
      <p>
        Machine learning in action! See the
        <a href="/demo/mnist"> Handwriting Recognizer</a>.
      </p>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'about',
  head() {
    return {
      title: 'About Henry'
    };
  }
};
</script>

<style scoped>
.v-image {
  border-radius: 15%;
}
.intro_title {
  font-size: 2rem;
  text-align: center;
  color: #f25f4c;
}
.intro_text p,
li {
  color: #a7a9be;
}
.intro_text h2 {
  color: orange;
}
</style>
