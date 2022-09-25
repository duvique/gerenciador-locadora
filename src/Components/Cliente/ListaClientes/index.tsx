import { Button, Divider, message, Tooltip } from "antd";
import { AlignedButton, GridContainer, PageContent } from "./style";
import { useState, useEffect } from 'react'
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LocadoraAPI } from "../../../Service/Api";
import ClienteCard from "../ClienteCard";

export interface ICliente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento : Date;
  idade: number;
}

export const fetchClientes = async (setAction : (value: React.SetStateAction<ICliente[] | undefined>) => void) =>{
  try{
    const { data } = await LocadoraAPI.get('cliente/list');
     
    setAction(data)

    return data;
  }catch(e){
    message.error(`Não foi possivel buscar os clientes`);
  }
}

const Clientes = () =>{
  const [clientes, setClientes] = useState<ICliente[]>();
  const navigate = useNavigate();

  

  
  useEffect(() =>{
    fetchClientes(setClientes)
  },[]);
  
  return (
    <PageContent>
      
      <Divider plain>Clientes</Divider>
      <AlignedButton>
        <Tooltip title="Novo cliente">
          <Button onClick={() => navigate('/cliente')} type="primary" shape="circle" icon={<PlusOutlined />} />
        </Tooltip>
      </AlignedButton>
      
      <GridContainer >
        {
          clientes?.map((cliente : ICliente) => <ClienteCard reFetch={() => fetchClientes(setClientes)} key={`${cliente.id}-card`} cliente={cliente}/>)
        }
      </GridContainer>
    </PageContent>
    
  )
}


export default Clientes;