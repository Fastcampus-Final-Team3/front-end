import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, message } from 'antd';
import { CATEGORIES } from '@/data/constants/category';
import { useWallStore } from '@/store';
import { DEFAULT_WALL } from '@/data/constants/blocks';
import { CategoryCard } from './CategoryCard';

export default function CategoryPage() {
  const { setWall, setIsEdit } = useWallStore();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCreateWall = async () => {
    if (!selectedCategory) {
      messageApi.error('카테고리를 선택해주세요.');
      return;
    }
    setWall({
      ...DEFAULT_WALL[selectedCategory],
      shareURL: crypto.randomUUID().replace(/-/g, ''),
      isPublic: true,
      category: selectedCategory,
      memberId: '1',
    });
    setIsEdit(true);
    navigate(`/wall/new`, { state: { isNew: true } });
  };

  return (
    <div className="h-[calc(100vh-70px)] items-center flex flex-col justify-center text-lightBlack">
      {contextHolder}
      <div className="flex flex-col px-[24px]">
        <div>
          <div className="text-[20px] sm:text-[24px]">
            생성하기 원하는 페이지의
          </div>
          <div className="text-[24px] sm:text-[34px] font-bold mt-[10px]">
            카테고리를 선택 해주세요
          </div>
        </div>

        <ul className="sm:flex sm:items-center sm:gap-[20px] mt-[20px] sm:mt-[80px] flex-wrap grid grid-cols-2 gap-[8px] items-center">
          {CATEGORIES.map((category, index) => (
            <CategoryCard
              key={index}
              category={category.value}
              label={category.kor}
              imageSrc={category.src}
              onSelectCategory={handleSelectCategory}
              isSelected={category.value === selectedCategory}
            />
          ))}
        </ul>

        <Button
          className="dm-24 text-gray88 mt-[100px] rounded-full h-[65px] w-[158px] self-end hidden sm:block"
          onClick={handleCreateWall}
        >
          작성하기
        </Button>
      </div>
    </div>
  );
}
