function laCajaDePandora(numero) {
  if (Number.isInteger(numero)) {
    if (numero % 2 === 0) {
      // Número par, convertir a binario
      return numero.toString(2);
    } else {
      // Número impar, convertir a hexadecimal
      return numero.toString(16);
    }
  } else {
    return 'Debe ingresar un número entero.';
  }
}
