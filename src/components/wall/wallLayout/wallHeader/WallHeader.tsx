import { useWallStore } from '@/store';
import { WallHeaderActions } from 'components/index';
import WallHeaderUser from './WallHeaderUser';
import closeIcon from '@/assets/icons/close.svg';
import WallHeaderInput from './WallHeaderInput';
import { Icon } from '@/components/common';
import WallHeaderEditButtons from './WallHeaderSavigButtons';
import { useState } from 'react';
import MobileFixedFooter from './MobileFixedFooter';
import mobileDropdown from '@/assets/icons/mobile-dropdown.svg';
import ConfirmCancelModal from './ConfirmCancelModal';

type WallHeaderProps = {
  tourPreviewRef: React.MutableRefObject<null>;
  tourMobilePreviewRef: React.MutableRefObject<null>;
};

export const WallHeader = ({
  tourPreviewRef,
  tourMobilePreviewRef,
}: WallHeaderProps) => {
  const { isEdit, setIsEdit, isPreview, getWall } = useWallStore();

  const [dropdownOpen, setdropDownOpen] = useState(false);

  const handleCancelSave = () => {
    getWall();
    setIsEdit(false);
  };

  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] =
    useState(false);

  return (
    <header
      className={`
      flex bg-white sm:h-[72px] z-40 fixed w-full ring-line ring-[2px] items-center
      ${dropdownOpen ? 'h-[87px]' : 'h-[48px]'}
      `}
    >
      <div className="w-full max-w-[866px] mx-[24px] sm:mx-auto">
        {isPreview ? (
          <div className="flex gap-[73px] items-center">
            <WallHeaderUser />
            <WallHeaderInput />
            <WallHeaderEditButtons />
            <Icon
              src={closeIcon}
              className="absolute top-[21px] right-[30px] hover hidden sm:block"
              onClick={handleCancelSave}
            />
            <MobileFixedFooter
              setIsConfirmCancelModalOpen={setIsConfirmCancelModalOpen}
            />
          </div>
        ) : (
          <>
            {!isEdit && (
              <div className="flex items-center justify-between">
                <WallHeaderUser />
                <WallHeaderActions />
              </div>
            )}

            {isEdit && (
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-[73px] sm:items-center relative sm:static">
                <WallHeaderUser />
                <WallHeaderInput dropdownOpen={dropdownOpen} />
                <WallHeaderEditButtons tourPreviewRef={tourPreviewRef} />
                <Icon
                  src={closeIcon}
                  className="absolute top-[21px] right-[30px] hover hidden sm:block"
                  onClick={() => setIsConfirmCancelModalOpen(true)}
                />
                <ConfirmCancelModal
                  isConfirmCancelModalOpen={isConfirmCancelModalOpen}
                  setIsConfirmCancelModalOpen={setIsConfirmCancelModalOpen}
                />
                <Icon
                  src={mobileDropdown}
                  className="absolute hover right-0 top-[6px] sm:hidden"
                  onClick={() => setdropDownOpen((prev) => !prev)}
                />
                <MobileFixedFooter
                  setIsConfirmCancelModalOpen={setIsConfirmCancelModalOpen}
                  tourMobilePreviewRef={tourMobilePreviewRef}
                />
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};
