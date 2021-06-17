export const restaFechas = (f1,f2)=>
{
var aFecha1 = f1.split('/');
var aFecha2 = f2.split('/');
var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
var dif = fFecha2 - fFecha1;
var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
return dias;
}

export const run = (date) => {
    /**SEPARAMOS EL DATO QUE VIENE DE LA BASE DE DATOS  */
    let separacion = date.split(" ");
    let posicion1 = separacion[0]; // FECHA INGRESADA
    let fecha = new Date().toLocaleDateString();//FECHA ACTUAL
     /**CALCULANDO LA DIFERENCIA DE LAS FECHAS */
    let dias = restaFechas(posicion1, fecha)
   let resultDias;
   if(dias>7){
    resultDias = dias>14? `${Math.round(dias/7)} semanas` : `${Math.round(dias/7)} semana`
   }else{
    resultDias = dias>1 ? `${ dias } dias ` : `${dias} dia`
   }
   
    let posicion2 = separacion[1]; // HORA
    /**SEPARACION EN ARRAY */
    let arrayPosicion1 = posicion1.split('/');
    let arrayPosicion2 = posicion2.split(':');

   
    let tiempo = new Date().toLocaleTimeString();
    let arrayTiempoActual = tiempo.split(':')
    

    /**SECTOR HORAS  */
    let H1 = parseInt(arrayTiempoActual[0]);
    let H2 = parseInt(arrayPosicion2[0]);
    /**SECTOR MINUTOS */
    let M1 = parseInt(arrayTiempoActual[1]);
    let M2 = parseInt(arrayPosicion2[1]);
    /**SECTOR SEGUNDOS */
    let S1 = parseInt(arrayTiempoActual[2]);
    let S2 = parseInt(arrayPosicion2[2]);
    let Ht = 0;
    let Mt = 0;
    let St = 0;
   
    /**SEGUNDOS */
    if (S1 < S2) {
      S1 = 60 + S1;
      St = S1 - S2;
      M1 = M1 - 1;
    } else {
      St = S1 - S2;
    }
    /**MINUTOS */
    if (M1 < M2) {
      M1 = M1 + 60;
      Mt = M1 - M2;
      H1 = H1 - 1;
    } else {
      Mt = M1 - M2;
    }
    /**HORAS */
    if(H1<H2){
      Ht = (H1 - H2)+24;
    }else{
      Ht=H1-H2
    }
 /*    console.log(Ht + 'HORAS');
    console.log(Mt + 'MINUTOS');
    console.log(St + 'SEGUNDOS');
    console.log(resultDias); */
    if (resultDias === '0 dia'){
      console.log('vamos a lograrlo');
   if(Ht===0){
     
       return Mt>1? `${Mt} minutos`: `${Mt} minuto`}
      return Ht>1? `${Ht} horas`:`${Ht} hora`
      }else{ return resultDias}
  };