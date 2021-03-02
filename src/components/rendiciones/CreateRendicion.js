import React from "react";
import "./createRendicion.css";
export const CreateRendicion = () => {
  return (
    <>
      <div class="contenedor-formulario">
        <div class="wrap">
          <form
            action=""
            class="formulario"
            name="formulario_registro"
            method="get"
          >
            <div>
              <div class="input-group">
                <input type="text" id="nombre" name="Item" placeholder="Item" />
              </div>
              <div class="input-group">
                <input type="text" id="correo" name="categoria" placeholder="Categoria" />
              </div>
              <div class="input-group">
                <input type="text" id="pass" name="" placeholder="Descripcion"/>
              </div>
              <div class="input-group">
                <input type="text" id="pass2" name="" placeholder="Notas" />
              </div>
			  <div class="input-group">
                <input type="text" id="pass2" name="" placeholder="Importe" />
              </div>
            

              <button className ='enviar' type='submit' > Enviar </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
