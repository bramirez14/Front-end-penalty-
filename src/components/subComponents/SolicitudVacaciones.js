import React, {useState, useEffect} from 'react'
import { Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaHandHoldingUsd, FaSortNumericUp } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { SiGooglecalendar } from "react-icons/si";
import axios from 'axios'

export const SolicitudVacaciones = ({history}) => {
 const [users,setUsers]= ([]);
 const [selectedDate, setSelectedDate] = useState(new Date());
 const [vacaciones,setVacaciones]=({

    
 })

    const getUser = async () => {
        let result = await axios.get("http://localhost:4000/api/users/allusers");
        setUsers(result.data);
      };
      useEffect(() => {
        getUser();
        
      }, []);

      const handleBack = () => {
        history.push("/profile");
      };
      const handleChange = (e) => {
        //console.log(e.target.value);
        setVacaciones({
          ...vacaciones, //copia del anticipo actual
          [e.target.name]: e.target.value,
        });
      };
      const calendar = (fecha) => {
        const options = {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        let newFormat = fecha.toLocaleDateString(options);
       
      
        setSelectedDate(fecha);
        
      };
    return (
        <>
              <Container>
       <form  >
       
          <div>
            <label forhtml="name">Nombre del empleado</label>
            <select name="usuarioId" onChange={(getUser, handleChange)}>
              {users.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.nombre}
                </option>
              ))}
            </select>
          </div>
         
          
          
          
          <div>
            <label id="icon" forhtml="calendario">
              <SiGooglecalendar className="icono" />
            </label>
            <DatePicker
              className="input"
              name="fecha"
              selected={selectedDate}
              onChange={calendar}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <textarea
            id="text"
            name="mensaje"
            rows="8"
            cols="34"
            defaultValue="Mensaje:"
            onChange={handleChange}
          />

          <button className="btn btn-success " >
            {" "}
            Enviar{" "}
          </button>
        
        </form>

        <button onClick={handleBack}>Atras</button>
      </Container>
        </>
    )
}
