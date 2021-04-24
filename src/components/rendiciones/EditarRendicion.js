
import React, { useState, useEffect } from 'react'
import axiosURL from '../../config/axiosURL';
import { Form, Input, Button, Col, Row, Card} from 'antd';

import './css/editarRendicion.css'
import TextArea from 'antd/lib/input/TextArea';
export const EditarRendicion = ({ match, history }) => {
    const { id } = match.params;
    const [highlight, setHighlight] = useState(false);
    const [data, setData] = useState();
    const [img, setImg] = useState()
    const [rendicionEditar, setRendicionEditar] = useState({
        notas: '',
        importe: '',
        categoria: '',
        deleteId: [],
    })
    const { notas, importe, imagen, categoria, fecha, deleteId } = rendicionEditar
const { Meta } = Card;

    useEffect(() => {
        const peticionID = async () => {
            let res = await axiosURL.get(`/editar/rendicion/${id}`);
            setRendicionEditar(res.data);
        };
        peticionID()
    }, [id])

   const crearImg=async ()=>{
    let f = new FormData();
    f.append("imagen", img);
    let result = await axiosURL.post(`/rendicion/gastos/img/${id}`, f)
    if (result.data) {
        history.push("/gastos");
      }
    console.log(result.data);
   }
    const editarRendicion = async () => {
        let result = await axiosURL.put(`/rendicion/gastos/${id}`, rendicionEditar)
        console.log(result.data);
        if (result.data) {
            history.push("/gastos");
          }
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setRendicionEditar({
            ...rendicionEditar,
            [name]: value
        });
    }
    /*******imagen */
    
    const handleFileChange = (e) => {
        let file = e.target.files[0];
        console.log(file);
        handFiles(file);
    };
    const handFiles = (file) => {
        let imageArr = [];

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
            setData(imageArr);
            setImg(file);//guardamos el archivo imagen
        });

    };
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
        handFiles(files);
    };
    /**Delte img del draw drop */
    const handleDelete = (e) => {
        let deleted = [];
        let target = e.target.parentElement;
        let targetindex = target.dataset.imgindex * 1;
        deleted.push(imagen[targetindex]?.id);
        setData([...data.slice(0, targetindex), ...data.slice(targetindex + 1)]);
        setRendicionEditar({
            ...rendicionEditar,
            imagen: imagen,
            deleteId: deleteId == undefined ? [deleted] : [...deleteId, deleted],
        });
    };

    /****fin imagenn  */
    /**Submit */
    const handleSubmit = (e) => {
     editarRendicion();
        crearImg();
      };
    /**Fin Submit */

/* console.log(rendicionEditar);
console.log(img); */
    return (
        <>
            <Row style={{}}>
                <Col xs={24}
                    sm={24}
                    md={6}
                    lg={8}
                    xl={8}
                    xxl={8} >
                    <Form  onFinish={handleSubmit} onChange={handleChange} layout='vertical' className='rendicion' style={{ width: '400px' }}>

                        <Form.Item label='Categoria'>
                            <Input name='categoria' value={categoria} />
                        </Form.Item>
                        
                        <Form.Item label='Importe'>
                            <Input name='importe' value={importe} />
                        </Form.Item >
                        <Form.Item label='Fecha'>
                            <Input name='fecha' value={fecha} />
                        </Form.Item>
                        <Form.Item label='Notas'>
                            <TextArea name='notas' value={notas} />
                        </Form.Item>
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
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="filephotos">
                                    {" "}
                                    <h1> + </h1>{" "}
                                </label>
                            </div>

                        </div>
                        <Form.Item >
        <Button className='btn' htmlType="submit" block >
          Guardar
        </Button>
      </Form.Item>
                    </Form>
                </Col>

               
                    
                <Card
    hoverable
    style={{ width:' 500px' , height:'auto', margin:'auto'}}
    cover={<div className="custom-file-preview " >
    {data === undefined ? (
        <h2>Agregue una imagen</h2>
    ) : (
        data.map((item, index) => (
            <div className="prev-img" key={index} data-imgindex={index} style={{ width:' 500px' , height:'350px'}} >
                <span className="prev-img"  onClick={handleDelete}> &times;</span>
                <img
                    src={item.id ? item.image : item.src}
                    alt={item.name}
                />
            </div>
        ))
    )}

</div>}
  >
    <Meta title='Datos:' description={<div>

<h6 > <b>Categoria:</b> {categoria}</h6>
<h6 className='h6'><b>Nota: </b> {notas}</h6>
<h6 className='h6'> <b>Importe:</b> ${importe}</h6>
<h6 className='h6'><b>Fecha:</b> {fecha}</h6>

</div>} />


  </Card>
                 
            
                
            </Row>
           
        </>
    )
}
