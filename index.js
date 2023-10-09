function laCajaDePandora(numero){
    if (numero % 2 === 0) {
        return numero.toString(2); 
    } else {
        return numero.toString(16); 
    }
}

function addUser(){
    return {
        nombre: "Sofia",
        edad: 19,
        nacionalidad: "Argentina"
    };
}