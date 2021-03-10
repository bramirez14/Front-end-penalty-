import React, { useState, useEffect } from "react";
import axios from "axios";

export const Tarea2 = () => {

  const [rendicion, setRendicion] = useState({
    item: "",
    categoria: "",
    descripcion: "",
    nota: "",
    importe: "",
    imagen: [],
    deleteId: [],
  });
  console.log(rendicion);
  const handleChange = (e) => {
    //console.log(e.target.value);
    setRendicion({
      ...rendicion, //copia del Rendicion actual
      [e.target.name]: e.target.value,
    });
  };
  //use por cada table en la DB un  handle
  const handleSubmit = (e) => {
    e.preventDefault();
    guardarRendicion();
  };

  const handleImage = (e) => {
    console.log(e.target.files);
    setRendicion({
      ...rendicion,
      imagen: e.target.files,
    });
  };
  
  const guardarRendicion = async (e) => {
    let nuevoForm = new FormData();
    for (let i = 0; i < rendicion.imagen.length; i++) {
      nuevoForm.append("image", rendicion.imagen[i]);
    }
    nuevoForm.append("item", rendicion.item);
    nuevoForm.append("categoria", rendicion.categoria);
    nuevoForm.append("descricion", rendicion.descripcion);
    nuevoForm.append("nota", rendicion.nota);
    nuevoForm.append("importe", rendicion.importe);

    axios
      .post('http://localhost:4000/api/users/gastos', nuevoForm)
      .then((res) => {
        console.log(res);
        /*if (res.status === 200) {
          history.push("/crud");
        }*/
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h2>Nuevo Rendicion</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="item"
            placeholder="Nombre"
            defaultValue={rendicion.item}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="categoria"
            placeholder="Color"
            defaultValue={rendicion.categoria}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="descripcion"
            placeholder="descripcion"
            defaultValue={rendicion.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="description"
            className="form-control"
            name="nota"
            placeholder='nota'
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="importe"
            placeholder="importe"
            defaultValue={rendicion.importe}
            onChange={handleChange}
            required
          />
        </div>

        

        <div className="form-group">
          <label htmlFor="img">Imagen</label>
          <input
            type="file"
            className="form-control"
            name="imagen"
            onChange={handleImage}
            required
            multiple
          />
        </div>

        <button className="btn btn-primary"> guardarRendicion</button>
      </form>
    </>
  );
};
