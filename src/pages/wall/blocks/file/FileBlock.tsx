import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Input } from 'antd';
import BlockContainer from '@/pages/wall/blocks/BlockContainer';
import { useWallStore } from '@/store';
import { produce } from 'immer';
import FileUpload from '@/pages/wall/blocks/file/FileUpload';

export default function FileBlock() {
  const [isFileTitleEdit, setIsFileTitleEdit] = useState(false);
  const [isFileSubtitleEdit, setIsFileSubtitleEdit] = useState(false);

  const { isEdit, wall, setWall } = useWallStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWall(
      produce(wall, (draft) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (draft.fileBlock as any)[name] = value;
      }),
    );
  };

  return (
    <BlockContainer blockName="fileBlock">
      <div className="p-7 flex flex-col gap-5">
        <div className="flex text-xl font-bold items-center gap-2 text-gray-600">
          {isFileTitleEdit ? (
            <Input
              name="fileTitle"
              value={wall.fileBlock?.fileTitle}
              onChange={handleChange}
            />
          ) : (
            <h4>{wall.fileBlock?.fileTitle || '파일블록제목'}</h4>
          )}
          {isEdit && (
            <EditOutlined
              className="cursor-pointer"
              onClick={() => setIsFileTitleEdit((prev) => !prev)}
            />
          )}
        </div>
        <div className="flex text-lg items-center gap-2 text-gray-600">
          {isFileSubtitleEdit ? (
            <Input
              name="fileSubtitle"
              value={wall.fileBlock?.fileSubtitle}
              onChange={handleChange}
            />
          ) : (
            <h4>{wall.fileBlock?.fileSubtitle || '파일블록소제목'}</h4>
          )}
          {isEdit && (
            <EditOutlined
              className="cursor-pointer"
              onClick={() => setIsFileSubtitleEdit((prev) => !prev)}
            />
          )}
        </div>
        <FileUpload isEdit={isEdit} />
      </div>
    </BlockContainer>
  );
}
