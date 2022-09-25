import { Button, Checkbox, DatePicker, Divider, Form, Input, message, Select } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../../helpers';
import { LocadoraAPI } from '../../../Service/Api';
import { fetchClientes, ICliente } from '../../Cliente/ListaClientes';
import { fetchFilmes, IFilme } from '../../Filmes';
import { ILocacao } from '../ListaLocacao';
import { Container } from './style';




const LocacaoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [locacao, setlocacao] = useState<ILocacao>({} as ILocacao);
  const [devolvido, setDevolvido] = useState<boolean | null>(null);
  const [filmeId, setFilmeId] = useState<number | null>(null);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [cpfCliente, setCpfCliente] = useState<string>('');
  const [clientes, setClientes] = useState<ICliente[]>();
  const [filmes, setFilmes] = useState<IFilme[]>();
  const [loading, setLoading] = useState<boolean>(false);
  
  console.log({clientes});



  const fetchLocacao = async () => {
    try{
      setLoading(true);
      const { data } = await LocadoraAPI.get<ILocacao>(`locacao/${id}`);


      setlocacao((l) => {
        const { dataLocacao, dataDevolucao, ...rest} = data;
        
        const [dataLocacaoString] = (dataLocacao as unknown as string).split('T')
        const [dataDevolucaoString] = (dataDevolucao as unknown as string).split('T')

        return {
          ...rest,
          dataLocacao: new Date(dataLocacaoString),
          dataDevolucao: new Date(dataDevolucaoString),


        }
      });
      setLoading(false);
    }catch(e){
      message.error(`Não foi possivel carregar as informações`);
    }
  }

  const handleEdit = async (e : any) => {
    try{
      const { data } = await LocadoraAPI.put<ILocacao>(`locacao/${id}`,{
        id,
        devolvido: true
      });

      if(data){
        message.success("Locação atualizada");
        fetchLocacao()
      }
    }catch(e){
      message.error(`Um erro ocorreu durante a alteração`);
    }
    
  }

  const handleCreate = async (e : any) => {
    try{
      setLoading(true);
      const response = await LocadoraAPI.post<ILocacao>(`locacao`,{
        dataDevolucao: null,
        dataLocacao: new Date(),
        filmeId, 
        clienteId,
      })

      if(response?.status === 201 && response?.data){
        message.success("Locação criada");
        navigate(`${response.data.id}`)
      }
    }catch(e){
      message.error(`Erro ao cadastrar locação`);
    }
    finally{
      setLoading(false)
    }
    
  }

  useEffect(()=>{
     id && fetchLocacao();  


    fetchClientes(setClientes)
    fetchFilmes(setFilmes)

  },[id]);

  useEffect(()=>{
    locacao && form.resetFields() 
  },[locacao]);

  useEffect(()=>{
    if(clienteId){
      const cpf = clientes?.find(c => c.id === clienteId)?.cpf!;
      
      setCpfCliente(cpf);
    } 
  },[clienteId]);

  console.log({clienteId});
  
  const { Option } = Select;

  return(
    <Container>
      <Divider >{`${id ? "Editar" : "Criar"} locação`}</Divider>
      
      <Form form={form} disabled={loading} onFinish={id ? handleEdit : handleCreate} style={{padding: '5rem'}} layout='vertical' size='large'>
        { id &&
          <Form.Item required initialValue={locacao?.dataLocacao && formatDate(locacao?.dataLocacao)} label='Data de locação' name='dataLocacao'>
            <Input
              disabled/>
          </Form.Item>
        }
        { id &&
          <Form.Item required initialValue={locacao?.dataDevolucao && formatDate(locacao?.dataDevolucao)} label='Data para a devolução' name='dataDevolucao'>
            <Input
              disabled/>
          </Form.Item>
        }


        <Form.Item required initialValue={locacao?.clienteId} label='Cliente' name='cliente'>
          <Select 
            loading={clientes === undefined}
            size="middle"
            style={{width: "50%"}}
            showSearch
            defaultActiveFirstOption
            disabled={id !== undefined}
            placeholder="Pesquisar por nome"
            optionFilterProp="children"
            filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA!.children as unknown as string)
                .toLowerCase()
                .localeCompare((optionB!.children as unknown as string).toLowerCase())
            }
            onChange={(value, name) =>{
              setClienteId(+value)
            }  }
          
          >
            {
              clientes?.map(({id, nome, cpf}) => <Option key={cpf} value={id}>{nome}</Option>)
            }
          </Select>
          
        </Form.Item>
        


        <Form.Item required initialValue={{value: locacao?.filmeId, label: locacao?.filme?.titulo}} label='Filme' name='filme'>
          <Select 
            loading={clientes === undefined}
            size="middle"
            style={{width: "50%"}}
            showSearch
            disabled={id !== undefined}
            placeholder="Pesquisar por nome"
            optionFilterProp="children"
            filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA!.children as unknown as string)
                .toLowerCase()
                .localeCompare((optionB!.children as unknown as string).toLowerCase())
            }
            onChange={(value, name) =>{
              setFilmeId(+value)
            }  }
          
          >
            {
              filmes?.map(({id, titulo}) => <Option key={`${id}-opt`} value={id}>{titulo}</Option>)
            }
          </Select>
          
        </Form.Item>


        {
          locacao?.devolvido && 
          <Form.Item valuePropName="checked" initialValue={true} label='Devolvido' name='devolvido'>
            <Checkbox checked disabled/>
          </Form.Item>
        }    
        

        <Form.Item>
          <Button disabled={locacao.devolvido} loading={loading} type='primary' block htmlType='submit'>{`${id ? "Confirmar devolução": "Criar" }`}</Button>
        </Form.Item>

        
      </Form>
    </Container>
    
  )
}


export default LocacaoForm