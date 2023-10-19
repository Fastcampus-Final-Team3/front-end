import { Input } from 'antd';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { useWallStore } from '@/store';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/languages/ko.js';
import editThickIcon from '@/assets/icons/edit-thick.svg';
import BlockContainer from '../BlockContainer';
import Icon from '@/components/common/Icon';

type FreeBlockProps = {
  blockUUID?: string;
};

export default function FreeBlock({ blockUUID }: FreeBlockProps) {
  const { isEdit, wall, setWall } = useWallStore();
  const [isFreeTitleEdit, setIsFreeTitleEdit] = useState(false);

  useEffect(() => {
    setIsFreeTitleEdit(false);
  }, [isEdit]);

  const targetFreeBlockIndex = wall.blocks.findIndex(
    (block) => block.blockUUID === blockUUID,
  );
  const targetFreeBlock = wall.blocks[targetFreeBlockIndex];

  const handleFreeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWall(
      produce(wall, (draft) => {
        draft.blocks[targetFreeBlockIndex].subData[0].freeTitle =
          e.target.value;
      }),
    );
  };
  const handleEditorChange = (content: string) => {
    setWall(
      produce(wall, (draft) => {
        draft.blocks[targetFreeBlockIndex].subData[0].freeContent = content;
      }),
    );
  };

  if (targetFreeBlockIndex === -1) {
    return null;
  }
  return (
    <BlockContainer blockName="freeBlock" blockUUID={blockUUID}>
      <div className="p-block flex flex-col">
        <div className="flex items-center gap-[6px] db-18 sm:db-20 mb-[16px]">
          {isFreeTitleEdit && isEdit ? (
            <Input
              placeholder="자유블록 제목을 입력해주세요."
              value={targetFreeBlock.subData[0].freeTitle}
              onChange={handleFreeTitle}
              className="w-1/3 px-1 py-0 "
            />
          ) : (
            <>
              {targetFreeBlock.subData[0].freeTitle ||
                '자유블록 제목을 입력해주세요.'}
            </>
          )}
          {isEdit && (
            <Icon
              src={editThickIcon}
              onClick={() => setIsFreeTitleEdit((prev) => !prev)}
              className="hover"
            />
          )}
        </div>

        {isEdit ? (
          <FroalaEditorComponent
            tag="textarea"
            config={{
              heightMin: 200,
              placeholderText: '자유블록 내용을 입력해주세요',
              language: 'ko',
              quickInsertEnabled: false,
              imageUpload: false,
              fileUpload: false,
              imagePaste: false,
            }}
            model={targetFreeBlock.subData[0].freeContent}
            onModelChange={handleEditorChange}
          />
        ) : (
          <FroalaEditorView model={targetFreeBlock.subData[0].freeContent} />
        )}
      </div>
    </BlockContainer>
  );
}
