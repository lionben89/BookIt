export interface NavbarState{
    optionEnabled:string,
}

export interface ContextState{
    navbar:NavbarState,
}

export interface MyBooks{
    id:number,
    ownerId:number,
    pickupLocationId:number,
    ISBN:string,
    visible:boolean,
    generationId:number,
    brorowerId:number,
    startTime:Date,
}