import { Link } from 'react-router-dom';
import { StyledMenu, StyledMenuItem, StyledSider, StyledSubMenu } from './style';



const Sidebar = () => {

  return(
    <StyledSider>
      <StyledMenu
        defaultSelectedKeys={["Dashboard"]}
      >
        <StyledMenuItem key='Dashboard'>
          <Link to='/'>Dashboard</Link>
        </StyledMenuItem>
        <StyledMenuItem key='Filmes'>
        <Link to='/filmes'>Filmes</Link>
        </StyledMenuItem>
        <StyledMenuItem key='Clientes'>
          <Link to='/clientes'>Clientes</Link>
        </StyledMenuItem>
        <StyledMenuItem key='Locacoes'>
          <Link to='/locacoes'>Locações</Link>
        </StyledMenuItem>
      </StyledMenu>
    </StyledSider>
  )
}

export default Sidebar