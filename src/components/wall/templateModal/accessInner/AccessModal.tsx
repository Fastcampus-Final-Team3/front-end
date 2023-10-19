import styled from 'styled-components';
import { CheckOutlined, SettingOutlined } from '@ant-design/icons';

export default function AccessModal() {
  return (
    <>
      <EditeListBox>
        <p>
          <SettingOutlined />
          편집하기
        </p>
        <p>
          <CheckOutlined />
          권한설정
        </p>
      </EditeListBox>
    </>
  );
}

const EditeListBox = styled.div`
  width: auto;
  margin: auto;
  align-items: center;

  p {
    margin-top: 5px;
    cursor: pointer;
  }
`;
