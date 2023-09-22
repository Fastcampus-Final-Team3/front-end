import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ListTemplete } from 'components/index';

export interface Category {
  category: string;
  text: string;
}

const BookCategory: Category[] = [
  { category: 'self', text: '개인/소개' },
  { category: 'event', text: '이벤트/일상' },
  { category: 'company', text: '기업/근로양식' },
  { category: 'employment', text: '취업/이직' },
];

export const CategoryTemplate = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('self');

  useEffect(() => {
    // 페이지 로딩 시 'self' 타입의 데이터를 가져옴
    getListData('self');
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 함

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    getListData(category);
    setModalContent();
  };

  const getListData = async (category) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/${category}`,
      );
      if (response.ok) {
        const data = await response.json();
        // 'data' 객체 안의 'list'를 사용하여 카테고리별 데이터에 접근
        setCategoryList([...data]);
      } else {
        console.error('API 호출 실패:', response.status);
      }
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

  return (
    <CategoryLayout>
      <Categorybox>
        <ul className="Category-menu__text">
          {BookCategory.map((item, index) => (
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
        <ListTemplete list={categoryList} category={selectedCategory} />
      </TemplateList>
    </CategoryLayout>
  );
};

const CategoryLayout = styled.div`
  width: 100%;
  position: absolute;
  height: 500px;
  margin-top: 90px;
  //padding-bottom: 10px;
  //background-color: yellow;
  border-top: 1px solid gray;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Categorybox = styled.div`
  width: 20%;
  height: inherit;
  float: left;
  box-sizing: border-box;
  //background-color: aqua;
  border-right: 1px solid gray;
  color: black;

  .Category-menu__text {
    width: 110px;
    margin: auto;
    padding-bottom: 10px;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 6.8rem;
      margin-top: 5px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 15px;
      transition: background-color 0.3s;
      cursor: pointer;
    }
    .active {
      background-color: #15c6b7;
    }
  }
`;

const TemplateList = styled.div`
  width: 80%;
  float: right;
  box-sizing: border-box;
  //background-color: blue;
  max-height: 500px;
  overflow-y: auto;
`;
