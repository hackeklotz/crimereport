export interface IStoreState {
    allReportIds: string[];
    currentReport: IReport;
}

export interface IReport {
    id: string;
    year: number;
    number: number;
    crimes: ICrime[];
}

export interface ICrime {
    id: number;
    time: string;
    place: string;
    title: string;
    message: string;
    coordinate: [number, number];
    highlight: boolean;
}