import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { templateText } from '@/textConstants';
import axios from 'axios';
import { useMutation } from 'react-query';
import { SearchCarousel } from './SearchCarousel';

type ProductItem = {
  templateId: number;
  templateTitle: string;
  templateDescription: string;
};

type Props = {
  inputText: string;
};

const fetchSearchData = async (debouncedInputValue: string) => {
  const response = await axios.get(
    `/api/api/wall/templates?search=${debouncedInputValue}`,
  );
  return response.data.data.list;
};

export const SelecteSearchTemplate: React.FC<Props> = ({ inputText }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  //const [templateData, setTemplateData] = useState([]);

  useEffect(() => {
    // 입력값이 변경될 때마다 debounce된 값을 업데이트.
    const debounceTimer = setTimeout(() => {
      setDebouncedInputValue(inputText);
    }, 400); // 300 밀리초(0.3초) 디바운스 시간

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
              {item.templateTitle} <br />
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
  //background-color: #108fdd;
  max-height: 240px;
  overflow-y: auto;
`;

const ResultTemBox = styled.div`
  width: 100%;
  height: 90px;
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
    //background-color: #f31616;
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
