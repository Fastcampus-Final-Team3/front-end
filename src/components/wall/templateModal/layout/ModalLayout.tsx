import { useState } from 'react';
import { Button, Modal, Select, Input } from 'antd';
import styled from 'styled-components';

import {
  BestTemplate,
  CategoryTemplate,
  SelecteSearchTemplate,
} from 'components/index';
import { ModalHeader } from '@/components/common/ModalHeader';

export const ModalOpen = () => {
  const { Search } = Input;
  // 모달 오픈을 관리하기 위한 상태관리

  const [procedure, setProcedure] = useState<
    'recommand' | 'category' | 'search'
  >('recommand');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 처음 추천 템플릿을 보여주기 위한 상태관리

  const [inputText, setInputText] = useState('');

  const PROCEDURE_MAPPER = {
    recommand: <BestTemplate />,
    category: <CategoryTemplate />,
    search: <SelecteSearchTemplate inputText={inputText} />,
  };

  // 검색 버튼 클릭시 실행되는 함수
  const onSearch = (value: string) => {
    console.log(value);
    alert('');
  };

  // 모달창을 보여주는 함수
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSearchFocus = () => {
    setProcedure('category');
    // setShowBestTemplate(false); // Search 입력에 포커스가 클릭되면 BestTemplate 숨김
    // setCategoryTemplate(true);

    //  이슈: input창에 입력하고 나서 외부에 커서 클릭후 다시 input창으로 커서를 두게 되면
    // 상태변화 때문에 리스트 추천 템플릿 컴포넌트의 false 가 해제되게 됨. 따라 조건식으로
    //input창에 입력된 문자열 길이가 0 위로 존재하면 추천 템플릿이 보이지 않게끔 해결.
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setInputText('');
    setProcedure('recommand');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInputText('');
    setProcedure('recommand');
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);

    if (e.target.value.length > 0) {
      setProcedure('search');
    } else {
      setProcedure('category');
    }
  };

  return (
    <>
      <Button className="buttonOpen" type="primary" onClick={showModal}>
        템플릿 생성
      </Button>
      <Modals
        centered
        title={
          <ModalHeader
            title="템플릿 선택하기"
            handleOk={handleOk}
            handleCloseModal={handleCancel}
          />
        }
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
      >
        {/* <ModalHeaders>
          <p>템플릿 선택하기</p>
        </ModalHeaders> */}
        <SettingTemplet>
          <p className="settingtText">템플릿 설정하기</p>
          <SelectBox>
            <InputBox>
              <Select
                className="selectbox"
                defaultValue="문서제목"
                allowClear
                options={[{ value: '문서', label: '문서제목' }]}
              />
              <Search
                className="searchBox"
                type="text"
                placeholder="input search text"
                onSearch={onSearch}
                onFocus={handleSearchFocus}
                value={inputText}
                onChange={handleChangeText}
              />
            </InputBox>
            {PROCEDURE_MAPPER[procedure]}
          </SelectBox>
        </SettingTemplet>
      </Modals>
    </>
  );
};

const Modals = styled(Modal)`
  .ant-modal-content {
    width: 660px;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 106px;
  }

  .ant-btn.css-dev-only-do-not-override-12nk7v7.ant-btn-default {
    position: absolute;
    top: 40px;
    left: 40px;
    border: 1px solid red;
    color: red;
  }

  .ant-btn.css-dev-only-do-not-override-12nk7v7.ant-btn-primary {
    position: absolute;
    right: 40px;
    top: 40px;
  }
`;

const ModalHeaders = styled.div`
  max-width: 600px;
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid gray;
  //background-color: rebeccapurple;
  display: flex;

  p {
    width: 112px;
    margin: auto;
    font-weight: 800;
  }
`;
const SettingTemplet = styled(ModalHeaders)`
  height: 600px;
  border: none;
  background-color: aliceblue;
  position: relative;

  .settingtText {
    width: 112px;
    margin: auto;
    margin-top: 10px;
    font-weight: 800;
    color: blue;
    position: absolute;
  }
`;
const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top: 30px;
  padding-bottom: 100px;
  //background-color: aqua;
`;
const InputBox = styled.div`
  width: 570px;
  //background-color: red;
  display: flex;
  gap: 10px;
  margin-top: 20px;

  .ant-btn-icon-only.ant-input-search-button.ant-input-search-button {
    position: absolute;
    top: 0px;
    left: 1px;
    border: 1px solid gray;
  }
`;
