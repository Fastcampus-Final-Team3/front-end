import { customAxios } from '@/api/customAxios';
import { useUserStore, useWallStore } from '@/store';
import { BlockType, SubDatum } from '@/types/wall';
import { message } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';

type SortableBlockType = {
  id: string;
  block: JSX.Element;
  subData: SubDatum[];
}[];

export default function useFetchWallData(
  BlockMapper: {
    listBlock: JSX.Element;
    fileBlock: JSX.Element;
    snsBlock: JSX.Element;
    templateBlock: JSX.Element;
    freeBlock: JSX.Element;
  },
  isNew?: boolean,
  wallId?: string,
  spaceId?: number,
) {
  const { user } = useUserStore();
  const [messageApi, contextHolder] = message.useMessage();
  const { wall, setWall, isEdit } = useWallStore();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [sortableBlocks, setSortableBlocks] = useState<SortableBlockType>([]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getData = async () => {
      try {
        setLoading(true);

        if (Number(wallId)) {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_BASE_URL}/wall/${spaceId}/${wallId}`,
            {
              signal,
              headers: {
                Authorization: `Bearer ${user?.accessToken}`,
                'Content-Type': 'application/json',
              },
            },
          );
          if (!response.ok) {
            throw new Error('error while data fetching');
          }
          const wallData = await response.json();
          setWall(wallData.data);
        } else {
          const response = await customAxios(`/wall/shareURL/${wallId}`, {
            signal,
          });
          console.log(response);
          // const wallData = await response.json();
          // setWall(wallData.data);
        }
      } catch (error) {
        // TODO : 에러 핸들링
        console.log(error);
        setError(error as Error);
        messageApi.error({ content: 'data fetching error' });
      } finally {
        setLoading(false);
      }
    };
    !isNew && getData();

    return () => {
      abortController.abort();
    };
  }, [isNew, messageApi, setWall, wallId]);

  useEffect(() => {
    if (wall.blocks) {
      const objToComponent = wall.blocks.map((block) => {
        const { blockType, blockUUID, subData } = block;
        const component = BlockMapper[blockType as BlockType];
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

  return {
    wall,
    error,
    loading,
    contextHolder,
    isEdit,
    setWall,
    sortableBlocks,
    setSortableBlocks,
  };
}
