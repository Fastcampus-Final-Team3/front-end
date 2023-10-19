import { useWallStore } from '@/store';
import { produce } from 'immer';
import resetInput from '@/assets/icons/reset-input.svg';
import PdfPreview from './PdfPreview';
import { message } from 'antd';
import { Block } from '@/types/wall';
import { FileBlockSubDataType } from './FileBlock';
import Icon from '@/components/common/Icon';

export type FileBlockType = Block & {
  subData: FileBlockSubDataType;
};

type FileUploadProps = {
  isEdit: boolean;
  tragetFileBlockIndex: number;
  targetFileBlock: FileBlockType;
};

const FILE_SIZE_LIMIT = 3 * 1024 * 1024;

export const FileUpload = ({
  isEdit,
  targetFileBlock,
  tragetFileBlockIndex,
}: FileUploadProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { wall, setWall } = useWallStore();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > FILE_SIZE_LIMIT) {
        messageApi.error('파일크기가 3mb를 초과했습니다.');
        return;
      }
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === FileReader.DONE) {
        setWall(
          produce(wall, (draft) => {
            draft.blocks[tragetFileBlockIndex].subData[0].fileName = file!.name;
            draft.blocks[tragetFileBlockIndex].subData[0].file =
              reader.result as string;
          }),
        );
      }
    };
    if (file) {
      reader.readAsDataURL(file);
      message.success('pdf파일을 성공적으로 업로드 하였습니다.');
    }
  };

  const handleResetFile = () => {
    setWall(
      produce(wall, (draft) => {
        draft.blocks[tragetFileBlockIndex].subData[0].fileName = '';
        draft.blocks[tragetFileBlockIndex].subData[0].file = '';
      }),
    );
  };

  return (
    <>
      {contextHolder}
      <div className="">
        {isEdit ? (
          <div className="relative">
            <label className="cursor-pointer rounded-[9px] border-line border-2 border-solid bg-white hover py-[18px] flex items-center px-[16px] ">
              <p className="text-blue dm-16">
                {targetFileBlock.subData[0].fileName || '파일업로드'}
              </p>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf"
              />
            </label>
            <Icon
              src={resetInput}
              className="absolute right-[18px] top-5 hover"
              onClick={handleResetFile}
            />
          </div>
        ) : (
          <PdfPreview targetFileBlock={targetFileBlock} />
        )}
      </div>
    </>
  );
};
