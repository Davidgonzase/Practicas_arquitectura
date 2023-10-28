//Creacion del tipo para el back end
export type disco={
    Nombre:string
    Autor:string
    Formato:types 
    Matriz?:string
    Pais_de_impresion:string
    Arte_de_portada:string
    id:number
}
//Enumeracion para los valores de formato
export enum types{
    LP="LP",
    CD="CD",
    single="single",
    cassette="cassette",
    reel="real",
    minidisc="minidisc",
    videocd="videocd",
    vinilo="vinilo"
}