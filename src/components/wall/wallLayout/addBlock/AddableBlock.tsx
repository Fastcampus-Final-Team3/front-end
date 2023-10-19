import { ADDABLE_BLOCKS } from '@/data/constants/blocks';

interface AddableBlockProp {
  block: string;
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedBlock: string;
  hasSnsBlock: boolean;
}

export default function AddableBlock({
  block,
  handleSelect,
  selectedBlock,
  hasSnsBlock,
}: AddableBlockProp) {
  return (
    <label
      className={`w-[238px] ${hasSnsBlock && block === 'snsBlock' && 'hidden'}`}
    >
      <input
        className="hidden"
        type="radio"
        name="block"
        value={block}
        checked={block === selectedBlock}
        onChange={handleSelect}
      />
      <div className="mb-[16px] dm-16">{ADDABLE_BLOCKS[block].title}</div>
      <img
        draggable={false}
        src={ADDABLE_BLOCKS[block].image}
        alt={ADDABLE_BLOCKS[block].title}
        className={`overflow-hidden rounded-[11px] sm:w-[238px] w-[140px] hover:ring-blue hover:ring-2 hover ${
          selectedBlock === block && 'ring-blue ring-2'
        }`}
      />
    </label>
  );
}
