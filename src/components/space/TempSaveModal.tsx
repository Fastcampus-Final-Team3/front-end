import useCustomAxios from '@/hooks/useCustomAxios';
import { useWallStore } from '@/store';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

type ConfirmCancelModalProps = {
  setIsTempModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isTempModalOpen: boolean;
  spaceId?: string;
  spaceType?: string;
  tempSpaceWallId?: number;
};

export default function TempSaveModal({
  setIsTempModalOpen,
  isTempModalOpen,
  spaceId,
  spaceType,
  tempSpaceWallId,
}: ConfirmCancelModalProps) {
  const customAxios = useCustomAxios();
  const { setWall, setIsEdit } = useWallStore();

  const navigate = useNavigate();

  const handleDeleteTemp = async () => {
    try {
      await customAxios.delete(
        `wall-temporary/${localStorage.getItem('spaceId')}`,
      );
      navigate('/category', { state: { spaceId, spaceType } });
    } catch (error) {
      console.log(error);
    } finally {
      setIsTempModalOpen(false);
    }
  };

  const handleContinueTemp = async () => {
    try {
      const response = await customAxios(
        `wall-temporary/${spaceId}/${tempSpaceWallId}`,
      );
      const tempWall = response.data.data;
      setWall(tempWall);
      setIsEdit(true);
      navigate(`/wall/${tempSpaceWallId}`, {
        state: { spaceId, isNew: true },
      });
      return;
    } catch (error) {
      console.log(error);
    } finally {
      setIsTempModalOpen(false);
    }
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
            삭제
          </Button>
          <div className="w-[1px] bg-line" />
          <Button
            className="text-blue w-full h-[66px] border-r-0 border-b-0 border-none border-l-[1px] rounded-none"
            onClick={handleContinueTemp}
          >
            이어서 작성
          </Button>
        </div>
      </div>
    </Modal>
  );
}
