import React from 'react'
import { Avatar, Card, Tooltip } from 'antd'
import { IFilme } from '../Filmes'
import { DeleteOutlined, EditOutlined, EyeOutlined , FireFilled, FireOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { MetaIcon } from './style'
import { classificacoes } from '../../constants'

interface IProps{
  filme: IFilme
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

const FilmeCard = ({filme: {id, titulo, lancamento, classificacaoIndicativa}} : IProps)  =>{

  const navigate = useNavigate();
  
  const redirectTo = () =>{
    navigate(`${id}`)
  }

  const remove = () =>{
    navigate(`${id}`)
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
          <DeleteOutlined key="delete" />,
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