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

export const fetchFilmes = async (setAction : React.Dispatch<React.SetStateAction<IFilme[] | undefined>>) =>{
  try{
    const { data } = await LocadoraAPI.get('filme/list');
    setAction(data)
  }catch(e){
    message.error(`Não foi possivel buscar os filmes`);
  }
}

const Filmes = () =>{
  const [filmes, setFilmes] = useState<IFilme[] | undefined>([]);
  const navigate = useNavigate();

  

  

  useEffect(() =>{
    fetchFilmes(setFilmes)
  },[]);
  return (
    <PageContent>
      
      <Divider plain>Filmes</Divider>
      <AlignedButton>
        <Tooltip title="Novo filme">
          <Button onClick={() => navigate('/filme')} type="primary" shape="circle" icon={<PlusOutlined />} />
        </Tooltip>
      </AlignedButton>
      
      <GridContainer >
        {
          filmes?.map((filme : IFilme) => <FilmeCard reFetch={() => fetchFilmes(setFilmes)} key={`${filme.id}-card`} filme={filme}/>)
        }
      </GridContainer>
    </PageContent>
    
  )
}


export default Filmes;