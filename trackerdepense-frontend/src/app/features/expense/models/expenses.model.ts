import { Category } from "../../categories/models/category .model";

export interface Expense {
  id?: number;
  title: string;
  amount: number;
  category: Category;
  date: string;
  description?: string;
}
