import { CheckboxInterface } from './CheckBoxInterface';
import { PullRequestInterface } from './PullRequestInterface';

export interface DataManager {
  data: Array<PullRequestInterface>;
}

export interface QueryController {
  checkboxes: Array<CheckboxInterface>;
  fields: Array<CheckboxInterface>;
  datas: DataManager;
  perPage: number;
}
