import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  key,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    console.log(record[dataIndex],36)
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    console.log(record,.44)
    try {
      const values = await form.validateFields();
      console.log(values,.47)
      toggleEdit();
      console.log({ ...record, ...values },49)
      
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export const TableLiq = ({col,datos, dataCheck,setDataCheck})=> {
    const [contenedor, setContenedor] = useState([])//lo dejamos porque influye  el valor de la tabla 
const [state, setState] = useState({dataSource:datos,
  count: 2,})

  console.log(state,'line 96');
useEffect(() => {
   setState({dataSource:datos})
}, [datos])

  const handleSave = (row) => {
      console.log(row,'row101');//aca ya llega cambiado el valor del campo
    const newData = [...state.dataSource];
    console.log(newData,'105');
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    console.log(item,.108)
   
    console.log(newData.splice(index, 1, { ...item, ...row }),'110');
    console.log(contenedor,'111')
    let ff=contenedor.map(c=>{ 
    if ( c.key === newData.splice(index, 1, { ...item, ...row })[0].key){
      return{
        ...c,
        saldoml:newData.splice(index, 1, { ...item, ...row })[0].saldoml
      }
    }
    return c
    
    }
    
    )
    setDataCheck(ff)
    setContenedor(ff)
    console.log(ff,'ff line124')
    setState({
      dataSource: newData,
    });
    //setDataCheck(ff)

  };


    const { dataSource } = state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = col.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) =>({
          record,
          key:col.key,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: handleSave,
        })
      };
    });
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRows,'check140');
           setContenedor(selectedRows)
           setDataCheck(selectedRows)
        },
    
      };
      console.log(contenedor,'line164')
    return (
    
       
        <Table
      title={()=> <h2 style={{ textAlign: "center" }}>
      <b> LIQUIDACION </b>
    </h2>}

          components={components}
          rowClassName={() => 'editable-row'}
          rowSelection={
          rowSelection
          }
          dataSource={dataSource}
          columns={columns}
        scroll={{ y: 300}}

        />
    
    );
  
}
