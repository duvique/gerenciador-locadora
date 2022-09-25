import { Layout } from 'antd';
import Title from 'antd/lib/typography/Title';

import styled from 'styled-components'


export const StyledHeader = styled(Layout.Header)`
  &&{
    
    height: 5vh;
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding: 2rem;
  }


`;

export const StyledTitle = styled(Title)`
  &&{
    color: white;
  } 
`
