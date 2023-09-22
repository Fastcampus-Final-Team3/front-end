import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BestTemplate } from 'components/index';

interface ProductItem {
  id: number;
  title: string;
  description: string;
  tag: string;
}

interface Props {
  inputText: string;
}

export const SelecteSearchTemplate: React.FC<Props> = ({ inputText }) => {
  const [product, setProductInfo] = useState<ProductItem[]>([]);
  const [filteredResults, setFilteredResults] = useState<ProductItem[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:3003/list');
        if (response.ok) {
          const data = await response.json();
          setProductInfo([...product, ...data]);
        } else {
          console.error('Response not OK:', response);
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const filteredResults = product.filter((item) =>
      item.title.toLowerCase().includes(inputText.toLowerCase()),
    );
    setFilteredResults(filteredResults);
  }, [inputText, product]);

  return (
    <>
      <SeleteContainer>
        <h3>검색결과</h3>
        <ResultBox>
          {filteredResults.map((item) => (
            <ResultTemBox key={item.id}>{item.title}</ResultTemBox>
          ))}
        </ResultBox>
        <BestTemplate />
      </SeleteContainer>
    </>
  );
};

const SeleteContainer = styled.div`
  width: 100%;
  //background-color: orange;
  margin-top: 100px;
  position: absolute;

  h3 {
    font-weight: 800;
  }
`;

const ResultBox = styled.div`
  width: 90%;
  height: 210px;
  margin: auto;
  //background-color: #108fdd;
  max-height: 200px;
  overflow-y: auto;
`;

const ResultTemBox = styled.div`
  width: 100%;
  height: 90px;
  background-color: gray;
  border-radius: 10px;
  margin-top: 10px;
`;
