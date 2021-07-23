

export const TodosGastos=(data) => {
const N = localStorage.getItem("N"); // numero de registro
const getGastos =data
const gastosSinAnt= getGastos.filter(d=>d.sinAnticipo=== "sin" && d.listo==='Si');
const gastosConAnt= getGastos.filter(d=>d.sinAnticipo!== "sin");
let usuariosConAnt;
let usuariosSinAnt;
/**Sector 901  */
if(N==='901'){
   usuariosSinAnt= gastosSinAnt.filter( d=> d.usuario.departamentoId === 1 || d.usuario.departamentoId === 2)
   usuariosConAnt= gastosConAnt.filter( d=> d.usuario.departamentoId === 1 || d.usuario.departamentoId === 2)
}
if(N==='902'){
    usuariosSinAnt= gastosSinAnt.filter( d=> d.usuario.departamentoId === 5 || d.estado === "aprobado")
    usuariosConAnt= gastosConAnt.filter( d=> d.usuario.departamentoId === 5 || d.estado === "aprobado")
}
if(N==='903'){ 
    usuariosSinAnt= gastosSinAnt.filter( d=> d.usuario.departamentoId === 4 || d.usuario.departamentoId === 3)
   usuariosConAnt= gastosConAnt.filter( d=> d.usuario.departamentoId === 4 || d.usuario.departamentoId === 3)
}
const gastoTotal= [...usuariosSinAnt,...usuariosConAnt]

return gastoTotal
}

