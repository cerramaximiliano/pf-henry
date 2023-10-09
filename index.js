function laCajaDePandora(numero){
    if (numero % 2 == 0){
   
    return numero.toString(2).padStart(4, '0'); 
}else{
    return numero.toString(16);
}
}