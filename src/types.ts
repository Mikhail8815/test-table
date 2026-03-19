import type {Dayjs} from "dayjs";

export interface TableItem {
    id: string;
    name: string;
    date: string;
    value: number;
}

export interface FormValues {
    name: string;
    date: Dayjs;
    value: number;
}