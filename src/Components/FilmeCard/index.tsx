import React, { useState } from 'react'
import { Avatar, Button, Card, message, Tooltip } from 'antd'
import { IFilme } from '../Filmes'
import { DeleteOutlined, EditOutlined, EyeOutlined , FireFilled, FireOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { MetaIcon } from './style'
import { classificacoes } from '../../constants'
import DeleteButton from '../DeleteButton'
import { LocadoraAPI } from '../../Service/Api'

interface IProps{
  filme: IFilme
  reFetch: () => Promise<void>
}

const CustomToolTip = ({lancamento} : {lancamento: boolean}) => {
  return(
    <MetaIcon>
      <Tooltip title={`${lancamento ? "Filme em lançamento" : "Filme fora de lançamento"}`}>
          {(lancamento ?
            <FireFilled style={{ color:'#ff5a00'}}/> :
            <FireOutlined/>
          )}
      </Tooltip>
    </MetaIcon>
  )
}

const FilmeCard = ({reFetch, filme: {id, titulo, lancamento, classificacaoIndicativa}} : IProps)  =>{

  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  
  const redirectTo = () =>{
    navigate(`/filme/${id}`)
  }

  const deleteFilme = async () =>{
    try{
      setDeleteLoading(true)
      const { status } = await LocadoraAPI.delete(`filme/${id}`);

      if(status === 200){
        message.success('Filme deletado!');
        reFetch()
      }
    }catch(e){
      message.error('Ocorreu um erro ao deletar o filme')
    }finally{
      setDeleteLoading(false)
    }
  }

  const { Meta } = Card

  return (
    <Card
        hoverable={true}
        title={`${id} -${titulo}`}
        size={'default'}
        style={{width: "80%"}}
        actions={[
          <EditOutlined onClick={redirectTo} key="edit"/>,
          <DeleteButton
            title='Deseja deletar o filme?'
            okText='Sim'
            cancelText='Não'
            
            onConfirm={deleteFilme}
            loading={deleteLoading}
          />,
        ]}
      >
       <Meta 
          avatar={<CustomToolTip  lancamento={lancamento}/>  }
          description={`+${classificacoes.find(({value}) => value === classificacaoIndicativa)?.name}`}
        />
      </Card>
  )
}


export default FilmeCard