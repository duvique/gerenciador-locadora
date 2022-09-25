import { Button, Divider, message, Tooltip } from "antd";
import { AlignedButton, GridContainer, PageContent } from "./style";
import { useState, useEffect } from 'react'
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LocadoraAPI } from "../../../Service/Api";
import { IFilme } from "../../Filmes";
import { ICliente } from "../../Cliente/ListaClientes";
import LocacaoCard from "../LocacaoCard";

export interface ILocacao {
  id: number;
  dataLocacao : Date;
  dataDevolucao : Date;
  filmeId: number;
  filme: IFilme;
  clienteId: number;
  cliente : ICliente
  devolvido: boolean;
}


const Locacoes = () =>{
  const [locacoes, setLocacoes] = useState<ILocacao[]>([]);
  const navigate = useNavigate();

  const fetchLocacoes = async () =>{
    try{
      const { data } = await LocadoraAPI.get<ILocacao[]>('locacao/list');

      const formattedData = data.map(({dataDevolucao, dataLocacao, ...rest})=> {
        const [dataDevolucaoString] = (dataDevolucao as unknown as string).split('T')
        const [dataLocacaoString] = (dataLocacao as unknown as string).split('T')

        return {
          ...rest,
          dataDevolucao: new Date(dataDevolucaoString),
          dataLocacao: new Date(dataLocacaoString)
        }
      })
      setLocacoes(formattedData)
    }catch(e){
      message.error(`Não foi possivel buscar as locações`);
    }
  }

  
  useEffect(() =>{
    fetchLocacoes()
  },[]);
  
  return (
    <PageContent>
      
      <Divider plain>Locações</Divider>
      <AlignedButton>
        <Tooltip title="Nova Locação">
          <Button onClick={() => navigate('/locacao')} type="primary" shape="circle" icon={<PlusOutlined />} />
        </Tooltip>
      </AlignedButton>
      
      <GridContainer >
        {
          locacoes.map((locacao : ILocacao) => <LocacaoCard reFetch={fetchLocacoes} key={`${locacao.id}-card`} locacao={locacao}/>)
        }
      </GridContainer>
    </PageContent>
    
  )
}


export default Locacoes;