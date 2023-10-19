import useMemberInfo from '@/hooks/useMemberInfo';
import { useWallStore } from '@/store';
import { Button, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type WallHeaderEditButtonsProps = {
  tourPreviewRef?: React.MutableRefObject<null>;
  footer?: boolean;
  isNew?: boolean;
};

export default function WallHeaderEditButtons({
  tourPreviewRef,
  footer,
  isNew,
}: WallHeaderEditButtonsProps) {
  const navigate = useNavigate();
  const { wall, setIsEdit, isPreview, setIsPreview, isEdit } = useWallStore();
  const { memberInfo } = useMemberInfo();
  const newWall = { ...wall, spaceId: 1 };

  const updateWall = {
    ...wall,
    spaceId: 1,
    spaceWallId: 52,
    styleSetting: {
      ...wall.styleSetting,
      styleSettingBlockId: 1,
    },
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
      await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/wall-temporary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            ...wall,
            spaceId: memberInfo?.spaceWall.personal[0].spaceId,
          },
        }),
      });
      message.success('임시저장이 되었습니다.');
    } catch (error) {
      console.log(error);
      messageApi.error('임시저장에 실패했습니다.');
    } finally {
      navigate(`/space/personal`);
      setTempSaving(false);
      setIsEdit(false);
      setIsPreview(false);
    }
  };

  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/wall`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: isNew ? newWall : updateWall,
          }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        navigate(`/wall/${data.data.spaceWallId}`);
      }
    } catch (error) {
      console.log(error);
      messageApi.error({ content: '저장 실패' });
    } finally {
      setIsSaving(false);
      setIsEdit(false);
      setIsPreview(false);
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
            className="dm-14 text-blue border-blue"
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
