import { Button, Checkbox, Divider, Form, Input, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { classificacoes } from '../../constants';
import { LocadoraAPI } from '../../Service/Api';
import { IFilme } from '../Filmes';
import { Container } from './style';

const FilmeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filme, setFilme] = useState<IFilme>({} as IFilme);
  const [titulo, setTitulo] = useState<string>('');
  const [classificacao, setClassificacao] = useState<number | undefined>(undefined);
  const [lancamento, setLancamento] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  console.log({classificacao});
  
  const fetchFilme = async () => {
    try{
      setLoading(true);
      const { data } = await LocadoraAPI.get(`filme/${id}`);
      setFilme(data);
      setLoading(false);
    }catch(e){
      message.error(`Não foi possivel carregar as informações`);
    }
  }

  useEffect(()=>{
     id && fetchFilme();  
  },[id]);

  useEffect(()=>{
    filme && form.resetFields() 
 },[filme]);

  const handleEdit = async (e : any) => {
      try{
        const { data } = await LocadoraAPI.put<IFilme>(`filme/${id}`,{
          id,
          titulo: titulo || null,
          classificacaoIndicativa: classificacao || null,
          lancamento: lancamento || null,
        })

        if(data){
          message.success("Filme atualizado");
        }
      }catch(e){
        message.error(`Um erro ocorreu durante a alteração`);
      }
      
  }

  const handleCreate = async (e : any) => {
    try{
      setLoading(true);
      const response = await LocadoraAPI.post<IFilme>(`filme`,{
        titulo: titulo,
        classificacaoIndicativa: classificacao,
        lancamento: lancamento || false,
      })

      if(response?.status === 201 && response?.data){
        message.success("Filme criado");
        navigate(`/filme/${response.data.id}`)
      }
    }catch(e){
      message.error(`Erro ao cadastrar filme`);
    }
    
}
  return(
    <Container>
      <Divider >{`${id ? "Editar" : "Criar"} filme`}</Divider>
      
      <Form form={form} disabled={loading} onFinish={id ? handleEdit : handleCreate} style={{padding: '5rem'}} layout='vertical' size='large'>
        <Form.Item required initialValue={filme?.titulo} label='Título' name='titulo'>
          <Input 
            value={titulo} 
            onChange={({ target: { value } }) => setTitulo(value)}
            placeholder='Título'
          />
        </Form.Item>

        <Form.Item initialValue={filme?.classificacaoIndicativa} label='Classificação indicativa' name='classificacao'>
          <Select 
            
            style={{ width: 120 }}
            defaultActiveFirstOption={filme?.classificacaoIndicativa ? false : true}
            onChange={(value) => setClassificacao(value)}
            
          >
            {
              classificacoes.map(({name,value}) => <Select.Option disabled={value === classificacao} value={value}>{name}</Select.Option>)
            }

          </Select>
        </Form.Item>

        <Form.Item valuePropName="checked" initialValue={filme?.lancamento} label='Lançamento' name='lancamento'>
          <Checkbox checked={lancamento} onChange={({target: {checked}}) => setLancamento(checked)}/>
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type='primary' block htmlType='submit' placeholder='Título'>{`${id ? "Editar": "Criar" }`}</Button>
        </Form.Item>

        
      </Form>
    </Container>
    
  )
}


export default FilmeForm