import React,{useContext} from "react";
import { UserContext } from "../../contexto/UserContext";
import "./css/vistaImg.css";
export const VistaImg = ({
  data,
  handleDelete,
  fecha,
  categoria,
  importe,
  notas,
  pago,
  medio,
}) => {
const {open} = useContext(UserContext)

console.log(open);

  return (
    <div className={!open?'vista-imagenes':'vista-imagenes-active'}>
      <div className="vista-img">
        <div className="custom-file-preview ">
          {data?.length === 0 ? (
            <h2 style={{ marginLeft: "170px", marginTop: "170px" }}>Imagen</h2>
          ) : (
            <div
              className="prev-img"
            >
              <span className="prev-img" onClick={handleDelete}>
                &times;
              </span>
              <img src={data[0].src} />
            </div>
          )}
        </div>
      </div>
      <div className="vista-datos">
        <h5>
          {" "}
          Fecha: <span className="sp">{fecha}</span>
        </h5>
        <h5>
          {" "}
          Categoria: <span className="sp">{categoria}</span>
        </h5>
        <h5>
          {" "}
          {medio} <span className="sp">{pago}</span>
        </h5>
        <h5>
          {" "}
          Importe: <span className="sp">{importe}</span>
        </h5>
        <h5 className="h5">
          {" "}
          Nota: <p className="overflow-visible">{notas}</p>{" "}
        </h5>
      </div>
    </div>
  );
};
