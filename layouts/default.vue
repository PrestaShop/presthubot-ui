<template>
  <div :class="{ isMobile }">
    <svg-sprite />
    <Header :title="this.title" />
    <nuxt />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Header from '~/components/reusable/Header.vue';
  import SvgSprite from '~/components/reusable/SvgSprite.vue';
  import { LayoutStates } from '~/interfaces/LayoutInterface';

  export default Vue.extend({
    components: {
      Header,
      SvgSprite,
    },
    data(): LayoutStates {
      return {
        title: 'PresthuBot UI',
        isMobile: false,
      };
    },
    beforeMount() {
      const localConfig = localStorage.getItem('localConfig');

      if (localConfig) {
        this.$store.commit('changeLocalConfig', JSON.parse(localConfig));
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.onResize();
      });

      window.addEventListener('resize', this.onResize);
    },
    methods: {
      toggleDark(): void {
        this.$store.commit('changeLocalConfig', {
          isDark: !this.$store.state.localConfig.isDark,
        });
      },
      onResize(): boolean {
        if (window.innerWidth < 769) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }

        return this.isMobile;
      },
    },
    head() {
      return {
        bodyAttrs: {
          class: this.$store.state.localConfig.isDark ? 'dark' : 'light',
        },
      };
    },
  });
</script>

<style lang="scss">
  html {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    background: #f7f7f7;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .top-container {
    background-color: $primary;
    padding-bottom: 200px;
    margin: auto;
    padding-top: 50px;

    &-content {
      max-width: 970px;
      margin: auto;
    }
  }

  .content {
    box-sizing: border-box;
    border: 1px solid #c7c7c7;
    border-radius: 5px;
    background-color: $white;
    box-shadow: 0 0 17px 0 rgba(0, 0, 0, 0.15);
    padding: 20px 30px;
    width: 100%;
  }
</style>
