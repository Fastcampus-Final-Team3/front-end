import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ListTemplete } from 'components/index';
import axios from 'axios';
import { useMutation } from 'react-query';

export interface Category {
  category: string;
  text: string;
}

const BookCategory: Category[] = [
  { category: 'PERSONAL', text: '개인/소개' },
  { category: 'EVENT', text: '이벤트/일상' },
  { category: 'ENTERPRISE', text: '기업/근로양식' },
  { category: 'CAREER', text: '취업/이직' },
];

const fetchTemplateData = async (category: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/wall/templates/lists?category=${category}`,
  );
  return response.data.data.list;
};

export const CategoryTemplate = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('PERSONAL');

  const { mutate } = useMutation(fetchTemplateData, {
    onMutate: () => {
      setIsLoading(true);
      setIsError(false);
    },
    onError: (error) => {
      setIsError(true);
      console.error('API 호출 에러:', error);
      setIsLoading(false);
    },
    onSuccess: (data) => {
      setCategoryList(data);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    mutate('PERSONAL');
  }, [mutate]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCategoryList([]);
    // 데이터를 다시 가져옵니다.
    mutate(category);
  };

  return (
    <CategoryLayout>
      <Categorybox>
        <ul className="Category-menu__text">
          {BookCategory.map((item) => (
            <li
              key={item.category}
              className={item.category === selectedCategory ? 'active' : ''}
              onClick={() => handleCategoryClick(item.category)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </Categorybox>
      <TemplateList>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching data</p>
        ) : (
          <ListTemplete list={categoryList} category={selectedCategory} />
        )}
      </TemplateList>
    </CategoryLayout>
  );
};

const CategoryLayout = styled.div`
  width: 100%;
  position: absolute;
  height: 500px;
  margin-top: 90px;
  border-top: 1px solid gray;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Categorybox = styled.div`
  width: 25%;
  height: inherit;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid gray;
  color: rgba(136, 136, 136, 1);

  .Category-menu__text {
    width: auto;
    margin: auto;
    padding: 10px;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      width: 130px;
      margin-top: 5px;
      border-radius: 20px;
      font-weight: 500;
      font-size: 18px;
      transition: background-color 0.3s;
      cursor: pointer;
    }
    .active {
      background-color: rgba(36, 147, 251, 1);
      font-weight: 700;
      color: #ffff;
    }
  }
`;

const TemplateList = styled.div`
  width: 75%;
  float: right;
  box-sizing: border-box;
  max-height: 500px;
  overflow-y: auto;
`;
