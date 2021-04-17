import React from 'react'

export const FormularioRendicion = () => {
 
 
    const [rendicion, setRendicion] = useState({
      departamento: "",
      responsable: "",
      item: "",
      categoria: "",
      descripcion: "",
      importe: "",
      imagen: [],
      deleteId: [],
      userId: "1",
      empleado: "Empleado",
      email: "",
      fecha:new Date().toLocaleDateString()
    });
    const {
      departamento,
      responsable,
      item,
      categoria,
      descripcion,
      importe,
      imagen,
      deleteId,
      empleado,
      email,
      fecha
    } = rendicion;
    const { Option } = Select;
  
    const handleChange  = e =>{
        const{ name,value}=e.target;
        setRendicion({
          ...rendicion,
          [name]:value
        })
      }

   
  
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
      nuevoForm.append("departamento", departamento);
      nuevoForm.append("responsable", responsable);
      nuevoForm.append("item", item);
      nuevoForm.append("categoria", categoria);
      nuevoForm.append("descripcion", descripcion);
      nuevoForm.append("importe", importe);
      nuevoForm.append("userId", rendicion.userId);
      let respuesta = await axios.post(
        "http://localhost:4000/api/users/gastos",
        nuevoForm
      );
      console.log(respuesta);
      respuesta.status === 200 && history.push("/profile");
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        guardarRendicion();
      };

  
  
   
  
    console.log(rendicion);
  
    return (
        <Form>
       
      </Form>
    )
}
