import { Form, Input } from 'antd';
import { useState } from 'react';
import { useGet } from '../../hooks/useGet';
/* 
const CustomizedForm = ({ onChange, fields }) => (
 
); */

export const Try = () => {
  const [fields, setFields] = useState([
    {
      name: ['username'],
      value: 'Ant Design',
    },
    {
      name: ['surname'],
      value: 'Ant ',
    },
  ]);
  const [all] = useGet('/allusers');
  console.log(Object.keys(all));
  const newU = all?.map(a=>({
    name: 'nombre',
    value:[a.nombre],
  }))
  console.log(Object.keys(all[0]));
  return (
    <>
     {/*  <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
      <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
       <Form
    name="global_state"
    layout="inline"
    fields={newU}
    onFieldsChange={(_, allFields) => {
      console.log(allFields);
    }}
  >
    <Form.Item
      name="nombre"
      label="Username"
      rules={[
        {
          required: true,
          message: 'Username is required!',
        },
      ]}
    >
      <Input placeholder='name'/>
    </Form.Item>
    <Form.Item
      name="surname"
      label="Surname"
      rules={[
        {
          required: true,
          message: 'Username is required!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
    </>
  );
};
