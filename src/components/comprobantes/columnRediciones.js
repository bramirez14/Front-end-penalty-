import { PdfoImg } from '../../helpers/PdfoImg'
export const ImageColumn= ({file})=>( <PdfoImg file={file} />)

export  const columnReciones=[
    {
        title: 'Importe',
        dataIndex: 'importe',
        key: 'importe',
        render: (text) => <p>${text}</p>,
      },
      {
        title: 'Categoria',
        dataIndex: 'categoria',
        key: 'categoria',
      },
      {
        title: '',
        dataIndex: 'archivo',
        key: 'archivo',
        render: (text) => <ImageColumn file={text}/>,
      },
]