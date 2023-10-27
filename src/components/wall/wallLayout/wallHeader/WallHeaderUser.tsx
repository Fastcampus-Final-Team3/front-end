import userIcon from '@/assets/icons/user.svg';
import Icon from '@/components/common/Icon';
import { useWallStore } from '@/store';

export default function WallHeaderUser() {
  const { wall } = useWallStore();
  return (
    <div className="flex items-center gap-[10px]">
      <div className="bg-sky w-[36px] h-[36px] flex justify-center items-center rounded-full">
        <Icon src={userIcon} />
      </div>
      <h1 className="db-16">
        {wall.wallInfoBlock?.wallInfoTitle || '페이지명'}
      </h1>
    </div>
  );
}
