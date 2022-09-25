import React, { useState } from 'react'
import { Avatar, Button, Card, message, Tooltip } from 'antd'
import { CheckOutlined, ClockCircleFilled, DeleteOutlined, EditOutlined, EyeOutlined , FireFilled, FireOutlined, IdcardOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { PatternFormat } from 'react-number-format'
import { LocadoraAPI } from '../../../Service/Api'
import DeleteButton from '../../DeleteButton'
import { ILocacao } from '../ListaLocacao'
import { formatDate } from '../../../helpers'

interface IProps{
  locacao: ILocacao
  reFetch: () => Promise<void>
}


const LocacaoCard = ({reFetch, locacao: {id,dataLocacao, dataDevolucao, clienteId: id_cliente, filmeId: id_filme, devolvido }} : IProps)  =>{

  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  
  const redirectTo = () =>{
    navigate(`/locacao/${id}`)
  }

  const deleteLocacao = async () =>{
    try{
      setDeleteLoading(true)
      const { status } = await LocadoraAPI.delete(`locacao/${id}`);

      if(status === 200){
        message.success('Locação deletada!');
        reFetch()
      }
    }catch(e){
      message.error('Ocorreu um erro ao deletar a locação')
    }finally{
      setDeleteLoading(false)
    }
  }

  const { Meta } = Card

  return (
    <Card
        hoverable={true}
        title={`Locação ${id}`}
        size={'default'}
        style={{width: "80%"}}
        actions={[
          <EditOutlined onClick={redirectTo} key="edit"/>,
          <DeleteButton
            title='Deseja deletar a locação?'
            okText='Sim'
            cancelText='Não'
            onConfirm={deleteLocacao}
            loading={deleteLoading}
          />,
        ]}
      >
       <Meta 
          avatar={devolvido ? <CheckOutlined style={{color: 'green'}}/> : <ClockCircleFilled />}
          title={`${devolvido ? "Filme devolvido": "" }${ !devolvido ? `Alugado em: ${formatDate(dataLocacao)}` : ""}`}
        />
      </Card>
  )
}


export default LocacaoCard