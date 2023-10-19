import { Button, Popconfirm } from 'antd';
import { useMemo, useState } from 'react';
import { useWallStore } from '@/store';
import { ADDABLE_SNSS } from '@/data/constants/blocks';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { produce } from 'immer';
import { SubDatum } from '@/types/wall';
import { SnsBlockModal } from './SnsBlockModal';
import BlockContainer from '../BlockContainer';
import Icon from '@/components/common/Icon';

export type SnsBlockSubData = Pick<
  SubDatum,
  'snsBlockId' | 'snsUUID' | 'snsURL' | 'snsType'
>;

type SnsBlockProps = {
  blockUUID?: string;
  subData?: SnsBlockSubData[];
};

export default function SnsBlock({
  blockUUID,
  subData: snsData,
}: SnsBlockProps) {
  const { isEdit, wall, setWall } = useWallStore();

  const [isSnsModalOpen, setIsSnsModalOpen] = useState(false);

  const unregisteredSns = useMemo(
    () =>
      Object.keys(ADDABLE_SNSS).filter(
        (sns) =>
          !(snsData as SnsBlockSubData[])
            .map((sns) => sns.snsType)
            .includes(sns),
      ),
    [snsData],
  );

  const handleClickSnsIcons = (snsUrl: string) => {
    !isEdit && window.open(snsUrl, '_blank');
  };

  const handleDeleteSingleSns = (snsUUID: string) => {
    const snsBlockIndex = wall.blocks.findIndex(
      (block) => block.blockType === 'snsBlock',
    );
    if (snsBlockIndex !== -1) {
      setWall(
        produce(wall, (draft) => {
          draft.blocks[snsBlockIndex].subData = draft.blocks[
            snsBlockIndex
          ].subData.filter((sns) => sns.snsUUID !== snsUUID);
        }),
      );
    }
  };

  return (
    <BlockContainer blockName="snsBlock" blockUUID={blockUUID}>
      <div className="p-block">
        {isEdit && (
          <div className="flex items-end gap-[8px] mb-[23px]">
            <p className="db-18 sm:db-20">SNS 연결</p>
            <p className="dm-14 sm:dm-26 -translate-x-1">
              보여주고 싶은 SNS를 연결해주세요!
            </p>
          </div>
        )}

        <div className="flex gap-[16px] sm:gap-[16px] justify-center">
          {snsData?.map((sns) => (
            <Popconfirm
              key={sns.snsUUID}
              title="SNS 연결해제"
              description={`정말로 ${sns.snsType} 연결을 해제하시겠습니까?`}
              showCancel={false}
              onConfirm={() => handleDeleteSingleSns(sns.snsUUID as string)}
              disabled={!isEdit}
              okButtonProps={{ danger: true }}
              okText="해제"
            >
              <div
                key={sns.snsBlockId}
                className="relative rounded-full group overflow-hidden hover"
              >
                <Icon
                  src={ADDABLE_SNSS[sns.snsType as string]?.svg}
                  className="w-[44px] h-[44px] sm:w-[60px] sm:h-[60px] rounded-full"
                  onClick={() => handleClickSnsIcons(sns.snsURL as string)}
                />
                {isEdit && (
                  <CloseOutlined className="group-hover:block hidden absolute top-[14px] left-[14px] sm:top-[21.5px] sm:left-[21.5px]" />
                )}
              </div>
            </Popconfirm>
          ))}
          {isEdit && unregisteredSns.length > 0 && (
            <Button
              shape="circle"
              className="w-[44px] h-[44px] sm:w-[60px] sm:h-[60px] flex justify-center items-center"
              onClick={() => setIsSnsModalOpen(true)}
            >
              <PlusOutlined />
            </Button>
          )}

          <SnsBlockModal
            unregisteredSns={unregisteredSns}
            isSnsModalOpen={isSnsModalOpen}
            setIsSnsModalOpen={setIsSnsModalOpen}
          />
        </div>
      </div>
    </BlockContainer>
  );
}
