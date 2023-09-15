import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReactSortable, Sortable } from 'react-sortablejs';
import { useWallStore } from '@/store';
import { produce } from 'immer';
import {
  WallHeader,
  ProfileBlock,
  ModalOpen,
  AddBlockModal,
} from 'components/index';
import {
  FileBlock,
  SnsBlock,
  FreeBlock,
  ListBlock,
  TemplatesBlock,
} from 'components/wall/blocks/index';
import React from 'react';
import { SubDataClassType, SubDatumType, WallType } from '@/types/wall';
import { message } from 'antd';
import { CustomizationLayout } from 'components/index';
import { AddBlockButton } from './wallLayout/addBlock/AddBlockButton';

const BlockMapper: { [key: string]: JSX.Element } = {
  listBlock: <ListBlock />,
  fileBlock: <FileBlock />,
  snsBlock: <SnsBlock />,
  templatesBlock: <TemplatesBlock />,
  freeBlock: <FreeBlock />,
};

export const WallPage = () => {
  // const category: CategoryType = 'career';

  const { wallId } = useParams();

  const [messageApi, contextHolder] = message.useMessage();

  const { wall, setWall, isEdit } = useWallStore();

  const [isAddBlockModalOpen, setIsAddBlockModalOpen] = useState(false);

  // wall data fetching
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/wall');
        if (response.ok) {
          const wallData = (await response.json()) as WallType;
          setWall(wallData);
        }
      } catch (error) {
        console.log(error);
        messageApi.error({ content: 'data fetching error' });
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [messageApi, setWall]);

  const [sortableBlocks, setSortableBlocks] = useState<
    {
      id: string;
      block: JSX.Element;
      subData: SubDatumType[] | SubDataClassType;
    }[]
  >([]);

  useEffect(() => {
    if (wall.blocks) {
      const objToComponent = wall.blocks.map((block) => {
        const { blockType, blockUUID, subData } = block;
        const component = BlockMapper[blockType];
        return React.cloneElement(component, {
          blockType,
          blockUUID,
          subData,
        });
      });
      setSortableBlocks(
        objToComponent.map((block) => ({
          block,
          id: block.props.blockUUID,
          subData: block.props.subData,
        })),
      );
    }
  }, [wall]);

  const handleSortBlocks = (event: Sortable.SortableEvent) => {
    const item = sortableBlocks.splice(event.oldIndex as number, 1)[0];
    sortableBlocks.splice(event.newIndex as number, 0, item);
    const compToObj = sortableBlocks.map((comp) => ({
      blockUUID: comp.id,
      blockType: comp.block.props.blockType,
      subData: comp.block.props.subData,
    }));
    setWall(
      produce(wall, (draft) => {
        draft.blocks = compToObj;
      }),
    );
  };

  return (
    <div
      className={`min-h-screen bg-gray flex flex-col`}
      style={{ backgroundColor: wall?.style?.background?.color }}
    >
      {contextHolder}
      <WallHeader wallId={wallId} />

      {loading ? (
        <div className="py-[106px] ">loading...</div>
      ) : (
        <main className="py-[106px] flex-1 flex flex-col gap-[24px] w-[866px] mx-auto">
          <ProfileBlock />
          <ReactSortable
            list={sortableBlocks}
            setList={setSortableBlocks}
            handle=".handle"
            className="flex gap-[24px] flex-col"
            animation={400}
            forceFallback
            onEnd={handleSortBlocks}
          >
            {sortableBlocks?.map((item) => (
              <div key={item.id}>{item.block}</div>
            ))}
          </ReactSortable>
          <AddBlockButton setIsAddBlockModalOpen={setIsAddBlockModalOpen} />
          <AddBlockModal
            isAddBlockModalOpen={isAddBlockModalOpen}
            setIsAddBlockModalOpen={setIsAddBlockModalOpen}
          />
          <ModalOpen />
          {isEdit && <CustomizationLayout />}
        </main>
      )}
    </div>
  );
};
