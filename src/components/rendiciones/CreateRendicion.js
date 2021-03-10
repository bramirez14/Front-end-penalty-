import React, { useState, useEffect } from "react";

import { Input } from "../formularios/Input";
import { InputMsg } from "../formularios/InputMsg";
import axios from "axios";
import "./css/createRendicion.css";
import { DragDrop } from "../formularios/DragDrop";

export const CreateRendicion = ({ history }) => {
  const [highlight, setHighlight] = useState(false);
  const [data, setData] = useState([]);
  const [rendicion, setRendicion] = useState({
    departamento:'',
    responsable:'',
    item:'',
    categoria:'',
    descripcion: "",
    importe: "",
    imagen: [],
    deleteId: [],
  });
  const { departamento,responsable, item, categoria, descripcion, importe, imagen,deleteId} = rendicion;
  console.log(rendicion);
  const handleChange = (e) => {
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
    for (const img of imagen) {
      nuevoForm.append("image", img);
    }
    nuevoForm.append('departamento', departamento);
    nuevoForm.append('responsable', responsable);
    nuevoForm.append('item', item);
    nuevoForm.append('categoria', categoria);
    nuevoForm.append('descripcion',descripcion);
    nuevoForm.append('importe', importe);
    let respuesta = await axios.post(
      "http://localhost:4000/api/users/gastos",
      nuevoForm
    );
    console.log(respuesta);
    //respuesta.status === 200 && history.push("/crud");
  };

  return (
    <>
      <form className="wrap" onSubmit={handleSubmit}>
        {/**Componentes reutilizables */}
        <Input
          type="text"
          name="departamento"
          placeholder="Departamento:  ej Sistemas..."
          handleChange={handleChange}
        />
        <Input
          type="text"
          name="responsable"
          placeholder="Responsable:  ej Esteban, Cristian..."
          handleChange={handleChange}
        />
        <Input
          type="text"
          name="item"
          placeholder="Items  ej:Disco solido ssd,monitor etc..."
          handleChange={handleChange}
        />
        <Input
          type="text"
          name="categoria"
          placeholder="Categoria  ej:informatica,almcen etc..."
          handleChange={handleChange}
        />
        <Input
          type="number"
          name="importe"
          placeholder="Importe"
          handleChange={handleChange}
        />
        <InputMsg
          width="300px"
          type="text"
          name="descripcion"
          placeholder="Descripcion:"
          change={handleChange}
        />
        <DragDrop
          data={data}
          setData={setData}
          setRendicion={setRendicion}
          rendicion={rendicion}
          highlight={highlight}
          setHighlight={setHighlight}
          imagen={imagen}
          deleteId={deleteId}
        />

        <button className="enviar"> Enviar </button>
      </form>
    </>
  );
};
