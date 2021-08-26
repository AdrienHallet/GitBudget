import {AppData, ID} from './app-data.model';

export const CATEGORY_ID = ID;
export const CATEGORY_NAME = 'name';
export class Category extends AppData {
  [CATEGORY_NAME]: string;
}
