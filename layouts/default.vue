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
        // @ts-ignore
        this.onResize();
      });

      // @ts-ignore
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
          // @ts-ignore
          this.isMobile = true;
        } else {
          // @ts-ignore
          this.isMobile = false;
        }

        // @ts-ignore
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
    width: 100%;
  }

  .vuetable-body-wrapper {
    overflow: scroll;
  }

  .vuetable {
    min-width: 100%;

    .vuetable-body {
      tr {
        &:nth-child(2n - 1) {
          background-color: #f5f5f5;
        }

        td {
          color: #000000;
          font-size: 14px;
          letter-spacing: 0;
          line-height: 19px;
          padding: 7px 30px;
        }
      }
    }

    th,
    td {
      padding: 20px 15px;
    }

    th {
      color: #000000;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 19px;
      font-weight: 600;
      position: relative;
      padding-right: 25px;

      &.sortable {
        .sort-icon {
          font-style: normal;
          position: absolute !important;
          right: 15px;
          top: 39%;
          transform: rotate(90deg) translateY(-50%);

          &::after {
            content: 'code';
            font-family: Material Icons, Arial, Verdana, Tahoma, sans-serif;
            display: block;
          }
        }
      }

      &.sorted-desc {
        .sort-icon {
          transform: translateY(-50%);
          top: 52%;
          right: 5px;

          &::after {
            content: 'keyboard_arrow_down';
          }
        }
      }

      &.sorted-asc {
        .sort-icon {
          transform: translateY(-50%);
          top: 52%;
          right: 5px;

          &::after {
            content: 'keyboard_arrow_up';
          }
        }
      }
    }
  }
</style>
