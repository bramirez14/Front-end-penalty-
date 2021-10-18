export const filtroNumVendedores =(N) =>{
  const number=parseInt(N);
  return (number>=900 && number<=1000)

}
export const numeroConComa = (x) =>{ 
  const valorNumerico = parseFloat(x).toFixed(2)
  const valor= valorNumerico.replace('.', ',');
  return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}