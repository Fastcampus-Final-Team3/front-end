import useCustomAxios from '@/hooks/useCustomAxios';
import { useUserStore, useWallStore } from '@/store';
import { Button, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type WallHeaderEditButtonsProps = {
  tourPreviewRef?: React.MutableRefObject<null>;
  footer?: boolean;
  isNew?: boolean;
};

export default function WallHeaderSavingButtons({
  tourPreviewRef,
  footer,
  isNew,
}: WallHeaderEditButtonsProps) {
  const customAxios = useCustomAxios();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { wall, setIsEdit, isPreview, setIsPreview, isEdit } = useWallStore();
  const newWall = {
    ...wall,
    memberId: user?.memberId,
    spaceId: localStorage.getItem('spaceId'),
  };

  const updateWall = {
    ...wall,
    spaceId: localStorage.getItem('spaceId'),
  };

  const [tempSaving, setTempSaving] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handlePreview = () => {
    setIsPreview(!isPreview);
    setIsEdit(!isEdit);
  };

  const handleTempSave = async () => {
    setTempSaving(true);
    try {
      await customAxios.post(`wall-temporary`, {
        data: {
          ...wall,
          memberId: user?.memberId,
          spaceId: wall.spaceId,
        },
      });
      message.success('임시저장이 되었습니다.');
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/');
      setTempSaving(false);
      setIsEdit(false);
      setIsPreview(false);
    }
  };

  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async () => {
    setIsSaving(true);
    if (isNew) {
      try {
        const response = await customAxios.post('wall', {
          data: newWall,
        });
        navigate(`/wall/${response.data.data.spaceWallId}`);
      } catch (error) {
        console.log(error);
        messageApi.error({ content: '저장 실패' });
      } finally {
        setIsSaving(false);
        setIsEdit(false);
        setIsPreview(false);
      }
    } else {
      try {
        await customAxios.put(`wall`, {
          data: updateWall,
        });
        navigate(`/wall/${wall.shareURL}`);
      } catch (error) {
        console.log(error);
        messageApi.error({ content: '저장 실패' });
      } finally {
        setIsSaving(false);
        setIsEdit(false);
        setIsPreview(false);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className={`gap-[8px] sm:flex ${footer ? 'flex' : 'hidden'}`}>
        <Button
          className="dm-14 text-gray88 border-gray88"
          onClick={handlePreview}
          ref={tourPreviewRef}
        >
          {isPreview ? '미리보기 종료' : '미리보기'}
        </Button>
        {!isPreview && (
          <Button
            className={`dm-14 text-blue border-blue
            ${isNew && 'hidden'}
            `}
            onClick={handleTempSave}
            loading={tempSaving}
          >
            임시저장
          </Button>
        )}

        <Button
          className="
        dm-14 text-white"
          type="primary"
          onClick={handleSave}
          loading={isSaving}
          disabled={isSaving}
        >
          저장
        </Button>
      </div>
    </>
  );
}
