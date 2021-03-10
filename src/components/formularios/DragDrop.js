import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { VscNewFile} from "react-icons/vsc";


export const DragDrop = ({setRendicion,rendicion,data,setData,highlight,setHighlight,imagen,deleteId}) => {
/**subo uno o vario archivos */
const handleSubirArchivos = (e) => {
    let archivo = e.target.files;
    archivos(archivo);
  };
  /**Recibo el  archivo lo proceso con la fx archivos() */
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
  const handleEliminar = (e) => {
    let deleted = [];
    //trae index de target como objeto
    let target = e.target.parentElement;
    let targetindex = target.dataset.imgindex * 1;
    console.log(target);
    console.log(targetindex, "58");
    deleted.push(imagen[targetindex].id);
    setData([...data.slice(0, targetindex), ...data.slice(targetindex + 1)]);
    setRendicion({
      ...rendicion,
      imagen: [
        ...imagen.slice(0, targetindex),
        ...imagen.slice(targetindex + 1),
      ],
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
    return (
      

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
      name="imagen"
     
      multiple
      id="filephotos"
      onChange={handleSubirArchivos}
    />
  

    <label htmlFor="filephotos">
      {" "}
      <h1>
        {" "}
        <VscNewFile />{" "}
      </h1>{" "}
    </label>
  </div>
  <div className="custom-file-preview">
    {data === undefined ? (
      <h1>cargando...</h1>
    ) : (
      data.map((item, index) => (
        <div className="prev-img" key={index} data-imgindex={index}>
          <span onClick={handleEliminar} data-imgindex={index}>
            {" "}
            <FaRegTrashAlt data-imgindex={index} />{" "}
          </span>
          <img
            src={item.id ? item.image : item.src}
            alt={item.name}
          />
        </div>
      ))
    )}
  </div>
</div>

    )
}
