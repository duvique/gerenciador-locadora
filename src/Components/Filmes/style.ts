import { Tooltip } from "antd";
import styled from "styled-components";


export const PageContent = styled.div`
  display: flex;
  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

export const GridContainer = styled.div`
  padding: 0.5rem;
  display: grid;
  justify-content: center;
  justify-items: center;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fit,minmax(300px, 1fr));
`;

export const AlignedButton = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
`;