export class Task {
    id:number;
    fundName:{
        id:number,
        name:string
    };
    owner:{
        id:number,
        name:string
    };
    frequency:{
        id:number,
        name:string
    };;
    comment:string;
    status:string;
}