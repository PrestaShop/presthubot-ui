import { CheckboxInterface, SearchInterface } from './CheckBoxInterface';
import { PullRequestInterface } from './PullRequestInterface';

export interface DataManager {
  data: Array<PullRequestInterface>;
}

export interface QueryController {
  checkboxes: Array<CheckboxInterface>;
  fields: Array<CheckboxInterface>;
  datas: DataManager;
  baseDatas: DataManager;
  perPage: number;
  headers: Array<String>;
  filesTypes: Array<String>;
  search: Map<string, SearchInterface>;
}
