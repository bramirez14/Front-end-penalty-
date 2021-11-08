import moment from 'moment'


export const preparandoEvento= ( events = [] ) => {
function convertDateFormat(string) {
  var info = string.split('/');
  return info[2] + '/' + info[1] + '/' + info[0];
}
const fechasCambioDeOrden= events.map(e=>({
    ...e,
    fechaDesde: convertDateFormat(e.fechaDesde),
    fechaHasta: convertDateFormat(e.fechaHasta)
}))
    return fechasCambioDeOrden.map(
        (e) => ({
            
            title:`${e.usuario.nombre }  ${e.usuario.apellido}`,
            start:moment(e.fechaDesde).toDate(),
            end: moment(e.fechaHasta).toDate(),
        })
    );

}