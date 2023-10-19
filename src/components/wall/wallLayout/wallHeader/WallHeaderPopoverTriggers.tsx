import { Button, Popover } from 'antd';
import MessagePopover from './popover/MessagePopover';
import SharePopover from './popover/SharePopover';
import AlarmPopover from './popover/AlarmPopover';
import { useState } from 'react';
import smsIcon from '@/assets/icons/sms.svg';
import exportIcon from '@/assets/icons/export.svg';
import notificationIcon from '@/assets/icons/notification.svg';
import Icon from '@/components/common/Icon';

type WallHeaderPopoverTriggersProps = {
  verticalMore?: boolean;
  handleVerticalMorePopoevrOpenChange: (newOpen: boolean) => void;
};

export default function WallHeaderPopoverTriggers({
  verticalMore,
  handleVerticalMorePopoevrOpenChange,
}: WallHeaderPopoverTriggersProps) {
  const [sharePopoverOpen, setSharePopoverOpen] = useState(false);
  const handleSharePopoverOpenChange = (newOpen: boolean) => {
    setSharePopoverOpen(newOpen);
  };
  return (
    <div
      className={`
    ${verticalMore ? 'sm:hidden flex mt-[10px]' : 'sm:flex hidden'}
    flex gap-[8px]
    `}
    >
      <Popover
        content={<MessagePopover />}
        trigger="click"
        arrow={false}
        placement="bottomRight"
      >
        <Button className="hover w-[32px] h-[32px] border-gray88 items-center flex justify-center">
          <Icon src={smsIcon} />
        </Button>
      </Popover>

      <Popover
        content={
          <SharePopover
            setSharePopoverOpen={setSharePopoverOpen}
            verticalMore
            handleVerticalMorePopoevrOpenChange={
              handleVerticalMorePopoevrOpenChange
            }
          />
        }
        open={sharePopoverOpen}
        onOpenChange={handleSharePopoverOpenChange}
        trigger="click"
        arrow={false}
        placement={verticalMore ? 'bottom' : 'bottomRight'}
      >
        <Button className="hover w-[32px] h-[32px] border-gray88 items-center flex justify-center">
          <Icon src={exportIcon} />
        </Button>
      </Popover>

      <Popover
        content={<AlarmPopover />}
        trigger="click"
        arrow={false}
        placement="bottomRight"
      >
        <Button className="hover w-[32px] h-[32px] border-gray88 items-center flex justify-center">
          <Icon src={notificationIcon} />
        </Button>
      </Popover>
    </div>
  );
}
