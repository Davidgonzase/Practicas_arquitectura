export type Usuario={
    nombre:string,
    correoElectronico:string,
    id:string,
    coleccion:coleccioncomics
}

export type coleccioncomics={
    nombre:string,
    id:string,
    comics:string[]
}

export type comic={
    titulo:string,
    id:string,
    descripcion:string,
    formato:string
}