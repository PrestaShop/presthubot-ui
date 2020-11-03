export interface CheckBoxStates {
  checked: boolean;
}

export interface CheckboxInterface {
  checked?: boolean;
  keyName: string;
  sortField?: string;
  items?: Array<string>;
}

export interface SearchInterface {
  field: CheckboxInterface;
  value: string;
}
