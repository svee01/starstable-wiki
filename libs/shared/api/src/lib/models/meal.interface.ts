import { Id } from './id.type';

export enum MealSort {
    Breakfast = 'breakfast',
    Lunch = 'lunch',
    Dinner = 'dinner',
    Other = 'other'
}

type User = string;

export interface IMeal {
    id: Id;
    title: string;
    description: string;
    isVega: boolean;
    dateServed: Date;
    sort: MealSort;
    cook: User;
}

export type ICreateMeal = Pick<
    IMeal,
    'title' | 'description' | 'sort' | 'cook'
>;
export type IUpdateMeal = Partial<Omit<IMeal, 'id'>>;
export type IUpsertMeal = IMeal;