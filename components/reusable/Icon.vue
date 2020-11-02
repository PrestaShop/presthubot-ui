<template>
  <svg class="icon">
    <use :xlink:href="`#${iconName}`"></use>
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      iconName: {
        type: String,
        required: true,
        default: '',
      },
    },
  });
</script>
