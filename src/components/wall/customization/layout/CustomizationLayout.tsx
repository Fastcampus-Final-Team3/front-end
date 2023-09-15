import { Button } from 'antd';
import brushIcon from '@/assets/icons/brush.svg';
import { CustomizationModal } from '../customizationInner/CustomizationModal.1';
import { useState } from 'react';

export const CustomizationLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CustomizationModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <Button
        className="flex items-center justify-center gap-[6px] w-[174px] h-[62px] rounded-full fixed bottom-10 right-10"
        onClick={() => setIsModalOpen(true)}
      >
        <img src={brushIcon} alt="brush icon" />
        스타일 설정
      </Button>
    </>
  );
};
