import { Button, Checkbox, DatePicker, Divider, Form, Input, message, Select } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../../helpers';
import { LocadoraAPI } from '../../../Service/Api';
import { ICliente } from '../ListaClientes';
import { Container } from './style';




const ClienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [cliente, setCliente] = useState<ICliente>({} as ICliente);
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
  const [idade, setIdade] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);





  const calcIdade = (date : Date | null) =>{
    if(!date) return null;

    const today = new Date();

    
    let idade = today.getFullYear() - date.getFullYear();
    console.log({today});

    const mesDif = today.getMonth() - date.getMonth();
    if (mesDif < 0 || (mesDif === 0 && today.getDate() < date.getDate())) {
      idade--;
    }
    

    setIdade(idade);
  }


  const fetchCliente = async () => {
    try{
      setLoading(true);
      const { data } = await LocadoraAPI.get<ICliente>(`cliente/${id}`);


      setCliente((oldClient) => {
        const { dataNascimento, ...rest} = data;
        
        const [dateString, time] = (dataNascimento as unknown as string).split('T')

        return {
          ...rest,
          dataNascimento: new Date(dateString),


        }
      });
      setLoading(false);
    }catch(e){
      message.error(`Não foi possivel carregar as informações`);
    }
  }

  const handleEdit = async (e : any) => {
    try{
      const { data } = await LocadoraAPI.put<ICliente>(`cliente/${id}`,{
        id,
        nome: nome || null,
        cpf: cpf || null,
        dataNascimento: dataNascimento || null,
      });

      if(data){
        message.success("Cliente atualizado");
      }
    }catch(e){
      message.error(`Um erro ocorreu durante a alteração`);
    }
    
  }

  const handleCreate = async (e : any) => {
    try{
      setLoading(true);
      const response = await LocadoraAPI.post<ICliente>(`cliente`,{
        nome: nome,
        cpf: cpf,
        dataNascimento: dataNascimento,
      })

      if(response?.status === 201 && response?.data){
        message.success("Cliente criado");
        navigate(`${response.data.id}`)
      }
    }catch(e){
      message.error(`Erro ao cadastrar cliente`);
    }
    
  }

  useEffect(()=>{
     id && fetchCliente();  
  },[id]);

  useEffect(()=>{
    cliente && form.resetFields() 
  },[cliente]);

  useEffect(()=>{
    calcIdade(dataNascimento)
  },[dataNascimento]);

  
  return(
    <Container>
      <Divider >{`${id ? "Editar" : "Criar"} cliente`}</Divider>
      
      <Form form={form} disabled={loading} onFinish={id ? handleEdit : handleCreate} style={{padding: '5rem'}} layout='vertical' size='large'>
        <Form.Item required initialValue={cliente?.nome} label='Nome' name='nome'>
          <Input 
            value={nome} 
            onChange={({ target: { value } }) => setNome(value)}
            placeholder='Nome'
          />
        </Form.Item>

        <Form.Item required initialValue={cliente?.cpf} label='CPF' name='cpf'>
          <Input 
            value={nome} 
            onChange={({ target: { value } }) => setCpf(value)}
            placeholder='XXX.XXX.XXX-XX'
          />
        </Form.Item>

        <Form.Item required initialValue={cliente?.dataNascimento && moment(formatDate(cliente?.dataNascimento), "DD/MM/yyyy")} label='Data de nascimento'>
          <DatePicker 
            format={"DD/MM/YYYY"} 
            onChange={(date, dateString) =>{
                const [dia, mes, ano] = dateString.split('/');
                setDataNascimento(new Date(+ano, +mes -1, +dia))
              }
            } 
            /> 
          <Form.Item initialValue={cliente?.idade}  noStyle name='idade' >
            <Input style={{margin: "0.5rem", width: '30%'}} placeholder='Idade' disabled value={idade ? `${idade} anos` : 'Idade não calculada'}/>
          </Form.Item>
        </Form.Item>

        

        <Form.Item>
          <Button loading={loading} type='primary' block htmlType='submit'>{`${id ? "Editar": "Criar" }`}</Button>
        </Form.Item>

        
      </Form>
    </Container>
    
  )
}


export default ClienteForm