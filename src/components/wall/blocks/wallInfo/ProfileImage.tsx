import { useWallStore } from '@/store';
import galleryIcon from '@/assets/icons/gallery.svg';
import { produce } from 'immer';
import { IMAGE_FILE_SIZE_LIMIT } from '@/data/constants/blocks';
import { message } from 'antd';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Icon from '@/components/common/Icon';

export type ImageData = {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: Date;
  etag: string;
  folder: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
};

export const ProfileImage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { wall, setWall, isEdit } = useWallStore();
  const [isUploading, setIsUploading] = useState(false);

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
          const data: ImageData = await response.json();
          console.log(data);
          setWall(
            produce(wall, (draft) => {
              draft.wallInfoBlock.wallInfoImgURL = data.url;
            }),
          );
          console.log('Upload successful:', data);
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
    <div className="absolute -top-[60px] left-[calc(50%-60px)] sm:block sm:static">
      {contextHolder}
      <div className="flex w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] flex-col items-center justify-center rounded-full bg-white overflow-hidden">
        {wall.wallInfoBlock?.wallInfoImgURL ? (
          <img
            src={wall.wallInfoBlock.wallInfoImgURL}
            alt="wallinfo block profile image"
            className={`h-full w-full rounded-full object-cover ${
              isEdit ? 'opacity-50' : 'opacity-100'
            }`}
          />
        ) : (
          <div className="bg-gray w-full h-full" />
        )}

        {isEdit && (
          <label className="hover absolute bg-white z-20 w-10 h-10 rounded-full flex justify-center items-center">
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
    </div>
  );
};
