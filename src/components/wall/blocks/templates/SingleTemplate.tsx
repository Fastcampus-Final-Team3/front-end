import trashIcon from '@/assets/icons/trash.svg';
import moreVerticalIcon from '@/assets/icons/more-vertical.svg';
import { useWallStore } from '@/store';
import { produce } from 'immer';
import { Popover } from 'antd';
import AccessModal from '../../templateModal/accessInner/AccessModal';
import BlockContainer from '../BlockContainer';
import Icon from '@/components/common/Icon';

type SingleTemplateProps = {
  templateTitle?: string;
  templateDescription?: string;
  templateUUID?: string;
  isFirst: boolean;
};

export default function SingleTemplate({
  templateUUID,
  templateTitle,
  templateDescription,
}: SingleTemplateProps) {
  const { isEdit, wall, setWall } = useWallStore();

  const handleDeleteBlock = () => {
    setWall(
      produce(wall, (draft) => {
        const templateBlock = draft.blocks.find(
          (block) => block.blockType === 'templateBlock',
        );

        if (templateBlock) {
          const templateIndex = templateBlock.subData.findIndex(
            (template) => template.templateUUID === templateUUID,
          );

          if (templateIndex !== 1) {
            templateBlock.subData.splice(templateIndex, 1);
          }
        }
      }),
    );
  };

  const content = (
    <div className="w-[80px]">
      <AccessModal />
    </div>
  );

  return (
    <BlockContainer blockName="template">
      <div className="sm:h-[210px] h-[115px] p-block">
        <div className="flex items-center justify-between mb-[12px]">
          <h4 className="db-18 sm:db-20">{templateTitle}</h4>
          {isEdit && (
            <div className="flex sm:gap-[8px] gap-[6px]">
              <Icon
                src={trashIcon}
                className="hover"
                onClick={handleDeleteBlock}
              />
              <Popover placement="bottomLeft" content={content} trigger="click">
                <Icon src={moreVerticalIcon} className="hover" />
              </Popover>
            </div>
          )}
        </div>
        <p className="dm-16 text-gray88">{templateDescription}</p>
      </div>
    </BlockContainer>
  );
}
