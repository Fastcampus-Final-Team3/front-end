import { DEFAULT_WALL } from '@/data/constants/blocks';
import { useWallStore } from '@/store';
import { MemberInfo } from '@/types/home';
import { Button, Modal, message } from 'antd';
import { useNavigate } from 'react-router-dom';

type ConfirmCancelModalProps = {
  setIsTempModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isTempModalOpen: boolean;
  memberInfo: MemberInfo | null;
  spaceWallId?: number;
};

export default function TempSaveModal({
  setIsTempModalOpen,
  isTempModalOpen,
  memberInfo,
  spaceWallId,
}: ConfirmCancelModalProps) {
  const { setWall, setIsEdit } = useWallStore();

  const navigate = useNavigate();

  const handleDeleteTemp = async () => {
    setIsTempModalOpen(false);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/wall-temporary`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            memberId: memberInfo?.member.memberId,
            spaceId: memberInfo?.spaceWall.personal[0].spaceId,
          }),
        },
      );
      if (res.ok) {
        message.success('임시저장 데이터를 삭제했습니다.');
        navigate('/category');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinueTemp = async () => {
    setIsTempModalOpen(false);

    setWall({
      ...DEFAULT_WALL['temp'],
      shareURL: crypto.randomUUID().replace(/-/g, ''),
      isPublic: true,
      category: 'personal',
      memberId: '1',
    });
    setIsEdit(true);
    navigate(`/wall/temp`, { state: { isNew: true } });
  };

  return (
    <Modal
      onCancel={() => setIsTempModalOpen(false)}
      footer={null}
      centered
      open={isTempModalOpen}
      className="overflow-hidden rounded-2xl"
    >
      <div className="text-center h-[220px] flex flex-col pt-10">
        <p className="dm-24 text-lightBlack text-center">
          <div>현재 임시저장된 페이지가 있습니다.</div>
          <div>이어서 작성하시겠습니까?</div>
        </p>
        <div className="dm-20 flex absolute bottom-0 w-full left-0 justify-between border-t-[1px] border-line border-solid">
          <Button
            danger
            onClick={handleDeleteTemp}
            className="text-red w-full  h-[66px] border-l-0 border-line border-b-0 rounded-none border-none"
          >
            아니오
          </Button>
          <div className="w-[1px] bg-line" />
          <Button
            className="text-blue w-full h-[66px] border-r-0 border-b-0 border-none border-l-[1px] rounded-none"
            onClick={handleContinueTemp}
          >
            네
          </Button>
        </div>
      </div>
    </Modal>
  );
}
