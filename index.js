
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