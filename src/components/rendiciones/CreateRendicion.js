import React,{useState,useEffect} from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { VscNewFile} from "react-icons/vsc";
import { Input } from "../formularios/Input";

import "./css/createRendicion.css";
export const CreateRendicion = () => {
  const [highlight, setHighlight] = useState(false);
  const [data, setData] = useState([]);
  const [rendicion, setRendicion] = useState({
  item: "",
  categoria: "",
  descripcion: "",
  nota: "",
  importe: "",
  imagen:[],
 deleteId:[]
});
const {item,categoria,descripcion,notas,importe,imagen,deleteId}=rendicion
const handleChange = (e) => {
  setRendicion({
    ...rendicion,
    [e.target.name]: e.target.value,
  });
};
/**subo uno o vario archivos */
const handleSubirArchivos = (e) => {
  let archivo = e.target.files;
  archivos(archivo);
};
/**Recivo el archivo lo proceso con la fx archivos() */
const archivos = (files) => {
  let imageArr = [];
  for (let file of files) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileObj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      imageArr.push(fileObj);
      setData([...data, ...imageArr]);
      setRendicion({
        ...rendicion,
        imagen: [...imagen, ...files],
      });
    });
  }
};
const handleEliminar= (e) => {
  let deleted = [];
  //trae index de target como objeto 
  let target = e.target.parentElement
  let targetindex = target.dataset.imgindex * 1;
  console.log(target);
  console.log(targetindex,'58');
  deleted.push(imagen[targetindex].id);
  setData([...data.slice(0, targetindex), ...data.slice(targetindex + 1)]);
  setRendicion({
    ...rendicion,
    imagen: [...imagen.slice(0, targetindex), ...imagen.slice(targetindex + 1)],
    deleteId: deleteId == undefined ? [deleted] : [...deleteId, deleted],
  });
};
/**El drag drop */
const handleHighLight = (e) => {
  e.preventDefault();
  e.stopPropagation();
  setHighlight(true);
};
const handleUnhiglight = (e) => {
  e.preventDefault();
  e.stopPropagation();
  setHighlight(false);
};
const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  let dt = e.dataTransfer;
  let files = dt.files;
  setHighlight(false);
  archivos(files);
};
/**fin drag drop */
console.log(rendicion);

  return (
    <>
      <div className="contenedor-formulario">
        <div className="wrap">
          <form
            action=""
            className="formulario"
            name="formulario_registro"
            method="get"
          >
              {/**Componentes reutilizables */}
              <Input type='text' name='item' placeholder='Item' handleChange={handleChange}/>
              <Input  type='text' name='categoria' placeholder='Categoria' handleChange={handleChange}/>
              <Input  type='text' name='descripcion' placeholder='Descripcion' handleChange={handleChange}/>
              <Input  type='text' name='nota' placeholder='Notas' handleChange={handleChange}/>
              <Input  type='text' name='importe' placeholder='Importe' handleChange={handleChange}/>
            
              
               <div>
             
              <div className="custom-form-group">
            <div
              className={
                highlight
                  ? "custom-file-drop-area highlight"
                  : "custom-file-drop-area"
              }
              onDragEnter={handleHighLight}
              onDragOver={handleHighLight}
              onDragLeave={handleUnhiglight}
              onDrop={handleDrop}
            >
              <input
                type="file"
                name="photos"
                placeholder="Enter photos"
                multiple
                id="filephotos"
                onChange={handleSubirArchivos}
              />
              <label htmlFor="filephotos">
                {" "}
                <h1> <VscNewFile/> </h1>{" "}
              </label>
            </div>
            <div className="custom-file-preview">
              {data === undefined ? (
                <h1>cargando...</h1>
              ) : (
                data.map((item, index) => (
                  <div className="prev-img" key={index} data-imgindex={index}>
                     <span onClick={handleEliminar} data-imgindex={index} > <FaRegTrashAlt data-imgindex={index} /> </span>
                    <img
                      src={item.id ? item.image : item.src}
                      alt={item.name}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
      

              <button className ='enviar' type='submit' > Enviar </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
