export function add(a: number, b: number): number {
  return a + b;
}

export type jugador={
  nombre:string|null
  puntos:number
}

export function changeplayer(number:number,arr:jugador[]){
  if(number<arr.length&&number>=0)return number++;
  else return 0
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  let num=0
  let jugadores=0
  while(true){
  const pregunta:string|null=prompt("Cuantos jugadores: ")
  if(pregunta!=null)jugadores+=parseInt(pregunta)
  const pregunta2:string|null=prompt("Cuantas preguntas: ")
  if(pregunta2!=null)num+=parseInt(pregunta2)
  num*=jugadores
  if(num>=49||jugadores>3){
    console.log("Numero de preguntas o jugadores excedido")
  }else break;
  }
  const ace:jugador[]=[]
  for(let i=0;i<jugadores;i++){
    const temp:jugador={
      nombre:prompt("Nombre: "),
      puntos:0
    }
    ace.push(temp)
  }

  fetch("https://opentdb.com/api.php?amount="+num.toString+"&category=23&difficulty=medium&type=boolean").then((res)=>{res.json().then((res)=>{
    let cont=0
    let currentplayer=-1
    console.log("1 Es verdadero, 2 es falso")
    res.results.forEach((i:any)=>{
      currentplayer=changeplayer(currentplayer,ace)
      console.log(i.question)
      let respuesta:string|null=null
      while(true){
        if(respuesta=="1"){
          respuesta="True"
          break;
        }else if(respuesta=="2"){
          respuesta="False"
          break;
        }else respuesta=prompt("Respuesta: ")
      }
      if(respuesta===i.correct_answer){
        cont++
        console.log("Has acertado")
      }else{
        console.log("Has fallado")
      }
    }) 
    console.log("Has acerrtado "+cont)
  })})
}