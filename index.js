
function laCajaDePandora(numero) {
    if (typeof numero !== 'number') {
      return 'Por favor, ingresa un número válido.';
     }
  
    if (numero % 2 === 0) {
      return numero.toString(2);
    } else {
      return numero.toString(16);
    }
  }

function getLucas() {
  return{
    nombre: 'Lucas',
    edad: '24',
    nacionalidad: 'argentino'
  }
};

function getMaxi (  ) {
  return {
    nombre: 'Maxi',
    edad: 29,
    nacionalidad: 'argentino'
   }
};

function juanUbaldi() {
  return {
    name: "juan ubaldi",
    nacionalidad: "Argentino",
    edad: "31",
  };
}

function getWilly(){
  return {
    name: 'Guillermo',
    age: 32,
    nationality: 'Argentino'
  }

}

function mateo(){
    let nombre = {
        nombre: "mateo",
        edad: 25,
        nacionalidad: "argentina"
    };
    return nombre
}

function getSofi(){
    return {
        nombre: "Sofia",
        edad: 19,
        nacionalidad: "Argentina"
    };
}

