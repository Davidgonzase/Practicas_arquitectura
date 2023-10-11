//Tipo en el que guardaremos el nombre las preguntas y los puntos del jugador
export type player={
  name:string|null
  points:number
  question:question[]
}

//Tipo en el que guardaremos la pregunta, su respuesta y tipo
export type question={
  question:string
  answer:string
  type:string
}

//Con esta funcion asincrona le pediremos una serie de valores que nos dará el array con las preguntas
//Se puede configurar el numero, la categoria, dificultad, y el tipo de pregunta
export async function fetchquestions(number:number,category?:number,difficulty?:string,multiple?:string):Promise<question[]>{
  const questions:question[]=[]
  let url=`https://opentdb.com/api.php?amount=${number}`
  category? url+=(`&category=${category+9}`):null
  difficulty? url+=(`&difficulty=${difficulty}`):null
  multiple? url+=(`&type=${multiple}`):null
  console.log(url)
  //Le pedimos a la api las preguntas construyendo la url
  const data=await fetch(url)
  const json=await data.json();
  //Comprobamos si hay algun error en las preguntas
  if(json.response_code!=0){
    console.log("Problema al obtener las preguntas es posible que no existan")
    return questions;
  }
  //Componemos las preguntas y las guardamos en un Array
  json.results.forEach((i:any)=>{
    questions.push({
      question:i.question,
      answer:i.correct_answer,
      type:i.type
    })
  })
  return questions;
}

//Main principal
if (import.meta.main) {
  //Lo hago para solicitar el --allow-net que no me deja en el json no se porque
  fetchquestions(1)
  //Pedimos la cantidad de jugadores, esta no puede ser ni negativa ni mayor que el número de categorias
  let playercount=-1
  while(playercount<=0||playercount>25){
    const string = prompt("Cuantos jugadores: ")
    string? playercount=parseInt(string):playercount=-1
    if(Number.isNaN(playercount))playercount=-1;
  }
  //Pedimos la cantidad de preguntas, nunca mayor de 50
  let questioncount=-1
  while(questioncount<=0||questioncount>50){
    const string = prompt("Cuantas preguntas: ")
    string? questioncount=parseInt(string):questioncount=-1
    if(Number.isNaN(questioncount))questioncount=-1;
  }
  //Pedimos de que tipo queremos las preguntas, las de v/f son menores que las de escribir por lo que mixto funcionara bien para mas de 25 preguntas(apartado 1 extra)
  let type=-1
  let typestring:string|undefined=""
  while(type<0||type>=3){
    const string = prompt("Tipo de preguntas (0 mixto,1 multiple,2 v/f): ")
    string? type=parseInt(string):type=-1
    if(Number.isNaN(type))type=-1;
  }
  switch (type){
    case 0:
      typestring=undefined
      break;
    case 1:
      typestring="multiple"
      break;
    case 2:
      typestring="boolean"
      break;
  }
  //Componemos los jugadores
  const players:player[]=[]
  for(let i=0;i<playercount;i++){
    players.push({
      name:prompt(`Nombre del jugador ${i+1}:`),
      points:0,
      question:[]
    })
  }
  //En base al numero de preguntas componemos las preguntas
  //si es menor que el numero de categorias los jugadores tendran 1 pregunta de cada categoria hasta el numero de preguntas
  //mientras que si es mayor dde 25 se podra preguntar la dificultad 
  if(questioncount<25){
    console.log("Habrá una pregunta por categoria")
    for(let i=0;i<questioncount;i++){
      //guardamos las preguntas en cada uno de los jugadores
      const qtemp=await fetchquestions(playercount,i,undefined,typestring)
      for(let j=0;j<playercount;j++){
        players[j].question.push(qtemp[j])
      }
    }
  }else{
    console.log("Cada jugador tendra un tema distinto")
    let difficulty=-1
    let difstring:string|undefined=""
    while(difficulty<0||difficulty>=4){
      const string = prompt("Dificultad (0 mixto,1 facil,2 medio,3 dificil): ")
      string? difficulty=parseInt(string):difficulty=-1
      if(Number.isNaN(difficulty))difficulty=-1;
    }
    switch (difficulty){
      case 0:
        difstring=undefined
        break;
      case 1:
        difstring="easy"
        break;
      case 2:
        difstring="medium"
        break;
      case 3:
        difstring="hard"
        break;
      }
      //guardamos un set de preguntas a un jugador
      for(let i=0;i<playercount;i++){
        const qtemp=await fetchquestions(questioncount,i,difstring,typestring)
        players[i].question=qtemp
      }
  }
  //Aqui responderemos a las preguntas
  for(let qturn=0;qturn<questioncount;qturn++){
    for(let jturn=0;jturn<playercount;jturn++){
      //Entramos en cada turno y preguntamos
      console.log(`Turno del jugador ${jturn+1}`)
      console.log(`Pregunta: ${players[jturn].question[qturn].question}`)
      let question="Respuesta "
      players[jturn].question[qturn].type=="multiple"? question+=("(escribe la respuesta)") : question+=("1 para true, 2 para false")
      let answerin=-1
      let answer:string|null=""
      //dependiendo del tipo se comprobará la pregunta
      while(answerin<0||answerin>=2){
        const string = prompt(question)
        if(players[jturn].question[qturn].type=="multiple"){
          if(string!=""){
              answerin=1
              answer=string
          }
        }else{
          string? answerin=parseInt(string):answerin=-1
          if(Number.isNaN(answerin))answerin=-1;
          answerin--
        }
      }
      if(players[jturn].question[qturn].type!=="multiple"){
        answerin!=0? answer="Fasle":answer="True"
      }
      if(answer===players[jturn].question[qturn].answer){
        players[jturn].points++
        console.log("Has acertado")
      }else{
        console.log("Has fallado")
      }
    }
  }
  //Cogemos el valor máximo y buscamos a los jugadores con esa puntuación
  const maxpun=players.reduce((x,e)=>x>e.points? x:e.points,0)
  players.forEach(i=>i.points===maxpun&&console.log(`Enhorabuena jugador ${i.name}`))
}