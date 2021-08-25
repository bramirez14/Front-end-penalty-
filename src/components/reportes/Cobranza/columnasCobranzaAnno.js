import { numberWithCommas } from "../helpers/funciones";

export const columnasCobranzasAnno=[
    { title: "Vendedor", dataIndex: "vendedor", key: "vendedor",width:120, render:(state, file)=><h5>{ file.vendedor}</h5> },
    { title: "Año", dataIndex: "ano", key: "ano",width:100, render:(state, file)=><h5>{file.ano }</h5>},
    { title: "Mes", dataIndex: "mes", key: "mes",width:100, render:(state, file)=><h5>{file.mes }</h5> },
    { title: "Cliente", dataIndex: "cliente", key: "cliente",width:100, render:(state, file)=><h5>{ file.cliente}</h5> },
    { title: "Razon Social", dataIndex: "razonsoc", key: "razonsoc",width:140, render:(state, file)=><h5>{file.razonsoc }</h5> },
    { title: "Cobranza", dataIndex: "cobranza", key: "cobranza",width:120, render:(state, file)=><h5>${ numberWithCommas(file.cobranza)}</h5> },
    { title: "Comision", dataIndex: "comision", key: "comision",width:100, render:(state, file)=><h5>${ numberWithCommas(file.comision) }</h5> },
]