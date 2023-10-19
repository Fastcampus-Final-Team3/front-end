import styled from 'styled-components';
import { templateText } from '@/textConstants';
import { useTemplateStore } from '@/store';
import { FolderOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

export default function ModalContents() {
  const { selectedTemplate } = useTemplateStore();

  const toggleBoxData = [
    { label: templateText.final },
    { label: templateText.textSaveAccess },
    { label: templateText.isLogined },
  ];

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'CAREER':
        return '취업/이직';
      case 'EVENT':
        return '이벤트/일상';
      case 'PERSONAL':
        return '개인/소개';
      case 'ENTERPRISE':
        return '기업/근로양식';
      default:
        return '미분류';
    }
  };

  const categoryText = getCategoryText(selectedTemplate.category);

  const toggleBoxes = toggleBoxData.map((data, index) => (
    <div className="toggleBox" key={index}>
      <Switch />
      <p>{data.label}</p>
    </div>
  ));

  return (
    <div>
      <ContentsHeader>
        <p>{templateText.templateSetting}</p>
      </ContentsHeader>
      <ContentsCenter>
        <TitleBox>
          <h3>{templateText.templateTitle}</h3>
          <p>{selectedTemplate.templateTitle}</p>
        </TitleBox>
        <DescriptionBox>
          <h3>{templateText.templateDescription}</h3>
          <p>{selectedTemplate.templateDescription}</p>
        </DescriptionBox>
        <SelectFolder>
          <h3>{templateText.templateCategory}</h3>
          <div className="folderBox">
            <FolderOutlined />
            <p className="floderText">{categoryText}</p>
          </div>
        </SelectFolder>
        <ToggleBox>{toggleBoxes}</ToggleBox>
      </ContentsCenter>
    </div>
  );
}

const ContentsHeader = styled.div`
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

const ContentsCenter = styled.div`
  height: 400px;
  border: none;
  position: relative;
  top: 50px;
`;

const TitleBox = styled.div`
  padding-bottom: 10px;

  p {
    margin-top: 10px;
    font-size: 15px;
    font-weight: 800;
  }
`;
const DescriptionBox = styled(TitleBox)`
  margin-top: 10px;
`;
const SelectFolder = styled(DescriptionBox)`
  .folderBox {
    width: 200px;
    display: flex;
    margin-top: 10px;
  }

  .floderText {
    margin-left: 10px;
    margin-top: 2px;
  }
`;

const ToggleBox = styled.div`
  width: 50px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .toggleBox {
    display: flex;
    width: 300px;
  }

  p {
    font-size: 16px;
    color: rgba(45, 44, 56, 1);
    margin-left: 10px;
  }
`;
