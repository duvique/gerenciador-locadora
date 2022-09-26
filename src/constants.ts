
interface IClassificacao{
  name: string;
  value: number;
}

export const classificacoes : IClassificacao[] =[
  {
    name: "Livre",
    value: 0,
  },
  {
    name: "10 anos",
    value: 10,
  },
  {
    name: "14 anos",
    value: 14,
  },
  {
    name: "16 anos",
    value: 16,
  },
  {
    name: "18 anos",
    value: 18,
  }
] 

interface IReportOption{
  label: string;
  value: string;
  columnType: string;
}

export const reportOptions : IReportOption[] = [

  {
    label: 'Clientes em atraso',
    value: 'clientesEmAtraso',
    columnType: 'cliente'
  },
  {
    label: 'Filmes não alugados',
    value: 'filmesNaoAlugados',
    columnType: 'filme'
  },
  {
    label: '5 filmes mais alugados',
    value: 'cincoMaisAlugados',
    columnType: 'filme'
  },
  {
    label: '3 filmes menos alugados na última semana',
    value: 'tresMenosAlugadosSemana',
    columnType: 'filme'
  },
  {
    label: '2° cliente que mais alugou',
    value: 'segundoClienteMaisAlugou',
    columnType: 'cliente'
  },
]