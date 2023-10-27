import { Button } from 'antd';
import WallHeaderSavingButtons from './WallHeaderSavingButtons';

type MobileFixedFooterProps = {
  tourMobilePreviewRef?: React.MutableRefObject<null>;
  setIsConfirmCancelModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileFixedFooter({
  tourMobilePreviewRef,
  setIsConfirmCancelModalOpen,
}: MobileFixedFooterProps) {
  return (
    <footer className="sm:hidden fixed bottom-0 h-[55px] ring-line ring-[2px] bg-white left-0 w-full flex items-center justify-between px-[28px]">
      <Button danger onClick={() => setIsConfirmCancelModalOpen(true)}>
        취소
      </Button>
      <WallHeaderSavingButtons footer tourPreviewRef={tourMobilePreviewRef} />
    </footer>
  );
}
