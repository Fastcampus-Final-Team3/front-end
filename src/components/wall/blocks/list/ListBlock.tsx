import { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useWallStore } from '@/store';
import { produce } from 'immer';
import editThickIcon from '@/assets/icons/edit-thick.svg';
import plusIcon from '@/assets/icons/plus.svg';
import BlockContainer from '../BlockContainer';
import Icon from '@/components/common/Icon';
import SingleList from './SingleList';

type ListBlockProps = {
  blockUUID?: string;
};

export default function ListBlock({ blockUUID }: ListBlockProps) {
  const { isEdit, wall, setWall } = useWallStore();
  const [isListTitleEdit, setIsListTitleEdit] = useState(false);

  useEffect(() => {
    setIsListTitleEdit(false);
  }, [isEdit]);

  const targetListBlockIndex = wall.blocks.findIndex(
    (block) => block.blockUUID === blockUUID,
  );
  const targetListBlock = wall.blocks[targetListBlockIndex];

  const handleListTile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWall(
      produce(wall, (draft) => {
        draft.blocks[targetListBlockIndex].subData[0].listLabel =
          e.target.value;
      }),
    );
  };

  const handleAddList = () => {
    setWall(
      produce(wall, (draft) => {
        if (targetListBlockIndex !== -1) {
          const newList = {
            listUUID: crypto.randomUUID(),
            listLabel: '',
            listTitle: '',
            listDescription: '',
            isLink: false,
          };
          draft.blocks[targetListBlockIndex].subData.push(newList);
        }
      }),
    );
  };

  if (targetListBlockIndex === -1) {
    return null;
  }
  return (
    <BlockContainer blockName="listBlock" blockUUID={blockUUID}>
      <div className="p-block flex flex-col">
        <div className="flex items-center gap-[6px] db-18 sm:db-20 mb-[16px]">
          {isListTitleEdit && isEdit ? (
            <Input
              placeholder="리스트블록 제목을 입력해주세요."
              value={targetListBlock.subData[0].listLabel}
              onChange={handleListTile}
              className="w-1/2 px-1 py-0"
            />
          ) : (
            <>
              {targetListBlock.subData[0].listLabel ||
                '리스트블록 제목을 입력해주세요.'}
            </>
          )}
          {isEdit && (
            <Icon
              src={editThickIcon}
              onClick={() => setIsListTitleEdit((prev) => !prev)}
              className="hover"
            />
          )}
        </div>

        <div className="flex flex-col sm:gap-[30px] gap-[24px]">
          {targetListBlock.subData.map((list, id) => (
            <SingleList
              id={id}
              key={list.listUUID}
              targetListBlockIndex={targetListBlockIndex}
              listUUID={list.listUUID}
              listTitle={list.listTitle}
              listDescription={list.listDescription}
              isLink={list.isLink}
            />
          ))}
        </div>

        {isEdit && (
          <div className="w-full text-center">
            <Icon
              src={plusIcon}
              onClick={handleAddList}
              className="mt-[20px] hover"
            />
          </div>
        )}
      </div>
    </BlockContainer>
  );
}
