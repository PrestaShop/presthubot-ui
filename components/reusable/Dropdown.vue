<template>
  <div class="dropdown" :class="opened ? 'opened' : 'closed'">
    <button class="btn" @click="toggle">{{ text }}</button>
    <i class="material-icons" v-if="!opened">keyboard_arrow_down</i>
    <i class="material-icons" v-else>keyboard_arrow_up</i>
    <div class="dropdown-content" v-if="opened">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { DropdownStates } from '~/interfaces/DropdownInterface';

  export default Vue.extend({
    props: {
      text: {
        type: String,
        required: true,
        default: '',
      },
      keyName: {
        type: String,
        required: true,
        default: '',
      },
    },
    data(): DropdownStates {
      return {
        opened: false,
      };
    },
    mounted() {
      // Forced to do this as these checkboxes are in slots
      this.$parent.$on('uncheckAll', () => {
        console.log('Dropdown uncheck');
        this.$emit('uncheckAll');
      });
    },
    methods: {
      toggle(): void {
        this.opened = !this.opened;
      },
    },
  });
</script>

<style lang="scss">
  .dropdown {
    position: relative;
    width: 100%;
    min-width: 160px;

    .checkbox {
      width: 100%;
      margin: 0;

      label {
        font-size: 12px;
        font-weight: normal;
      }
    }

    .btn {
      box-sizing: border-box;
      border: 1px solid #b3c7cd;
      border-radius: 3px;
      background-color: #ffffff;
      justify-content: flex-start;
      text-align: left;
      padding: 10px 18px;
      padding-right: 36px;
      width: 100%;
      color: #000000;
      font-size: 14px;
      letter-spacing: 0;
      min-height: 38px;
      color: $primary;
    }

    i {
      font-size: 20px;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }

    &.opened {
      .btn {
        border-bottom: none;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    &-content {
      position: absolute;
      top: 100%;
      background: $white;
      box-sizing: border-box;
      border: 1px solid #b3c7cd;
      border-radius: 3px;
      min-width: 100%;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &-item {
      padding: 10px 0;
      font-size: 14px;
    }
  }
</style>
