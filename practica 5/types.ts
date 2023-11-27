export type Usuario={
    nombre:string,
    correoElectronico:string,
    id:string,
    coleccioncomics:coleccioncomics
}

export type coleccioncomics={
    nombre:string,
    id:string,
    comics:comic[]
}

export type comic={
    titulo:string,
    id:string,
    descripcion:string,
    formato:string
}