<template>
  <div class="pull-requests">
    <div class="top-container">
      <div class="top-container-content">
        <h2 class="top-container-title">Select PR inputs to start:</h2>
        <div class="top-container-toolbar">
          <button class="btn btn-outline">
            <i class="material-icons">close</i>
            Clear
          </button>
        </div>

        <div class="top-container-checkboxes">
          <checkbox text="Creating date" keyName="creation_date" />
          <checkbox text="Title" keyName="title" />
          <checkbox text="Creating date" keyName="creation_date" />
          <checkbox text="Creating date" keyName="creation_date" />
          <checkbox text="Creating date" keyName="creation_date" />
          <checkbox text="Creating date" keyName="creation_date" />
          <checkbox text="Creating date" keyName="creation_date" />
          <checkbox text="Creating date" keyName="creation_date" />
          <checkbox text="Creating date" keyName="creation_date" />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Checkbox from '~/components/reusable/Checkbox';
  // import allPrs from '~/graphql/queries/pullrequests';

  export default Vue.extend({
    /* apollo: {
      allPrs: {
        prefetch: true,
        query: allPrs,
      },
    }, */
    components: {
      Checkbox,
    },
  });
</script>

<style lang="scss">
  .container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 60px;
    margin-top: -75px;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }

  .top-container {
    & &-title {
      color: #ffffff;
      font-size: 16px;
      letter-spacing: 0;
      line-height: 22px;
      text-align: center;
      font-weight: 600;
    }

    & &-toolbar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    & &-checkboxes {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      margin: -5px -15px;
      margin-top: 15px;
    }
  }
</style>
