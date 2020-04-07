<template>
  <v-tabs grow>
    <v-tab>HJ</v-tab>
    <v-tab>About</v-tab>
    <v-tab>Writing</v-tab>
    <v-spacer />
    <v-btn icon v-for="(item, i) in items" :key="i" :to="item.to">
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-tabs>
</template>

<script>
export default {
  name: 'nav',
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ]
    };
  }
};
</script>
