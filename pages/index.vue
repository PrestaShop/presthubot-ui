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

            <tr v-if="checkboxes.length > 0">
              <td v-for="field in checkboxes" :key="field.keyName">
                <custom-input
                  type="date"
                  v-if="field.keyName === 'creation_date'"
                  classes="input-date"
                  icon="date_range"
                  :field="field"
                  @updateInput="updateInput"
                />

                <dropdown
                  v-else-if="field.keyName === 'files_types'"
                  text="Show all"
                  key-name="files_types"
                >
                  <div class="dropdown-item">
                    <checkbox
                      v-for="item in ['JS', 'PHP', 'TWIG']"
                      :key="item"
                      :text="item"
                      @checkboxUpdate="updateFilesTypes"
                      :key-name="item"
                    />
                  </div>
                </dropdown>

                <custom-input
                  type="text"
                  :field="field"
                  @updateInput="updateInput"
                  v-else
                  classes="input-search"
                />
              </td>
            </tr>

            <tr v-else>
              <td v-for="field in fields" :key="field.keyName">
                <custom-input
                  type="date"
                  v-if="field.keyName === 'creation_date'"
                  classes="input-date"
                  icon="date_range"
                  @updateInput="updateInput"
                  :field="field"
                />

                <dropdown
                  v-else-if="field.keyName === 'files_types'"
                  text="Show all"
                  key-name="files_types"
                >
                  <checkbox
                    v-for="item in field.items"
                    :key="item"
                    :text="item"
                    @checkboxUpdate="updateFilesTypes"
                    :key-name="item"
                  />
                </dropdown>

                <custom-input
                  type="text"
                  :field="field"
                  @updateInput="updateInput"
                  v-else
                  classes="input-search"
                />
              </td>
            </tr>
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
  import CustomInput from '~/components/reusable/Input.vue';
  import Dropdown from '~/components/reusable/Dropdown.vue';
  import { CheckboxInterface } from '~/interfaces/CheckboxInterface';
  import { UpdateInputInterface } from '~/interfaces/InputInterface';
  import { PullRequestInterface } from '~/interfaces/PullRequestInterface';
  import { QueryController } from '~/interfaces/QueryInterface';
  import fields from '~/constants/fields.json';
  import datas from '~/constants/datas.json';
  import EventBus from '~/components/reusable/EventBus';
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
        filesTypes: [],
        fields,
        headers: [],
        datas: {
          data: datas,
        },
        baseDatas: {
          data: datas,
        },
        search: new Map<string, UpdateInputInterface>(),
        perPage: 16,
      };
    },
    components: {
      Checkbox,
      CustomInput,
      Vuetable,
      VuetableRowHeader,
      Dropdown,
    },
    methods: {
      find(
        newDatas: Array<PullRequestInterface>,
        data: PullRequestInterface
      ): {
        isEmpty: boolean;
        newDatas: Array<PullRequestInterface>;
      } {
        let isEmpty = true;
        let skip = false;

        this.search.forEach(searchItem => {
          Object.keys(data).forEach(keyPr => {
            if (
              keyPr === searchItem.field.keyName &&
              searchItem.field.keyName !== 'files_types' &&
              searchItem.value !== '' &&
              !skip
            ) {
              if (
                // @ts-ignore
                _.includes(data[keyPr], searchItem.value) &&
                // @ts-ignore
                !_.includes(newDatas, data)
              ) {
                newDatas.push(data);
              } else if (
                // @ts-ignore
                (!_.includes(data[keyPr], searchItem.value) &&
                  // @ts-ignore
                  _.includes(newDatas, data)) ||
                skip
              ) {
                _.pull(newDatas, data);
              }

              // @ts-ignore
              if (!_.includes(data[keyPr], searchItem.value)) {
                skip = true;
              }

              isEmpty = false;
            } else if (
              keyPr === 'files_types' &&
              !skip &&
              this.filesTypes.length > 0
            ) {
              if (
                // @ts-ignore
                this.filesTypes.some(e => data[keyPr].indexOf(e) > -1) &&
                // @ts-ignore
                !_.includes(newDatas, data)
              ) {
                newDatas.push(data);
              } else if (
                // @ts-ignore
                !this.filesTypes.some(e => data[keyPr].indexOf(e) > -1) &&
                // @ts-ignore
                _.includes(newDatas, data)
              ) {
                _.pull(newDatas, data);
              }

              // @ts-ignore
              if (!this.filesTypes.some(e => data[keyPr].indexOf(e) > -1)) {
                skip = true;
              }

              isEmpty = false;
            }
          });
        });

        return { isEmpty, newDatas };
      },
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
      updateFilesTypes(checkbox: CheckboxInterface): void {
        if (
          !_.includes(this.filesTypes, checkbox.keyName) &&
          checkbox.checked
        ) {
          this.filesTypes.push(checkbox.keyName);
        } else if (!checkbox.checked) {
          _.pull(this.filesTypes, checkbox.keyName);
        }

        const inputObject = {
          field: checkbox,
          value: checkbox.keyName,
        };

        this.updateInput(inputObject);
      },
      updateInput({ field, value }: UpdateInputInterface): void {
        this.search.set(field.keyName, { field, value });
        let isEmpty = true;
        let newDatas: Array<PullRequestInterface> = [];

        if (this.datas.data.length > 0 && value !== '') {
          this.datas.data.forEach(pullRequest => {
            const { isEmpty: emptyCheck, newDatas: returnedDatas } = this.find(
              newDatas,
              pullRequest
            );

            isEmpty = emptyCheck;
            newDatas = returnedDatas;
          });
        } else if (this.datas.data.length <= 0) {
          this.baseDatas.data.forEach(pullRequest => {
            const { isEmpty: emptyCheck, newDatas: returnedDatas } = this.find(
              newDatas,
              pullRequest
            );

            isEmpty = emptyCheck;
            newDatas = returnedDatas;
          });
        }

        if (isEmpty) {
          this.datas = this.baseDatas;
        } else {
          this.datas = { data: newDatas };
        }
      },
      clear(): void {
        this.checkboxes = [];
        EventBus.$emit('uncheckAll');

        this.datas = this.baseDatas;
        this.filesTypes = [];
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
