import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Radio } from 'antd';
import { useTemplateStore } from '@/store';
import { templateText } from '@/textConstants';

type TemplateData = {
  templateId: string;
  templateTitle: string;
  templateDescription: string;
};

type BestTemplateProps = {
  PERSONAL: string;
};

const fetchTemplateData = async (PERSONAL: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/wall/templates?category=${PERSONAL}`,
  );
  return response.data.data.list;
};

export const BestTemplate: React.FC<BestTemplateProps> = ({ PERSONAL }) => {
  const [templateData, setTemplateData] = useState<TemplateData[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedTemplate, setSelectedTemplate } = useTemplateStore();

  const { mutate } = useMutation(fetchTemplateData, {
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error) => {
      setIsError(true);
      console.error('API 호출 에러:', error);
      setIsLoading(false);
    },
    onSuccess: (data) => {
      setTemplateData(data);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    mutate('PERSONAL');
  }, [mutate]);

  const handleRadioChange = (item: TemplateData) => {
    const param = {
      category: PERSONAL,
      templateId: item.templateId,
      templateTitle: item.templateTitle,
      templateDescription: item.templateDescription,
    };
    setSelectedTemplate(param);
  };

  return (
    <>
      <TemplateHeader>
        <p>{templateText.recommendTemplate}</p>
      </TemplateHeader>
      <BestTemplateLayout>
        <TemplateContainer>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error fetching data</p>
          ) : (
            templateData.map((item) => (
              <TemplateBox key={item.templateId}>
                <TempalteHeaderBox>
                  <Radio
                    onChange={() => handleRadioChange(item)}
                    checked={
                      selectedTemplate &&
                      selectedTemplate.templateId === item.templateId
                    }
                  />
                  <p className="templateTitle">{item.templateTitle}</p>
                </TempalteHeaderBox>

                <h3>{item.templateDescription}</h3>
              </TemplateBox>
            ))
          )}
        </TemplateContainer>
      </BestTemplateLayout>
    </>
  );
};

const BestTemplateLayout = styled.div`
  width: 100%;
  margin-top: 50px;
`;
const TemplateHeader = styled.div`
  width: 110px;
  display: flex;
  top: 70px;
  position: absolute;
`;

const TemplateContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 300px;
  grid-template-rows: 90px 90px 90px;
  gap: 10px;
  grid-row-gap: 90px;
`;

const TemplateBox = styled.div`
  border-radius: 10px;
  margin-top: 20px;
  background-color: #f0f0f0;
  width: 300px;
  position: relative;
  padding: 10px;
  height: 170px;

  h3 {
    width: 270px;
    padding: 10px;
    padding-bottom: 20px;
    position: relative;
    font-size: 14px;
  }
`;

const TempalteHeaderBox = styled.div`
  width: inherit;
  display: flex;

  .templateTitle {
    width: inherit;
    color: rgba(45, 44, 56, 1);
    font-weight: 800;
    font-size: 16px;
    height: 30px;
  }
`;
