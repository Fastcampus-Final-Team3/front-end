import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

type ConfirmCancelModalProps = {
  setIsConfirmCancelModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmCancelModalOpen: boolean;
};

export default function ConfirmCancelModal({
  setIsConfirmCancelModalOpen,
  isConfirmCancelModalOpen,
}: ConfirmCancelModalProps) {
  const navigate = useNavigate();

  const handleDeleteWall = () => {
    setIsConfirmCancelModalOpen(false);
    navigate('/');
  };

  return (
    <Modal
      onCancel={() => setIsConfirmCancelModalOpen(false)}
      footer={null}
      centered
      open={isConfirmCancelModalOpen}
      className="overflow-hidden rounded-2xl"
    >
      <div className="text-center h-[220px] flex flex-col pt-10">
        <p className="dm-24 text-lightBlack">페이지 수정을 취소하시겠습니까?</p>
        <p className="dm-20 text-gray88">수정한 내용이 모두 삭제됩니다.</p>
        <div className="dm-20 flex absolute bottom-0 w-full left-0 justify-between border-t-[1px] border-line border-solid">
          <Button
            danger
            onClick={handleDeleteWall}
            className="text-red w-full  h-[66px] border-l-0 border-line border-b-0 rounded-none border-none"
          >
            삭제
          </Button>
          <div className="w-[1px] bg-line" />
          <Button
            className="text-blue w-full h-[66px] border-r-0 border-b-0 border-none border-l-[1px] rounded-none"
            onClick={() => {
              setIsConfirmCancelModalOpen(false);
            }}
          >
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}
