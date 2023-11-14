export type dimension={
    nombre:string
    planetas?: planeta[]
}

export type planeta={
    nombre:string
    personas?: persona[]
}

export type persona={
    nombre:string
    id:string
}

export type tardis={
    nombre:string
    type?: dimension[]
}