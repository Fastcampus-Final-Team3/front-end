import userIcon from '@/assets/icons/home/user.svg';
import darkGalleryIcon from '@/assets/icons/home/dark-gallery.svg';
import settingIcon from '@/assets/icons/home/setting.svg';
import { Member } from '@/types/home';
import Icon from '../common/Icon';

export default function HomeProfile({ member }: { member?: Member }) {
  return (
    <section className="flex gap-[20px] mb-[50px]">
      <div className="bg-sky w-[84px] h-[84px] rounded-full border-[3px] border-solid flex justify-center items-center relative">
        <Icon src={userIcon} className="w-[38px]" />
        <Icon
          src={darkGalleryIcon}
          className="absolute -right-[4px] -bottom-[4px] hover"
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[8px] items-center">
          <p className="db-20 ">{member?.memberName}</p>
          <p className="db-12 text-blue">⦁ {member?.memberShip}</p>
          <p className="db-12 text-blue border-[1px] border-blue border-solid px-[10px] py-[4px] rounded-full hover">
            업그레이드
          </p>
        </div>
        <div className="text-gray88 dm-14">abcd@gmail.com </div>
        <div className="flex items-center hover">
          <Icon src={settingIcon} />
          <p className="text-gray88 dm-14">계정설정</p>
        </div>
      </div>
    </section>
  );
}
