import { useWallStore } from '@/store';
import { Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import editIcon from '@/assets/icons/edit.svg';
import minusIcon from '@/assets/icons/minus.svg';
import Icon from '@/components/common/Icon';

type SingleListProps = {
  id: number;
  targetListBlockIndex: number;
  listUUID?: string;
  listTitle?: string;
  listDescription?: string;
  isLink?: boolean;
};

export default function SingleList({
  id,
  targetListBlockIndex,
  listUUID,
  listTitle,
  listDescription,
  isLink,
}: SingleListProps) {
  const { wall, setWall, isEdit } = useWallStore();

  const [isListDescEdit, setIsListDescEdit] = useState(false);

  useEffect(() => {
    setIsListDescEdit(false);
  }, [isEdit]);

  const handleListTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWall(
      produce(wall, (draft) => {
        if (targetListBlockIndex !== -1) {
          const targetListIndex = draft.blocks[
            targetListBlockIndex
          ].subData.findIndex((list) => list.listUUID === listUUID);
          if (targetListIndex !== -1) {
            draft.blocks[targetListBlockIndex].subData[
              targetListIndex
            ].listTitle = e.target.value;
          }
        }
      }),
    );
  };

  const handleListDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWall(
      produce(wall, (draft) => {
        if (targetListBlockIndex !== -1) {
          const targetListIndex = draft.blocks[
            targetListBlockIndex
          ].subData.findIndex((list) => list.listUUID === listUUID);
          if (targetListIndex !== -1) {
            draft.blocks[targetListBlockIndex].subData[
              targetListIndex
            ].listDescription = e.target.value;
          }
        }
      }),
    );
  };

  const handleIsLink = (e: CheckboxChangeEvent) => {
    setWall(
      produce(wall, (draft) => {
        if (targetListBlockIndex !== -1) {
          const targetListIndex = draft.blocks[
            targetListBlockIndex
          ].subData.findIndex((list) => list.listUUID === listUUID);
          if (targetListIndex !== -1) {
            draft.blocks[targetListBlockIndex].subData[targetListIndex].isLink =
              e.target.checked;
          }
        }
      }),
    );
  };

  const handleDeleteList = () => {
    setWall(
      produce(wall, (draft) => {
        if (targetListBlockIndex !== -1) {
          draft.blocks[targetListBlockIndex].subData = draft.blocks[
            targetListBlockIndex
          ].subData.filter((list) => list.listUUID !== listUUID);
        }
      }),
    );
  };
  return (
    <div className="space-y-2 dm-16">
      {!isEdit && (
        <div className="flex items-center gap-[12px]">
          <span className="db-16">{listTitle || '제목'}</span>
          <span className="relative -top-[2.3px] db-16">|</span>
          {isLink ? (
            <a href={listDescription} target="_blank">
              {listDescription}
            </a>
          ) : (
            <span className="dm-16">{listDescription || '내용'}</span>
          )}
        </div>
      )}

      {isEdit && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[6px]">
              {isListDescEdit ? (
                <Input
                  placeholder="제목"
                  value={listTitle}
                  onChange={handleListTitle}
                  className="py-0 px-1 w-1/2"
                />
              ) : (
                <span>{listTitle || '제목'}</span>
              )}
              <Icon
                src={editIcon}
                onClick={() => setIsListDescEdit((prev) => !prev)}
                className="hover"
              />
            </div>

            <Icon
              src={minusIcon}
              onClick={handleDeleteList}
              className={`${id === 0 && 'hidden'} mr-[16px] hover`}
            />
          </div>
          <Input
            placeholder="내용"
            value={listDescription}
            onChange={handleListDescription}
            className="h-[50px]"
          />
          <Checkbox onChange={handleIsLink} checked={isLink}>
            링크
          </Checkbox>
        </>
      )}
    </div>
  );
}
