import { useCallback, useState } from 'react';
import { Button, Modal, Select, Input } from 'antd';
import styled from 'styled-components';
import { templateText } from '@/textConstants';
import plusIcon from '@/assets/icons/plus.svg';

import { useTemplateStore, useWallStore } from '@/store';
import { produce } from 'immer';
import { BestTemplate } from '../recommend/RecommendInner';
import { SelecteSearchTemplate } from '../searchInner/SearchTemplate';
import Icon from '@/components/common/Icon';
import CategoryTemplate from '../categoryInner/listtemplate/CategoryTemplate';
import ModalContents from './modalListContent';

export const ModalOpen = () => {
  const { Search } = Input;
  const [procedure, setProcedure] = useState<
    'recommand' | 'category' | 'search' | 'select'
  >('recommand');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const { wall, setWall } = useWallStore();
  const { selectedTemplate, setSelectedTemplate } = useTemplateStore();

  const PROCEDURE_MAPPER = {
    recommand: <BestTemplate PERSONAL={''} />,
    category: <CategoryTemplate />,
    search: <SelecteSearchTemplate inputText={inputText} />,
  };

  // 모달창을 보여주는 함수
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setInputText('');
    setProcedure('recommand');
    setWall(
      produce(wall, (draft) => {
        const templateIndex = draft.blocks.findIndex(
          (block) => block.blockType === 'templateBlock',
        );
        draft.blocks[templateIndex].subData.push({
          templateUUID: crypto.randomUUID(),
          templateTitle: selectedTemplate.templateTitle,
          templateDescription: selectedTemplate.templateDescription,
        });
      }),
    );
    setSelectedTemplate({
      category: '',
      templateId: '',
      templateTitle: '',
      templateDescription: '',
    });
  };

  const handleContents = () => {
    setProcedure('select');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInputText('');
    setProcedure('recommand');
  };

  const handleSearchFocus = () => {
    if (procedure == 'recommand') {
      setProcedure('category');
    } else {
      setProcedure('search');
    }
  };

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
      if (e.target.value.length > 0) {
        setProcedure('search');
      } else {
        setProcedure('category');
      }
    },
    [procedure],
  );

  return (
    <>
      <ButtonOpen onClick={showModal}>
        {templateText.createTemplate}
        <br />
        <Icon src={plusIcon} className="ml-[30px] mt-[20px]" />
      </ButtonOpen>
      <Modals
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Button type="primary" onClick={handleContents} className="seeTemplate">
          {templateText.preview}
        </Button>

        {procedure === 'select' ? (
          // "미리보기" 버튼 클릭 시 ModalContents 컴포넌트를 보여줍니다.
          <ModalContents />
        ) : (
          <>
            {/* 모달이 열릴 때 다른 컴포넌트를 보여줍니다. */}
            <SettingTemplet>
              <p className="settingtText">{templateText.settingText}</p>
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
                    onFocus={handleSearchFocus}
                    value={inputText}
                    onChange={handleChangeText}
                  />
                </InputBox>

                {PROCEDURE_MAPPER[procedure]}
              </SelectBox>
            </SettingTemplet>
          </>
        )}
      </Modals>
    </>
  );
};

const ButtonOpen = styled.div`
  cursor: pointer;
`;

const Modals = styled(Modal)`
  .ant-modal-content {
    width: 660px;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 106px;
  }

  .ant-modal-footer {
    position: absolute;
    right: 70px;
    top: 5px;
  }
`;

const ModalHeaders = styled.div`
  max-width: 600px;
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid gray;
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
  position: relative;
  top: 50px;

  .settingtText {
    width: 112px;
    margin: auto;
    margin-top: 14px;
    font-weight: 500;
    color: rgba(36, 147, 251, 1);
    position: absolute;
  }

  .seeTemplate {
    position: absolute;
    top: -60px;
    right: 50px;
  }
`;
const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top: 30px;
  padding-bottom: 100px;
`;
const InputBox = styled.div`
  width: 570px;
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
