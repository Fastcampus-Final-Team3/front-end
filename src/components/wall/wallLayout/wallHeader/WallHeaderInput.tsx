import { Input } from 'antd';
import inputSuffixIcon from '@/assets/icons/input-suffix.svg';
import { useWallStore } from '@/store';
import Icon from '@/components/common/Icon';
import { useDebounce } from '@/hooks/useDebouce';
import { useEffect, useState } from 'react';

type WallHeaderInputProps = {
  dropdownOpen?: boolean;
  verticalMore?: boolean;
};

export default function WallHeaderInput({
  dropdownOpen,
}: WallHeaderInputProps) {
  const { wall, setWall } = useWallStore();
  const [hasDuplicateURL, setHasDuplicateURL] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const debouncedValue = useDebounce<string>(wall.shareURL, 300);

  const handleShareURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWall({ ...wall, shareURL: e.target.value });
  };

  useEffect(() => {
    if (!debouncedValue) {
      setErrorMessage('');
      return;
    }
    const checkShareURLDuplication = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }//wall/has-duplicate/${debouncedValue}`,
        );
        if (!response.ok) {
          throw new Error('Error while checking duplication of shareURL');
        }
        const {
          data: { hasDuplicateURL },
        } = await response.json();
        if (hasDuplicateURL) {
          setHasDuplicateURL(true);
          setErrorMessage(`${wall.shareURL}은(는) 이미 사용중입니다.`);
        } else {
          setHasDuplicateURL(false);
          setErrorMessage(`${wall.shareURL}은(는) 사용가능합니다.`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkShareURLDuplication();
  }, [debouncedValue, wall.shareURL]);

  return (
    <div className="flex flex-col">
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
      <span
        className={`text-xs mt-1 text-center
      ${hasDuplicateURL ? 'text-red' : 'text-blue'}
      `}
      >
        {errorMessage}
      </span>
    </div>
  );
}
