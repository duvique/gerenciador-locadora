import React, { useState } from 'react'
import { Avatar, Button, Card, message, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined , FireFilled, FireOutlined, IdcardOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ICliente } from '../ListaClientes'
import { PatternFormat } from 'react-number-format'
import { LocadoraAPI } from '../../../Service/Api'
import DeleteButton from '../../DeleteButton'

interface IProps{
  cliente: ICliente
  reFetch: () => Promise<void>
}


const ClienteCard = ({reFetch, cliente: {id,nome, cpf, dataNascimento, idade}} : IProps)  =>{

  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  
  const redirectTo = () =>{
    navigate(`/cliente/${id}`)
  }

  const deleteCliente = async () =>{
    try{
      setDeleteLoading(true)
      const { status } = await LocadoraAPI.delete(`cliente/${id}`);

      if(status === 200){
        message.success('Cliente deletado!');
        reFetch()
      }
    }catch(e){
      message.error('Ocorreu um erro ao deletar o cliente')
    }finally{
      setDeleteLoading(false)
    }
  }

  const { Meta } = Card

  return (
    <Card
        hoverable={true}
        title={`${id} -${nome}`}
        size={'default'}
        style={{width: "80%"}}
        actions={[
          <EditOutlined onClick={redirectTo} key="edit"/>,
          <DeleteButton
            title='Deseja deletar o cliente?'
            okText='Sim'
            cancelText='Não'
            onConfirm={deleteCliente}
            loading={deleteLoading}
          />,
        ]}
      >
       <Meta 
          avatar={<IdcardOutlined />}
          title={<PatternFormat value={cpf} disabled style={{border: 'none', background: 'transparent'}} format={'###.###.###-##'}/>}
          description={`${idade} anos.`}
        />
      </Card>
  )
}


export default ClienteCard