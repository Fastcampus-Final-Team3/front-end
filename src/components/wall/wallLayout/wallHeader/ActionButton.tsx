import Icon from '@/components/common/Icon';
import { Button } from 'antd';

type ActionButtonProps = { type: string; className?: string };

export default function ActionButton({ type, className }: ActionButtonProps) {
  return (
    <Button
      className={`hover w-[32px] h-[32px] border-gray88 items-center flex justify-center ${className}`}
    >
      <Icon src={type} />
    </Button>
  );
}
