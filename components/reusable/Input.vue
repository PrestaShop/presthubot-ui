<template>
  <div class="input-group">
    <i class="material-icons" v-if="type !== 'date'">{{ icon }}</i>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="value"
      :class="classes"
      class="input"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { InputInterface } from '~/interfaces/InputInterface';

  export default Vue.extend({
    data(): InputInterface {
      return {
        value: '',
      };
    },
    props: {
      type: {
        type: String,
        required: true,
      },
      field: {
        type: Object,
        required: true,
      },
      placeholder: {
        type: String,
        default: '',
      },
      classes: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: 'search',
      },
    },
    watch: {
      value(newValue): void {
        this.$emit('updateInput', {
          field: this.field,
          value: newValue,
        });
      },
    },
  });
</script>

<style lang="scss">
  .input-group {
    position: relative;

    .input {
      box-sizing: border-box;
      border: 1px solid #b3c7cd;
      border-radius: 3px;
      background-color: #ffffff;
      padding: 10px 18px;
      padding-left: 36px;
      width: 100%;
      color: #000000;
      font-size: 14px;
      letter-spacing: 0;

      &[type='date'] {
        padding: 7.5px 18px;
      }
    }

    i {
      font-size: 20px;
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
