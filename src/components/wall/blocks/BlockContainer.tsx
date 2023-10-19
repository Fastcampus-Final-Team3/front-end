import { useWallStore } from '@/store';
import DragHandle from '@/components/wall/blocks/DragHandle';
import trashIcon from '@/assets/icons/trash.svg';
import { produce } from 'immer';
import Icon from '@/components/common/Icon';

type BlockContainerProps = {
  children: React.ReactNode;
  blockName: string;
  blockUUID?: string;
};

export default function BlockContainer({
  blockUUID,
  children,
  blockName,
}: BlockContainerProps) {
  const { isEdit, wall, setWall } = useWallStore();

  const defaultBlocks =
    blockName === 'wallInfoBlock' || blockName === 'addButton';
  const templateBlock = blockName === 'templateBlock';
  const template = blockName === 'template';
  const blockStyleClassName = wall?.styleSetting?.blockSetting?.style;
  const blockBorderRadius = wall?.styleSetting?.blockSetting?.shape;
  const blockBackgroundColor = wall?.styleSetting?.blockSetting?.styleColor;
  const blockGradation = wall?.styleSetting?.blockSetting?.gradation;
  const templateBlockBackground = '#d1d0d0';

  const isDark = wall?.styleSetting?.themeSetting?.theme === 'dark';

  const handleDeleteBlock = () => {
    setWall(
      produce(wall, (draft) => {
        draft.blocks = draft.blocks.filter(
          (block) => block.blockUUID !== blockUUID,
        );
      }),
    );
  };

  return (
    <div
      className={`
      ${blockName === 'wallInfoBlock' && 'sm:overflow-hidden'}
      ${
        blockGradation &&
        !templateBlock &&
        'bg-gradient-to-t from-white to-[rgba(237, 248, 252, 0.20)]'
      }
      ${isEdit ? 'text-gray88' : isDark ? 'text-white' : 'text-lightBlack'}
      rounded-[${blockBorderRadius}]
      ${!templateBlock && blockStyleClassName}
      border-solid border-lightBlack relative`}
      style={{
        backgroundColor: templateBlock
          ? isEdit
            ? templateBlockBackground
            : 'transparent'
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
}
