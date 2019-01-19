export interface IStoreState {
    day: string;
    reportId: number;
    crimes: ICrime[];
}

export interface ICrime {
    id: number;
    time: string;
    place: string;
    title: string;
    message: string
}