function laCajaDePandora(numero){
    // proximamente escribiremos codigo aqui
    return numero % 2 === 0 ? numero.toString(2) : numero.toString(6)
    }

function getWilly(){
    return {
        name: 'Guillermo',
        age: 32,
        nationality: 'Argentino'
    }
}

console.log(getWilly());