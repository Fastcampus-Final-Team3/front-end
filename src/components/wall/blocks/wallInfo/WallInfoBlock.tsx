import { useWallStore } from '@/store';
import { produce } from 'immer';
import BlockContainer from '../BlockContainer';
import BackgroundImage from './BackgroundImage';
import { ProfileImage } from './ProfileImage';
import { Input } from 'antd';

type WallInfoBlockProps = {
  wallInfoRef: React.MutableRefObject<null>;
};

export default function WallInfoBlock({ wallInfoRef }: WallInfoBlockProps) {
  const { wall, setWall, isEdit } = useWallStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWall(
      produce(wall, (draft) => {
        draft.wallInfoBlock[name as 'wallInfoTitle' | 'wallInfoDescription'] =
          value;
      }),
    );
  };

  const eventWall = wall.category === 'event';
  const personalWall = wall.category === 'personal';

  return (
    <BlockContainer blockName="wallInfoBlock">
      <div ref={wallInfoRef}>
        {(eventWall || personalWall) && <BackgroundImage />}
        <div className="relative flex gap-[24px] sm:p-block px-[18px] pb-[18px] sm:px-[24px] pt-[84px] sm:pt-[24px] sm:pb-[24px] items-center">
          {/* TODO : 구독 기능 */}
          {/* {!isEdit && (
            <div className="absolute top-[26px] right-[26px]">
              <Icon src={heartFilledIcon} className="hover" />
              <Icon src={heartOutlinedIcon} className="hover" />
            </div>
          )} */}

          <ProfileImage />
          <div className="flex flex-col flex-1">
            {isEdit ? (
              <>
                <Input
                  onChange={handleChange}
                  name="wallInfoTitle"
                  value={wall.wallInfoBlock?.wallInfoTitle}
                  placeholder="페이지명"
                  className="h-[58px] db-24 rounded-br-none rounded-bl-none"
                />
                <Input
                  onChange={handleChange}
                  name="wallInfoDescription"
                  value={wall.wallInfoBlock?.wallInfoDescription}
                  placeholder="페이지설명"
                  className="h-[58px] dm-16 rounded-tr-none rounded-tl-none"
                />
              </>
            ) : (
              <div className="space-y-[10px]">
                <p className="db-24 py-[5px]">
                  {wall.wallInfoBlock?.wallInfoTitle || '페이지명'}
                </p>
                <p className="dm-16 py-[3px]">
                  {wall.wallInfoBlock?.wallInfoDescription || '페이지설명'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BlockContainer>
  );
}
