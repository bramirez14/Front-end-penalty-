import React from "react";
import "./css/cardRendiciones.css";
import image from "../../logoPenalty-remove.png";
import { Button } from "antd";
export const CardRendiciones = () => {
  return (
    <div className="list-container">
      <div className="img-div">
        <img className="img" src={image} alt="" />
      </div>
      <div className="text-date">
        {" "}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, quaerat
          dignissimos? Fuga recusandae fugit dolore ea cumque nihil. Quas quae
          mollitia officiis nam eum natus ullam quam eaque dignissimos atque?
        </p>
      </div>
      <Button>Editar</Button>
    </div>
  );
};
