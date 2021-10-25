import React from 'react'
import { Menu, Grid} from 'antd';
import { CheckOutlined, DollarCircleOutlined, FileDoneOutlined, HomeOutlined, MailOutlined, RiseOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;

export const MenuGerencia = ({ open, setOpen}) => {
  const N = localStorage.getItem('N');
  const { useBreakpoint } = Grid;
const screens = useBreakpoint();
let handleClick;
if(!screens.md){
    handleClick= e => {
            console.log(e);
            setOpen(false)
            
            };
  }
   

    return (
        <Menu  mode="inline"
        onClick={handleClick} 
      style={{backgroundColor:'#46a461'}}
      >
            <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to='/perfil' >Home </Link>
            </Menu.Item>
{ N==='901'&&
            <SubMenu key="sub1"  title="Usuario" icon={<UserOutlined />} >
            <Menu.Item key="2">
                <Link to='/register'>
                Registro
                </Link>
                
                </Menu.Item>
        </SubMenu>}
            <SubMenu key="sub2"  title="Aprobaciones"  icon={<CheckOutlined />}>
            <Menu.Item key="3">
                <Link to='/aprobacion/sueldo'>
                    Sueldo
                </Link>
                </Menu.Item>
            <Menu.Item key="4">
            <Link to='/aprobacion/vacaciones'> Vacaciones</Link>
               </Menu.Item>
            <Menu.Item key="5">
            <Link to='/aprobacion/gastos'></Link>
                
                Gastos</Menu.Item>
            <Menu.Item key="6">
            <Link to='/aprobacion/km'></Link>
                
                Km</Menu.Item>

        </SubMenu>


        <SubMenu key="sub3"  title='Rtes de Gestion' icon={<RiseOutlined />} >
            <Menu.Item key="7">
            <Link to='/reportes/gestion/remitos'>Remitos</Link>
                
                </Menu.Item>
        <SubMenu key="sub4"  title="Facturacion">
            <Menu.Item key="8">
            <Link to='/reportes/facturacion/ventas'>Por Vdor</Link>
                
                </Menu.Item>
            <Menu.Item key="9"> 
            <Link to='/reportes/facturacion/detallada'>Detalladata</Link>
            </Menu.Item>
        </SubMenu>
            <Menu.Item key="10">
        <Link to='/reportes/cuentacorriente'>CuentaCorriente </Link>
                
                </Menu.Item>
            <Menu.Item key="11">
        <Link to='/reportes/cobranza'>Cobranzas</Link>
                
                </Menu.Item>
            <Menu.Item key="12">
        <Link to='/reportes/clientes/inhabilitados'>Ctes Inhabilitados </Link>
                
                </Menu.Item>
            <Menu.Item key="13">
        <Link to='/reportes/carga/pedidos'>Carga de Pedidos </Link>
                
                </Menu.Item>
        <SubMenu key="sub5"  title="Pendiente">
            <Menu.Item key="14">
        <Link to='/reportes/pendiente/detallado'>Detallado</Link>
                
                </Menu.Item>
            <Menu.Item key="15">
        <Link to='/reportes/pendiente/cliente'>Agrupado Por Cliente</Link>

            
                 </Menu.Item>
        </SubMenu>
        <Menu.Item key="16"> 
        <Link to='/reportes/futuros/ingresos'>Futuros Ingresos</Link>
        
        </Menu.Item>
        <Menu.Item key="17"> 
        <Link to='/reportes/stock'>Stock</Link>
        
        </Menu.Item>
        <Menu.Item key="18"> 
        <Link to='/reportes/scc'>Control de SCC</Link>
        
        </Menu.Item>


        </SubMenu>

        <SubMenu key="sub6"  title="Solicitudes" icon={<MailOutlined />}>
            <Menu.Item key="19"> 
        <Link to='/sueldos'>Sueldo</Link>
            
             </Menu.Item>
            <Menu.Item key="20">
        <Link to='/vacaciones'>Vacaciones</Link>
                  </Menu.Item>
            <Menu.Item key="21"> 
        <Link to='/anticipo/gastos'> Gastos</Link>
            </Menu.Item>
        </SubMenu>
        <SubMenu key="sub7"  title="Rendiciones" icon={<DollarCircleOutlined />} >
            <Menu.Item key="22">
        <Link to='/gastos'> Gasto</Link>
                 </Menu.Item>
            <Menu.Item key="23">
        <Link to='/lista/kilometros'>Km </Link>
                 </Menu.Item>
                 <Menu.Item key="24">
        <Link to='/tarjeta/credito'> Gasto con Tarjeta</Link>
                 </Menu.Item>
        </SubMenu>
        <SubMenu key="sub10"  title="Comprobante" icon={<FileDoneOutlined/>}>
            <Menu.Item key="25"> 
            <Link to='/comprobantes/gastos'> gastos</Link>
            </Menu.Item>
            <Menu.Item key="26"> 
            <Link to='/comprobantes/tarjeta-credito'> tarjeta de credito </Link>
            </Menu.Item>
            </SubMenu>

        
        </Menu>
    )
}
