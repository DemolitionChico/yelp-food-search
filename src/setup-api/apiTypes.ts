export interface APISearchParams {
    term?: string;
    location: string;
    radius: number;
    //categories is a string concat of categories divided by ','
    //"cat1,cat2,cat3"
    categories?: string;
    open_now?: boolean;
    limit: number;
    offset?:number;
}