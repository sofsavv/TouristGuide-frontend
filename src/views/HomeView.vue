<template>
  <div class="home">

      <div class="link-container">
          <button class="btn btn-primary" @click="openReadingPlatform">Open Reading Platform</button>
      </div>

      <div v-if="!isLoggedIn" class="login-form">
          <LoginPage @user-logged-in="handleUserLoggedIn" />
      </div>
  </div>
</template>

<script>
import LoginPage from "@/views/LoginPage.vue";

export default {
  name: 'HomeView',
    components:{
      LoginPage
    },
    data() {
        return {
            isLoggedIn: false,
        };
    },
    methods: {
        openReadingPlatform() {
            window.open('/#/main', '_blank');
        },
        handleUserLoggedIn() {
            this.isLoggedIn = true;
        },
    },
    mounted() {
        this.$root.$on('user-logged-in', this.handleUserLoggedIn);
    },
    beforeDestroy() {
        this.$root.$off('user-logged-in', this.handleUserLoggedIn);
    }
}
</script>

<style>
</style>
