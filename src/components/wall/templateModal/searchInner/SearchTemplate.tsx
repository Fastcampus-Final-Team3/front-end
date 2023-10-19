import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { templateText } from '@/textConstants';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Radio } from 'antd';
import { useTemplateStore } from '@/store';
import SearchCarousel from './SearchCarousel';

type ProductItem = {
  templateId: string;
  templateTitle: string;
  templateDescription: string;
};

type Props = {
  inputText: string;
};

const fetchSearchData = async (debouncedInputValue: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/wall/templates?search=${debouncedInputValue}`,
  );
  return response.data.data.list;
};

export const SelecteSearchTemplate: React.FC<Props> = ({ inputText }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const { selectedTemplate, setSelectedTemplate } = useTemplateStore();

  useEffect(() => {
    // 입력값이 변경될 때마다 debounce된 값을 업데이트.
    const debounceTimer = setTimeout(() => {
      setDebouncedInputValue(inputText);
    }, 500); // 300 밀리초(0.3초) 디바운스 시간

    return () => {
      // 이전 타이머를 클리어.
      clearTimeout(debounceTimer);
    };
  }, [inputText]);

  const { mutate } = useMutation(fetchSearchData, {
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error) => {
      setIsError(true);
      console.error('API 호출 에러:', error);
      setIsLoading(false);
    },
    onSuccess: (data) => {
      setProducts(data);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (debouncedInputValue) {
      mutate(debouncedInputValue);
    } else {
      setProducts([]);
    }
  }, [debouncedInputValue]);

  const handleRadioChange = (item: ProductItem) => {
    const param = {
      category: '',
      templateId: item.templateId,
      templateTitle: item.templateTitle,
      templateDescription: item.templateDescription,
    };
    setSelectedTemplate(param);
  };

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) {
    return (
      <>
        <ResultContainer>
          <p>검색 결과가 없습니다😥</p>
        </ResultContainer>
        <SearchBestContainer>
          <p>🎈추천 템플릿</p>
          <SearchCarousel />
        </SearchBestContainer>
      </>
    );
  }
  return (
    <>
      <SeleteContainer>
        <h3>{templateText.inputResult}</h3>
        <ResultBox>
          {products?.map((item) => (
            <ResultTemBox key={item.templateId}>
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
              {item.templateDescription}
            </ResultTemBox>
          ))}
        </ResultBox>
      </SeleteContainer>
      <SearchBestContainer>
        <p>🎈추천 템플릿</p>
        <SearchCarousel />
      </SearchBestContainer>
    </>
  );
};

const ResultContainer = styled.div`
  width: 100%;
  height: 400px;
  padding-bottom: 70px;
  //background-color: rebeccapurple;
  margin-top: 50px;

  p {
    width: 200px;
    margin-top: 100px;
  }
`;

const SeleteContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  position: relative;

  h3 {
    font-weight: 800;
  }
`;

const ResultBox = styled.div`
  width: 100%;
  height: 240px;
  max-height: 240px;
  overflow-y: auto;
`;

const ResultTemBox = styled.div`
  width: 100%;
  height: 130px;
  background-color: #f0f0f0;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
`;

const SearchBestContainer = styled.div`
  width: 620px;
  top: 400px;
  position: absolute;
  right: -15px;

  .calrouselBox {
    width: inherit;
    padding-bottom: 70px;
  }

  :where(.css-dev-only-do-not-override-847yc7).ant-carousel .slick-dots li {
    background-color: #f0f0f0;
  }

  :where(.css-dev-only-do-not-override-847yc7).ant-carousel
    .slick-dots
    li.slick-active
    button {
    background: #7d7c7c;
    opacity: 1;
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
