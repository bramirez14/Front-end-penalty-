import { numberWithCommas } from "../helpers/funciones";

export const columnasCobranzasAnno=[
    { title: "Vendedor", dataIndex: "vendedor", key: "vendedor",lupa:true, render:(state, file)=><h5>{ file.vendedor}</h5> },
    { title: "Año", dataIndex: "ano", key: "ano", render:(state, file)=><h5>{file.ano }</h5>},
    { title: "Mes", dataIndex: "mes", key: "mes", render:(state, file)=><h5>{file.mes }</h5> },
    { title: "Cliente", dataIndex: "cliente", key: "cliente", lupa:true, render:(state, file)=><h5>{ file.cliente}</h5> },
    { title: "Razon Social", dataIndex: "razonsoc", key: "razonsoc",lupa:true, render:(state, file)=><h5>{file.razonsoc }</h5> },
    { title: "Cobranza", dataIndex: "cobranza", key: "cobranza", render:(state, file)=><h5>${ numberWithCommas(file.cobranza)}</h5> },
    { title: "Comision", dataIndex: "comision", key: "comision", render:(state, file)=><h5>${ numberWithCommas(file.comision) }</h5> },
]