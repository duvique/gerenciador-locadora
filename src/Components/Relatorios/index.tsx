import { Divider, message, Radio, Table, Typography } from "antd"
import { useEffect, useState } from "react";
import { reportOptions } from "../../constants";
import { formatDate } from "../../helpers";
import { LocadoraAPI } from "../../Service/Api";
import { Container } from "./style";

const Relatorios = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [columnType, setColumnType] = useState<string>('cliente')
  const [selectedReport, setSelectedReport] = useState<string>(reportOptions[0].value)


  const fetchReport = async () => {
    try{
      const { data } = await LocadoraAPI.get(`relatorio/${selectedReport}`)


      const formattedData = [...Array.isArray(data) ? data : [data]].map((entry : any) => {
        const keys = Object.keys(entry);
        let entityObject = entry;

        if(keys.length === 2){
          const [ addon, entity ] = keys;
          entityObject = {...entry[entity]};
          entityObject[addon] = entry[addon];
        }


        return  entityObject;

      })

      
      setDataSource(formattedData)

    }catch(e){
      console.log({e});
      
      message.error(`Não foi possível carregar as informações deste relatório`)
    }
  }

  const defaultColumns : { [key : string] : any } =  {
    cliente:[
      {
        title: "Id",
        dataIndex: "id",
        key: "id" 
      },
      {
        title: "Nome",
        dataIndex: "nome",
        key: "nome" 
      },
      {
        title: "CPF",
        dataIndex: "cpf",
        key: "cpf" 
      },
      {
        title: "Data de nascimento",
        dataIndex: "dataNascimento",
        key: "dataNascimento",
        render: ((date:string) => formatDate(new Date(date)))
      },
      {
        title: "Idade",
        dataIndex: "idade",
        key: "idade" 
      }
    ],
    filme:[
      {
        title: "Id",
        dataIndex: "id",
        key: "id" 
      },
      {
        title: "Título",
        dataIndex: "titulo",
        key: "titulo" 
      },
      {
        title: "Classificação indicativa",
        dataIndex: "classificacaoIndicativa",
        key: "classificacaoIndicativa" 
      },
      {
        title: "Lançamento",
        dataIndex: "lancamento",
        key: "lancamento",
        render: ((value : boolean) => value ? "Sim" : "Não")
      },
    ]

  }
  console.log({dataSource});

  useEffect(() => {
    if(selectedReport){
      setColumnType(reportOptions.find(o => o.value === selectedReport)?.columnType || 'cliente');
    }
    fetchReport();
  }, [selectedReport]);
  return (

    <Container>
      <Typography.Title>Dashboard</Typography.Title>
      <>
        <Divider>Relatórios</Divider>
        <Radio.Group options={reportOptions} onChange={({ target: { value }}) => setSelectedReport(value)} value={selectedReport} />
      </>
      
      <Table
        loading={loading}
        style={{width: "60%"}}
        sticky
        columns={defaultColumns[columnType]}
        dataSource={dataSource}
      />
    </Container>
  )
}

export default Relatorios 