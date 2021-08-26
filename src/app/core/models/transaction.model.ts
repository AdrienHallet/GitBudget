import {AppData} from './app-data.model';

export class Transaction extends AppData {
  name: string;
  date: Date;
  value: number;
  categoryId: number;
}
