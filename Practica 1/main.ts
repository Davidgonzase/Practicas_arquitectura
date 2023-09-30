//Space seed

//1 Creacion de tipo pasajero
export type pasajero={
  origen?:string
  nombre?:string
  altura:number
  edad:number
  peso:number
  genero:string 
  //This Side of Paradise
  //1 Modificacion del tipo
  infectado:boolean
}

//2 Creacion de tipo nave
interface nave{
  peso:number
  dimensiones:number[]
  velocidad_curvatura:number
  listado_pasajeros:pasajero[]
}

//This Side of Paradise funciones

export const are_infectados = function(list:pasajero[]){
  return list.some(i=> i.infectado)
}

export const all_healthy = function(list:pasajero[]){
  return list.every(i=> !i.infectado)
}

export const find_infected = function(list:pasajero[]){
  const pas = list.find(i=>i.infectado)
  pas? console.log("infectado: "+Object.values(pas)) : console.log("No hay nadide infectado")
}

if (import.meta.main) {
  //3 creacion de variable de la enterprise
  let enterprise:nave={
    peso:4000000000000,
    dimensiones:[289,127],
    velocidad_curvatura:0.73,
    listado_pasajeros:[
      {
        origen:"Humano",
        nombre:"Jonathan Archer",
        altura:170,
        edad:40,
        peso:70,
        genero:"Hombre",
        infectado:false
      },
      {
        origen:"Humano",
        nombre:"Spok",
        altura:180,
        edad:30,
        peso:65,
        genero:"Hombre", 
        infectado:true
      },{
        origen:"Humano",
        nombre:"Rachel Garrett",
        altura:165,
        edad:33,
        peso:55,
        genero:"Mujer",
        infectado: true
      },{
        altura:200,
        edad:150,
        peso:80,
        genero:"Cosa",
        infectado: false
      },{
        origen:"Vampiro",
        nombre:"Dio Brando",
        altura:200,
        edad:120,
        peso:120,
        genero:"Homosexual",
        infectado: false
      }
    ]
  }
  //4 Datos de los tripulantes con nombres
  console.log("Tripulantes con nombre:")
  enterprise.listado_pasajeros.forEach(i=>Object.keys(i).find(e=>e==="nombre")&&console.log(Object.values(i)))

  //This Side of Paradise
  //1 Tripulantes infectados
  console.log("Tripulantes no infectados:")
  enterprise.listado_pasajeros.forEach(i=>!i.infectado&&console.log(Object.values(i)))
  //2 pruebas de some every y find
  //Prueba de función
  console.log(are_infectados(enterprise.listado_pasajeros)? "Hay alguien infectado":"No hay nadie infectado")
  console.log(all_healthy(enterprise.listado_pasajeros)? "Todos sanos":"Algun infectado")
  find_infected(enterprise.listado_pasajeros)

  //The City on the Edge of Forever
  //1 Listado de fechas con filter asumo numeros no validos como numeros negativos
  let calendario:number[]=[2100,2265,3125,-300,-3,-18540,2023,150001]
  let calenval = calendario.filter(i=> i>=0)
  console.log(calenval)
  //2 
  let mes=calenval.map(i=> i*12)
  let dia=calenval.map(i=> i*365)
  let hora=calenval.map(i=> i*365*24)
  let minuto=calenval.map(i=> i*365*24*60)
  let segundo=calenval.map(i=> i*365*24*60*60)
  for(let i=0;i<calenval.length;i++){
    console.log("Año "+calenval[i]+",Mes "+mes[i]+",Hora "+hora[i]+",Minuto "+minuto[i]+",Segundo "+segundo[i])
  }

  //The Trouble with Tribbles
  //1
  //[daño,numero de tribbles]
  let damtrib:number[][]=[[2,1],[1,10],[35,12],[70,2],[8,1],[5,28]]
  //Num total tribbles en dañ>20
  console.log("Total de tribbles con mas de 20 de daño: "+damtrib.reduce((x,e)=>e[0]>=20? x+e[1]:x ,0))
  //Señal lisa
  console.log("Señal lisa: "+damtrib.flat())
  //Señal de peligro
  console.log("Señales de peligro: "+damtrib.flatMap(x=>x[1]/(x[0]*0.5)>=1? "Peligro":"No hay peligro"))
}