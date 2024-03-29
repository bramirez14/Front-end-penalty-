import React,{useEffect} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

import "moment/locale/es";
import {useDispatch,useSelector} from 'react-redux'
import { todasLasVacaciones } from "../../redux/actions/vacacionesAction";
import { preparandoEvento } from "./preparandoEvento";
import { ArbolDeUsuarios } from "./ArbolDeUsuarios";

const localizer = momentLocalizer(moment);
export const Calendario = () => {
  const dispatch = useDispatch();
const {vacaciones}= useSelector(state=> state)
const todasLasVaca=(vacaciones.vacaciones);
useEffect(() => {
  dispatch(todasLasVacaciones())
}, [dispatch])
const events=preparandoEvento(todasLasVaca);
  //para dar color
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#A9E35B",
      borderRadius: 10,
      opacity: 0.8,
      height:30,
      borderColor:'none'
    };

    return {
      style,
    };
  };
  //datos de cada dia
  const onDoubleClick = (e) => {
    //dispatch( uiOpenModal() );
  };
  const onSelectEvent = (e) => {
    //dispatch( eventSetActive( e ) );
  };

  const onViewChange = (e) => {
    //setLastView(e);
  };

  const onSelectSlot = (e) => {
    // dispatch( eventClearActiveEvent() );
  };

  return (
    <>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500,backgroundColor:'#ffff' }}
       defaultDate={moment().toDate()}
      eventPropGetter={eventStyleGetter}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChange}
      onSelectSlot={onSelectSlot}
      selectable={true}
    />
    <ArbolDeUsuarios vacaciones={todasLasVaca}/>
    </>
  );
};
