import { Input } from 'antd';
import inputSuffixIcon from '@/assets/icons/input-suffix.svg';
import { useWallStore } from '@/store';
import Icon from '@/components/common/Icon';

type WallHeaderInputProps = {
  dropdownOpen?: boolean;
  verticalMore?: boolean;
};

export default function WallHeaderInput({
  dropdownOpen,
}: WallHeaderInputProps) {
  const { wall, setWall } = useWallStore();

  const handleShareURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWall({ ...wall, shareURL: e.target.value });
  };

  console.log(wall);

  return (
    <Input
      className={`
      rounded-[6px] bg-sky w-full overflow-hidden sm:flex-1 sm:static
      ${dropdownOpen ? 'block' : 'hidden sm:block'}
      `}
      addonBefore={
        <div className="dm-14 text-gray88">java-jober.netlify.app/wall/</div>
      }
      suffix={
        <Icon
          src={inputSuffixIcon}
          onClick={() => setWall({ ...wall, shareURL: '' })}
          className="hover"
        />
      }
      value={wall.shareURL}
      onChange={handleShareURL}
    />
  );
}
