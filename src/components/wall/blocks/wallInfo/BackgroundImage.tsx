import { useWallStore } from '@/store';
import { produce } from 'immer';
import galleryIcon from '@/assets/icons/gallery.svg';
import { message } from 'antd';
import { IMAGE_FILE_SIZE_LIMIT } from '@/data/constants/blocks';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Icon from '@/components/common/Icon';

export default function BackgroundImage() {
  const { wall, setWall, isEdit } = useWallStore();
  const [isUploading, setIsUploading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile && imageFile.size > IMAGE_FILE_SIZE_LIMIT) {
      messageApi.error('이미지가 2MB를 초과하였습니다.');
      return;
    }
    const reader = new FileReader();
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
    reader.onload = async () => {
      if (reader.readyState === FileReader.DONE) {
        if (!reader.result) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', reader.result as string);
        formData.append(
          'upload_preset',
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        );
        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_API
            }/image/upload`,
            {
              method: 'POST',
              body: formData,
            },
          );
          if (!response.ok) {
            throw new Error('Upload failed');
          }
          const data = await response.json();
          setWall(
            produce(wall, (draft) => {
              draft.wallInfoBlock.backgroundImgURL = data.url;
            }),
          );
          message.success('이미지를 업로드하였습니다.');
        } catch (err) {
          console.error('Error uploading image:', err);
        } finally {
          setIsUploading(false);
        }
      }
    };
  };

  return (
    <div className="hidden sm:block">
      {contextHolder}
      {wall.wallInfoBlock?.backgroundImgURL ? (
        <img
          src={wall.wallInfoBlock.backgroundImgURL}
          alt="wallInfo block background image"
          className={`object-cover h-[291px] w-full ${
            isEdit ? 'opacity-50' : 'opacity-100'
          }`}
        />
      ) : (
        <div className="h-[291px] w-full bg-sky"></div>
      )}

      {isEdit && (
        <label className="hover absolute top-[20px] right-[20px] bg-white w-[36px] h-[36px] rounded-full flex justify-center items-center">
          {isUploading ? <LoadingOutlined /> : <Icon src={galleryIcon} />}
          <input
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </label>
      )}
    </div>
  );
}
