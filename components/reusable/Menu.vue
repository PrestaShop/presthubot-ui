<template>
  <ul class="menu" :class="{ column }">
    <li :key="item.id" v-for="item in items" class="menu-item">
      <nuxt-link :to="item.route" class="menu-link">
        <icon :iconName="item.icon" />
        {{ item.name }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
  import MenuItems from '~/constants/menu.json';
  import Icon from '~/components/reusable/Icon';

  export default {
    components: {
      Icon,
    },
    data() {
      return {
        items: MenuItems,
      };
    },
    props: {
      column: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="scss">
  .menu {
    display: flex;
    align-items: center;
    padding: 0;

    &.column {
      flex-direction: column;
      align-items: flex-start;

      .menu {
        &-link {
          color: white;
        }
      }
    }

    &-item {
      list-style-type: none;

      &:first-child {
        a {
          margin-left: 0;
        }
      }

      &:last-child {
        a {
          margin-right: 0;
        }
      }

      .icon {
        fill: white;
        height: 17px;
        width: 17px;
        margin-right: 5px;
      }
    }

    &-link {
      text-decoration: none;
      padding: 7.5px 0;
      font-weight: bold;
      color: $white;
      font-size: 14px;
      line-height: 22px;
      opacity: 0.6;
      position: relative;
      margin: 0 12px;
      display: flex;
      align-items: center;
      font-weight: normal;

      &.nuxt-link-exact-active {
        opacity: 1;
        font-weight: bold;

        &::after {
          content: '';
          height: 2px;
          width: 100%;
          background: white;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }

      > * {
        vertical-align: middle;
        line-height: 22px;
        margin-top: -2px;
      }
    }
  }
</style>
