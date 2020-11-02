<template>
  <div class="pull-requests">
    <div class="top-container">
      <div class="top-container-content">
        <h2 class="top-container-title">Select PR inputs to start:</h2>
        <div class="top-container-toolbar">
          <button class="btn btn-outline" @click="clear()">
            <i class="material-icons">close</i>
            Clear
          </button>
        </div>

        <div class="top-container-checkboxes">
          <checkbox
            v-for="field in fields"
            :key="field.keyName"
            :text="field.title"
            @checkboxUpdate="updateCheckboxes"
            :key-name="field.keyName"
          />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="content">
        <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="checkboxes.length > 0 ? checkboxes : fields"
          :data="datas"
          :data-manager="dataManager"
        >
          <template slot="tableHeader">
            <vuetable-row-header></vuetable-row-header>
          </template>
        </vuetable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import _ from 'lodash';
  import Vuetable from 'vuetable-2';
  import VuetableRowHeader from 'vuetable-2/src/components/VuetableRowHeader.vue';
  import Checkbox from '~/components/reusable/Checkbox.vue';
  import { CheckboxInterface } from '~/interfaces/CheckboxInterface';
  import { QueryController } from '~/interfaces/QueryInterface';
  import fields from '~/constants/fields.json';
  import datas from '~/constants/datas.json';
  // import allPrs from '~/graphql/queries/pullrequests';

  export default Vue.extend({
    /* apollo: {
      allPrs: {
        prefetch: true,
        query: allPrs,
      },
    }, */
    data(): QueryController {
      return {
        checkboxes: [],
        fields,
        headers: [],
        datas: {
          data: datas,
        },
        perPage: 16,
      };
    },
    components: {
      Checkbox,
      Vuetable,
      VuetableRowHeader,
    },
    methods: {
      updateCheckboxes(checkbox: CheckboxInterface): void {
        const containCheckbox = this.checkboxes.filter(
          item => item.keyName === checkbox.keyName
        );

        if (containCheckbox.length > 0) {
          this.checkboxes = this.checkboxes.filter(
            item => item.keyName !== checkbox.keyName
          );

          this.headers = this.headers.filter(item => checkbox.keyName !== item);
        } else if (checkbox.checked) {
          const newCheckBox = checkbox;

          newCheckBox.sortField = newCheckBox.keyName;
          this.checkboxes.push(newCheckBox);
          this.headers.push(newCheckBox.keyName);
        }
      },
      clear(): void {
        this.checkboxes = [];
        this.$emit('uncheckAll');
      },
      dataManager(sortOrder: any): any {
        if (this.datas.data.length < 1) return;

        let local = this.datas.data;

        // sortOrder can be empty, so we have to check for that as well
        if (sortOrder.length > 0) {
          local = _.orderBy(
            local,
            sortOrder[0].sortField,
            sortOrder[0].direction
          );
        }

        // eslint-disable-next-line
        return {
          data: local,
        };
      },
    },
  });
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 60px;
    margin-top: -75px;
    margin-bottom: 50px;
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
