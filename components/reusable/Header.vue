<template>
  <div class="header">
    <Menu />
    <img src="logo-presthubot.png" title="Logo Presthubot" />
    <logo />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Logo from './Logo.vue';
  import Menu from './Menu.vue';

  export default Vue.extend({
    components: {
      Logo,
      Menu,
    },
  });
</script>

<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    width: 100%;
    background: $primary;
    z-index: 10;
    min-height: 50px;
    transition: 0.4s ease-out;
    padding: 30px 60px;

    @at-root .isMobile & {
      padding: 0 15px;
    }

    h1 {
      color: white;
      font-size: 20px;
      font-weight: bold;
      width: 100%;
      max-width: 430px;
      text-align: center;
    }
  }
</style>
