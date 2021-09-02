import {AppData, ID} from './app-data.model';
import * as currency from 'currency.js';

export const TRANSACTION_ID = ID;
export const TRANSACTION_NAME = 'name';
export const TRANSACTION_DATE = 'date';
export const TRANSACTION_VALUE = 'value';
export const TRANSACTION_CATEGORY_ID = 'categoryId';
export class Transaction extends AppData {
  [TRANSACTION_NAME]: string;
  [TRANSACTION_DATE]: Date;
  [TRANSACTION_VALUE]: currency;
  [TRANSACTION_CATEGORY_ID]: number;
}
