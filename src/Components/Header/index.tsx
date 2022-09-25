import { Avatar, Layout } from 'antd'
import {  StyledHeader, StyledTitle } from './style';
import Logo from '../../Assets/logo.png'
const Header = () => {

  const { Header } = Layout

  
  return (
      <StyledHeader>
        <StyledTitle level={3}>Locadora</StyledTitle>
        <Avatar src={Logo}/>
      </StyledHeader>
  )
}

export default Header