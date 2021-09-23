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
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
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

export const TableLiq = ({col,datos})=> {
    const [contenedor, setContenedor] = useState([])
const [state, setState] = useState({dataSource:datos,
  count: 2,})

  console.log(datos,'datos');
  console.log(state,'line88');
useEffect(() => {
   setState({dataSource:datos})
}, [datos])

  const handleSave = (row) => {
      console.log(row,'row');
    const newData = [...state.dataSource];
    console.log(newData,'99');
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    let importeMod=newData.splice(index, 1, { ...item, ...row });
    console.log(newData.splice(index, 1, { ...item, ...row }),'104');
    console.log(contenedor,'line105')
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
    setContenedor(ff)
    console.log(ff,'ff line108')
    setState({
      dataSource: newData,
    });
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
        },
    
      };
      console.log(contenedor,'line105')
    return (
    
       
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          rowSelection={
          rowSelection
          }
          bordered
          dataSource={dataSource}
          columns={columns}
        />
    
    );
  
}
