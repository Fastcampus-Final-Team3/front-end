import { useWallStore } from '@/store';
import SingleTemplate from './SingleTemplate';
import { SubDatum } from '@/types/wall';
import { ModalOpen } from '../../templateModal';
import BlockContainer from '../BlockContainer';

export type TemplateBlockSubDataType = Pick<
  SubDatum,
  | 'templateBlockId'
  | 'templateUUID'
  | 'templateTitle'
  | 'templateDescription'
  | 'hasAccessTemplateAuth'
  | 'hasDenyTemplateAuth'
>;

type TemplateBlockProps = {
  blockUUID?: string;
  subData?: TemplateBlockSubDataType[];
  templateAddButtonRef: React.MutableRefObject<null>;
  onClick?: () => void;
};

export default function TemplateBlock({
  subData: templateBlockSubData,
  templateAddButtonRef,
}: TemplateBlockProps) {
  const { isEdit } = useWallStore();

  return (
    <BlockContainer blockName="templateBlock">
      <div
        className={`
        ${isEdit && 'px-[8px] pb-[8px] pt-[16px] sm:pt-[26px]'} 
        gap-[8px] grid sm:grid-cols-2 grid-cols-1
        `}
      >
        {templateBlockSubData?.map((template, id) => (
          <SingleTemplate
            isFirst={id === 0}
            key={template.templateUUID}
            templateTitle={template.templateTitle}
            templateDescription={template.templateDescription}
          />
        ))}

        {isEdit && (
          <>
            <BlockContainer blockName="template">
              <div
                className="sm:h-[210px] h-[115px] flex flex-col items-center justify-center gap-[8px] dm-16 "
                ref={templateAddButtonRef}
              >
                <ModalOpen />
              </div>
            </BlockContainer>
          </>
        )}
      </div>
    </BlockContainer>
  );
}
