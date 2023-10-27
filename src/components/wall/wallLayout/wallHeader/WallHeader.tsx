import { useWallStore } from '@/store';
import WallHeaderUser from './WallHeaderUser';
import closeIcon from '@/assets/icons/close.svg';
import WallHeaderInput from './WallHeaderInput';
import WallHeaderSavingButtons from './WallHeaderSavingButtons';
import { useState } from 'react';
import MobileFixedFooter from './MobileFixedFooter';
import mobileDropdown from '@/assets/icons/mobile-dropdown.svg';
import ConfirmCancelModal from './ConfirmCancelModal';
import Icon from '@/components/common/Icon';
import WallHeaderActions from './WallHeaderAction';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

type WallHeaderProps = {
  tourPreviewRef: React.MutableRefObject<null>;
  tourMobilePreviewRef: React.MutableRefObject<null>;
  isNew: boolean;
};

export default function WallHeader({
  tourPreviewRef,
  tourMobilePreviewRef,
  isNew,
}: WallHeaderProps) {
  const { isEdit, isPreview } = useWallStore();

  const [dropdownOpen, setdropDownOpen] = useState(false);

  const [isConfirmCancelModalOpen, setIsConfirmCancelModalOpen] =
    useState(false);

  return (
    <header
      className={`
      flex bg-white sm:h-[72px] z-40 fixed w-full ring-line ring-[2px] items-center
      ${dropdownOpen ? 'h-[87px]' : 'h-[48px]'}
      `}
    >
      <Link
        to="/"
        className="sm:absolute sm:top-[21px] sm:left-[30px] block top-[11px] left-130px]"
      >
        <Button icon={<AiOutlineHome size={20} />}></Button>
      </Link>
      <div className="w-full max-w-[866px] mx-[24px] sm:mx-auto">
        {isPreview ? (
          <div className="flex justify-between gap-10 items-center">
            <WallHeaderUser />
            <WallHeaderInput />
            <WallHeaderSavingButtons isNew={isNew} />
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
              <div className="flex flex-col gap-2 sm:gap-10 sm:flex-row sm:justify-between sm:items-center relative sm:static">
                <WallHeaderUser />
                <WallHeaderInput dropdownOpen={dropdownOpen} />
                <WallHeaderSavingButtons
                  tourPreviewRef={tourPreviewRef}
                  isNew={isNew}
                />
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
}
