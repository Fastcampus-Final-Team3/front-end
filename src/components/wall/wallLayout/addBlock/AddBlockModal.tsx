import { ADDABLE_BLOCKS, DEFAULT_BLOCKS } from '@/data/constants/blocks';
import { useWallStore } from '@/store';
import { Modal, message } from 'antd';
import { produce } from 'immer';
import { useState } from 'react';
import { ModalHeader } from '@/components/common/ModalHeader';
import { Block, BlockType, SubDatum } from '@/types/wall';
import AddableBlock from './AddableBlock';

interface AddBlockModalProps {
  setIsAddBlockModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddBlockModalOpen: boolean;
}

export default function AddBlockModal({
  setIsAddBlockModalOpen,
  isAddBlockModalOpen,
}: AddBlockModalProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const [selectedBlock, setSelectedBlock] = useState('');

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBlock(e.target.value);
  };

  const { wall, setWall } = useWallStore();
  const hasSnsBlock = wall?.blocks?.some(
    (block) => block.blockType === 'snsBlock',
  );

  const handleCloseModal = () => {
    setIsAddBlockModalOpen(false);
    setSelectedBlock('');
  };

  const handleAddBLock = () => {
    if (!selectedBlock) {
      messageApi.error('추가할 블록을 선택해주세요.');
      return;
    }
    setWall(
      produce(wall, (draft) => {
        const newBlock: Block = {
          blockType: selectedBlock as BlockType,
          blockUUID: crypto.randomUUID(),
          subData: DEFAULT_BLOCKS[selectedBlock] as SubDatum[],
        };
        draft.blocks.push(newBlock);
      }),
    );
    messageApi.success('블록을 추가하였습니다.');
    setIsAddBlockModalOpen(false);
    setSelectedBlock('');
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered
        closeIcon={false}
        title={
          <ModalHeader
            title="항목 추가하기"
            handleCloseModal={handleCloseModal}
            handleOk={handleAddBLock}
          />
        }
        footer={null}
        open={isAddBlockModalOpen}
        onCancel={handleCloseModal}
        width="560px"
      >
        <div className="grid grid-cols-2 gap-x-[24px] gap-y-[32px] ">
          {Object.keys(ADDABLE_BLOCKS).map((block) => (
            <AddableBlock
              hasSnsBlock={hasSnsBlock}
              key={block}
              block={block}
              handleSelect={handleSelect}
              selectedBlock={selectedBlock}
            />
          ))}
        </div>
      </Modal>
    </>
  );
}
