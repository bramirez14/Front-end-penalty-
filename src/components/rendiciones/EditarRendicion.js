import React, { useState, useEffect } from 'react'
import axiosURL from '../../config/axiosURL';
import { Form, Input, Button, Col, Row,  Select, Divider } from 'antd';
import './css/editarRendicion.css'
import TextArea from 'antd/lib/input/TextArea';
import { categorias } from "./categorias";
import { VistaImg } from './VistaImg';
import PeticionGET from '../../config/PeticionGET';

export const EditarRendicion = ({ match, history }) => {
    const { id } = match.params;
console.log(id);
    const [highlight, setHighlight] = useState(false);
    const [data, setData] = useState([]);
    const [img, setImg] = useState()
    const { Option } = Select;

    const [rendicionEditar, setRendicionEditar] = useState({
        notas: '',
        importe: '',
        categoria: '',
    })
    const { notas, importe,  categoria, fecha, gastoId } = rendicionEditar
    useEffect(() => {
        const peticionID = async () => {
            let res = await axiosURL.get(`/rendicion/${id}`);
            setRendicionEditar(res.data);
        };
        peticionID()
    }, [id])

    const crearImg = async () => {
        editarRendicion();
        let f = new FormData();
        f.append("imagen", img);
        let result = await axiosURL.post(`/rendicion/gastos/img/${id}`, f)
        if (result.data) {
            history.push(`/lista/rendicion/${gastoId}`);
        }
    }
    const editarRendicion = async () => {
         await axiosURL.put(`/rendicion/gastos/${id}`, rendicionEditar)
       
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setRendicionEditar({
            ...rendicionEditar,
            [name]: value
        });
    }
    const onChange = values => {
        setRendicionEditar({
            ...rendicionEditar, categoria: values
        })
    }
    /*******imagen */

    const handleFileChange = (e) => {
        let file = e.target.files[0];
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
        setData([]);
        setImg('');
    };
    /****fin imagenn  */
    /** Boton para volver atras */
    console.log(gastoId);
    const handleBack = () => history.push(`/lista/rendicion/${gastoId}`);
    const peticionGastoId = PeticionGET(`/gastos/${gastoId}`)
    const todasLasRendicones = peticionGastoId?.rendicion
    const sumaGastos = todasLasRendicones?.map(sg => sg.importe)
    const totalDeImporte = sumaGastos?.reduce((acumulador, item) => { return acumulador = parseFloat(acumulador) + parseFloat(item) })
    const i = peticionGastoId?.importe
    const peticionRendicion = PeticionGET(`/rendicion/${id}`)
    const resta = totalDeImporte - parseFloat(peticionRendicion.importe)//Es para verificar 
    const total = resta + parseFloat(importe)//Declarado en el estado
    const handleSubmit = (e) => {
        if (total > i) {
            alert('El importe no puede  superar el monto del anticipo')
        } else {
            //editarRendicion();
            crearImg();
        }
    };
    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={6} lg={8} xl={8} xxl={8} >
                    <Form onFinish={handleSubmit} onChange={handleChange} layout='vertical' className='formulario-rendicion'>
                        <h5 style={{ textAlign: "center", marginLeft: '40px' }}> Editar Rendicion <Button className='btn-rendicion' onClick={handleBack}> X </Button></h5>
                        <Divider />
                        <Form.Item label='Categoria'>
                            <Select value={categoria} onChange={onChange}>
                                {categorias.map((c) => (
                                    <Option key={c.id} name='categoria' value={c.categoria}  >
                                        {c.categoria}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label='Importe'>
                            <Input name='importe' value={importe} />
                        </Form.Item >
                        <Form.Item label='Fecha'>
                            <Input name='fecha' value={fecha} />
                        </Form.Item>
                        <Form.Item label='Notas'>
                            <TextArea name='notas' value={notas} autoSize={{ minRows: 2, maxRows: 6 }} />
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
                                    <h1> + </h1>
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
                <VistaImg
                    data={data}
                    setData={setData}
                    handleDelete={handleDelete}
                    {...rendicionEditar}
                />
            </Row>

        </>
    )
}
