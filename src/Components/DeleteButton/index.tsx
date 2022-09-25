import { DeleteOutlined, LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { Button, Popconfirm, PopconfirmProps, Spin } from "antd"


interface IProps extends PopconfirmProps {
  loading : boolean

}


const DeleteButton = ({loading, ...defaultProps}: IProps) =>{
  return (
    <Popconfirm {...defaultProps} icon={<QuestionCircleOutlined style={{ color: 'red' }}/>}    >
        {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
        {!loading && <DeleteOutlined key="delete" />}
    </Popconfirm>
  )
}

export default DeleteButton