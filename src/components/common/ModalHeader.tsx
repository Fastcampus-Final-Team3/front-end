import { Button, Divider } from 'antd';

type ModalHeaderProps = {
  handleCloseModal: () => void;
  handleOk?: () => void;
  title: React.ReactNode;
  reset?: boolean;
  handleResetStyle?: () => void;
};

export const ModalHeader = ({
  handleCloseModal,
  handleOk,
  title,
  reset,
  handleResetStyle,
}: ModalHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Button danger onClick={handleCloseModal}>
          취소
        </Button>
        {reset && (
          <Button
            onClick={handleResetStyle}
            className="absolute left-[90px] text-gray88"
          >
            초기화
          </Button>
        )}
        <div className="dm-16">{title}</div>
        <Button type="primary" onClick={handleOk}>
          완료
        </Button>
      </div>
      <Divider />
    </>
  );
};
