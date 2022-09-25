import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { StyledContent } from './style'

const Content = () =>{

  return(
    <StyledContent>
      <Outlet/>
    </StyledContent>
  )
}

export default Content