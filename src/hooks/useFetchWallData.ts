import { useUserStore, useWallStore } from '@/store';
import { BlockType, SubDatum } from '@/types/wall';
import { message } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import useCustomAxios from './useCustomAxios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  spaceId?: string,
) {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const customAxios = useCustomAxios();
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
          const response = await customAxios(`wall/${spaceId}/${wallId}`, {
            signal,
          });
          const wallData = response.data.data;
          setWall(wallData);
          return;
        }
        if (user) {
          const response = await customAxios(`wall/${wallId}`, {
            signal,
          });
          const wallData = response.data.data;
          setWall(wallData);
          return;
        }
        const response = await axios(
          `${import.meta.env.VITE_SERVER_BASE_URL}/wall/${wallId}`,
          {
            signal,
          },
        );
        const wallData = response.data.data;
        setWall(wallData);
        return;
      } catch (error) {
        // TODO : 에러 핸들링
        navigate('/notFound');
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
  }, []);

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
