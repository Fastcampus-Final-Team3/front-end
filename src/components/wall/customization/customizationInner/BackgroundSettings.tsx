import { useWallStore } from '@/store';
import { Button, ColorPicker } from 'antd';
import { Color } from 'antd/es/color-picker';
import { produce } from 'immer';
import galleryIcon from '@/assets/icons/gallery.svg';
import { STYLE_IMAGE_FILE_SIZE_LIMIT } from '@/data/constants/customization';
import { message } from 'antd';
import Icon from '@/components/common/Icon';

export default function BackgroundSettings({
  setBackgroundOptions,
  backgroundOptions,
}: {
  backgroundOptions: 'solid' | 'gradation' | 'image';
  setBackgroundOptions: React.Dispatch<
    React.SetStateAction<'solid' | 'gradation' | 'image'>
  >;
}) {
  const { wall, isEdit, setWall } = useWallStore();
  const isThemeSelected = wall?.styleSetting?.themeSetting.theme;

  const [messageApi, contextHolder] = message.useMessage();

  const handleSolidPick = (backgroundColor: Color) => {
    const bgColor =
      typeof backgroundColor === 'string'
        ? backgroundColor
        : backgroundColor.toHexString();
    setBackgroundOptions('solid');
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.backgroundSetting.gradation = false;
        draft.styleSetting.backgroundSetting.styleImgURL = '';
        draft.styleSetting.backgroundSetting.solidColor = bgColor;
        draft.styleSetting.themeSetting.theme = null;
      }),
    );
  };
  const handleGradationPick = (backgroundColor: Color) => {
    const bgColor =
      typeof backgroundColor === 'string'
        ? backgroundColor
        : backgroundColor.toHexString();
    setBackgroundOptions('gradation');
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.backgroundSetting.gradation = true;
        draft.styleSetting.backgroundSetting.styleImgURL = '';
        draft.styleSetting.backgroundSetting.solidColor = bgColor;
        draft.styleSetting.themeSetting.theme = null;
      }),
    );
  };

  // 배경-이미지
  const handleStyleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile && imageFile.size > STYLE_IMAGE_FILE_SIZE_LIMIT) {
      messageApi.error('이미지가 2MB를 초과하였습니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === FileReader.DONE) {
        setWall(
          produce(wall, (draft) => {
            draft.styleSetting.backgroundSetting.styleImgURL =
              reader.result as string;
            draft.styleSetting.themeSetting.theme = null;
          }),
        );
      }
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
      setBackgroundOptions('image');
    }
  };

  return (
    <>
      {contextHolder}
      <div className="db-18 mt-[30px] mb-[16px]">배경</div>
      <div className="flex justify-between">
        <div className="flex flex-row gap-[10px] w-full">
          {/* 단색 */}
          <div className="flex-1">
            <div
              className={`bg-sky rounded-[8px] sm:w-[194px] h-[100px] w-full hover ${
                backgroundOptions === 'solid' &&
                !isThemeSelected &&
                'ring-blue ring-2 ring-offset-2'
              }`}
            >
              <ColorPicker
                value={wall.styleSetting.backgroundSetting.solidColor}
                onChangeComplete={handleSolidPick}
              >
                <Button
                  type="primary"
                  className={`sm:w-[194px] h-[100px] rounded-[8px] w-full`}
                  style={{
                    backgroundColor:
                      wall.styleSetting.backgroundSetting.solidColor,
                  }}
                />
              </ColorPicker>
            </div>
            <div className="dm-16 mt-[10px] text-center items-center">단색</div>
          </div>

          {/* 그라데이션 */}
          <div className="flex-1">
            <div
              className={`rounded-[8px] sm:w-[194px] h-[100px] hover ${
                backgroundOptions === 'gradation' &&
                !isThemeSelected &&
                'ring-blue ring-2 ring-offset-2'
              }`}
            >
              <ColorPicker
                value={wall.styleSetting.backgroundSetting.solidColor}
                onChangeComplete={handleGradationPick}
              >
                <Button
                  type="primary"
                  className={`sm:w-[194px] h-[100px] rounded-[8px] w-full bg-gradient-to-t from-white to-[rgba(237, 248, 252, 0.20)]`}
                  style={{
                    backgroundColor:
                      wall.styleSetting.backgroundSetting.solidColor,
                  }}
                />
              </ColorPicker>
            </div>
            <div className="dm-16 mt-[10px] text-center items-center">
              그라데이션
            </div>
          </div>

          {/* 이미지 */}
          <div className="flex-1">
            <label
              className={`bg-sky rounded-[8px] sm:w-[194px] h-[100px] block hover ${
                backgroundOptions === 'image' &&
                !isThemeSelected &&
                'ring-blue ring-2 ring-offset-2'
              }`}
            >
              <div className="rounded-[8px] sm:w-[194px] h-[100px] flex flex-col items-center justify-center bg-white overflow-hidden">
                {wall.styleSetting.backgroundSetting.styleImgURL ? (
                  <img
                    src={wall.styleSetting.backgroundSetting.styleImgURL}
                    alt="styleBGimage"
                    className="object-cover w-full sm:h-full opacity-50"
                  />
                ) : (
                  <div className="w-full h-full bg-sky" />
                )}
                {isEdit && (
                  <label className="hover absolute bg-white z-20 w-10 h-10 rounded-full flex justify-center items-center">
                    <Icon src={galleryIcon} />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleStyleImage}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>
            </label>
            <div className="dm-16 mt-[10px] text-center items-center">
              이미지
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
