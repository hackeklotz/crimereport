export interface IStoreState {
    day: string;
    crimes: ICrime[];
}

export interface ICrime {
    id: number;
    time: string;
    place: string;
    title: string;
    text: string
}