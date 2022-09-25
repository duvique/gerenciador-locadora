export const formatDate = (date: Date) =>{
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const ano = date.getFullYear();


  const formatted = `${(dia < 10 ? `0${dia}` : dia)}/${(mes < 10 ? `0${mes}` : mes)}/${ano}`;

  console.log({formatted});
  
  return formatted;
}