import { assertEquals } from "https://deno.land/std@0.203.0/assert/mod.ts";
import { pasajero,are_infectados,all_healthy,find_infected } from "./main.ts";

//Prueba de funcionalidad de las funciones

Deno.test(function addTest() {
  let prueba_1 :pasajero[]=[{
    altura:200,
    edad:150,
    peso:80,
    genero:"Prueba1",
    infectado: false
  },]

  console.log(are_infectados(prueba_1)? "Hay alguien infectado":"No hay nadie infectado")
  console.log(all_healthy(prueba_1)? "Todos sanos":"Algun infectado")
  find_infected(prueba_1)
  
  let prueba_2 :pasajero[]=[{
    altura:200,
    edad:150,
    peso:80,
    genero:"Prueba2",
    infectado: true
  },]

  console.log(are_infectados(prueba_2)? "Hay alguien infectado":"No hay nadie infectado")
  console.log(all_healthy(prueba_2)? "Todos sanos":"Algun infectado")
  find_infected(prueba_2)
});
