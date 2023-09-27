import { useWallStore } from '@/store';
import DragHandle from '@/components/wall/blocks/DragHandle';
import trashIcon from '@/assets/icons/trash.svg';
import { produce } from 'immer';
import { Icon } from '@/components/common';

type BlockContainerProps = {
  children: React.ReactNode;
  blockName: string;
  blockUUID?: string;
};

export const BlockContainer = ({
  blockUUID,
  children,
  blockName,
}: BlockContainerProps) => {
  const { isEdit, wall, setWall } = useWallStore();

  const handleDeleteBlock = () => {
    setWall(
      produce(wall, (draft) => {
        draft.blocks = draft.blocks.filter(
          (block) => block.blockUUID !== blockUUID,
        );
      }),
    );
  };

  const defaultBlocks =
    blockName === 'wallInfoBlock' || blockName === 'addButton';
  const templateBlock = blockName === 'templateBlock';
  const template = blockName === 'template';
  const blockStyleClassName = wall?.styleSetting?.blockSetting?.style;
  const blockBorderRadius = wall?.styleSetting?.blockSetting?.shape;
  const blockBackgroundColor = wall?.styleSetting?.blockSetting?.styleColor;
  const templateBlockBackground = '#d1d0d0';

  return (
    <div
      className={`
      ${blockName === 'wallInfoBlock' && 'sm:overflow-hidden'}
      ${isEdit && 'text-gray88'}
      rounded-[${blockBorderRadius}]
      ${!templateBlock && blockStyleClassName}
      border-solid border-lightBlack relative
      `}
      style={{
        backgroundColor: templateBlock
          ? isEdit
            ? templateBlockBackground
            : ''
          : blockBackgroundColor,
        borderRadius: wall?.styleSetting?.blockSetting?.shape,
      }}
    >
      {isEdit && !defaultBlocks && (
        <>
          {blockName !== 'template' && <DragHandle />}
          {!templateBlock && !template && (
            <Icon
              src={trashIcon}
              className={
                'absolute right-[12px] top-[16px] sm:right-[26px] sm:top-[26px] hover '
              }
              onClick={handleDeleteBlock}
            />
          )}
        </>
      )}
      {children}
    </div>
  );
};
