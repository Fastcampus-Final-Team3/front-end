import { Modal, message } from 'antd';
import React, { useState } from 'react';
import { ADDABLE_SNSS } from '@/data/constants/blocks';
import SnsModalInput from './SnsModalInput';
import { ModalHeader } from '@/components/common/ModalHeader';
import { useWallStore } from '@/store';
import { produce } from 'immer';
import { SnsBlockSubData } from './SnsBlock';
import Icon from '@/components/common/Icon';

interface SnsBlockModalProps {
  unregisteredSns: string[];
  isSnsModalOpen: boolean;
  setIsSnsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SnsBlockModal = ({
  unregisteredSns,
  isSnsModalOpen,
  setIsSnsModalOpen,
}: SnsBlockModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { wall, setWall } = useWallStore();

  const [selectedSns, setSelectedSns] = useState('');
  const [snsInput, setSnsInput] = useState('');

  const handleCloseSnsModal = () => {
    setIsSnsModalOpen(false);
    setSelectedSns('');
    setSnsInput('');
  };

  const handleOk = () => {
    const newSns: SnsBlockSubData = {
      snsUUID: crypto.randomUUID(),
      snsType: selectedSns,
      snsURL: `https://${ADDABLE_SNSS[selectedSns].url}${snsInput}`,
    };
    const snsBlockIndex = wall.blocks.findIndex(
      (block) => block.blockType === 'snsBlock',
    );
    if (snsBlockIndex !== -1) {
      setWall(
        produce(wall, (draft) => {
          draft.blocks[snsBlockIndex].subData.push(newSns);
        }),
      );
    }
    messageApi.success('SNS 계정을 연결했습니다.');
    setIsSnsModalOpen(false);
    setSnsInput('');
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered
        closeIcon={false}
        title={
          <ModalHeader
            title="SNS 연결하기"
            handleCloseModal={handleCloseSnsModal}
            handleOk={handleOk}
          />
        }
        footer={null}
        open={isSnsModalOpen}
        onCancel={handleCloseSnsModal}
        width="520px"
      >
        <div className="flex gap-[24px] justify-center pt-[18px] sm:pt-[24px]">
          {unregisteredSns.map((sns) => (
            <div key={sns} className="flex flex-col items-center gap-[8px]">
              <Icon
                src={ADDABLE_SNSS[sns].svg}
                onClick={() => setSelectedSns(sns)}
                className={`rounded-full hover w-[60px] h-[60px] ${
                  selectedSns === sns && 'ring-[3px] ring-offset-2 ring-blue'
                }`}
              />
              <p className={`dm-12 ${selectedSns !== sns && 'text-gray88'}`}>
                {ADDABLE_SNSS[sns].title}
              </p>
            </div>
          ))}
        </div>
        {selectedSns && (
          <SnsModalInput
            sns={selectedSns}
            snsInput={snsInput}
            setSnsInput={setSnsInput}
          />
        )}
      </Modal>
    </>
  );
};
