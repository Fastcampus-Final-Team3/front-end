import { BlockContainer } from '../..';
import plusIcon from '@/assets/icons/plus.svg';
import { Icon } from '@/components/common';

type AddBlockButtonProps = {
  setIsAddBlockModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addBlockButtonRef: React.MutableRefObject<null>;
};

export const AddBlockButton = ({
  setIsAddBlockModalOpen,
  addBlockButtonRef,
}: AddBlockButtonProps) => {
  return (
    <BlockContainer blockName="addButton">
      <div
        ref={addBlockButtonRef}
        onClick={() => setIsAddBlockModalOpen(true)}
        className="dm-16 hover flex justify-center items-center h-[76px]"
      >
        <span>항목 추가하기</span>
        <Icon src={plusIcon} className="ml-[6px]" />
      </div>
    </BlockContainer>
  );
};
