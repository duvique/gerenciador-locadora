import { Button, Card, Divider, message, Tooltip } from "antd";
import { LocadoraAPI } from "../../Service/Api";
import FilmeCard from "../FilmeCard";
import { AlignedButton, GridContainer, PageContent } from "./style";
import { useState, useEffect } from 'react'
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export interface IFilme {
  id: number,
  titulo: string;
  lancamento: boolean;
  classificacaoIndicativa : number;
}

const Filmes = () =>{
  const [filmes, setFilmes] = useState<IFilme[]>([]);
  const navigate = useNavigate();

  const fetchFilmes = async () =>{
    try{
      const { data } = await LocadoraAPI.get('filme/list');
      setFilmes(data)
    }catch(e){
      message.error(`Não foi possivel buscar os filmes`);
    }
  }

  

  useEffect(() =>{
    fetchFilmes()
  },[]);
  return (
    <PageContent>
      
      <Divider plain>Filmes</Divider>
      <AlignedButton>
        <Tooltip title="Novo filme">
          <Button onClick={() => navigate('create')} type="primary" shape="circle" icon={<PlusOutlined />} />
        </Tooltip>
      </AlignedButton>
      
      <GridContainer >
        {
          filmes.map((filme : IFilme) => <FilmeCard key={`${filme.id}-card`} filme={filme}/>)
        }
      </GridContainer>
    </PageContent>
    
  )
}


export default Filmes;