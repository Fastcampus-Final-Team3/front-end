import { useUserStore, useWallStore } from '@/store';
import { Button, Popover } from 'antd';
import moreVerticalIcon from '@/assets/icons/more-vertical.svg';
import { useMemo, useState } from 'react';
import MoreVerticalPopover from './popover/MoreVerticalPopover';

import WallHeaderPopoverTriggers from './WallHeaderPopoverTriggers';
import Icon from '@/components/common/Icon';

export default function WallHeaderActions() {
  const { user } = useUserStore();
  const { setIsEdit, wall } = useWallStore();

  const [verticalMorePopoevrOpen, setVerticalMorePopoevrOpen] = useState(false);
  const handleVerticalMorePopoevrOpenChange = (newOpen: boolean) => {
    setVerticalMorePopoevrOpen(newOpen);
    if (!newOpen) {
      // TODO : 저장 PUT request
    }
  };

  const isOwner = useMemo(
    () => wall.memberId === user?.memberId,
    [user?.memberId, wall.memberId],
  );
  return (
    <div className="flex gap-[8px] items-center">
      <WallHeaderPopoverTriggers
        handleVerticalMorePopoevrOpenChange={
          handleVerticalMorePopoevrOpenChange
        }
      />

      <Button
        type="primary"
        onClick={() => setIsEdit(true)}
        className={`${!isOwner && 'hidden'} dm-14`}
      >
        편집하기
      </Button>

      <Popover
        content={
          <MoreVerticalPopover
            handleVerticalMorePopoevrOpenChange={
              handleVerticalMorePopoevrOpenChange
            }
          />
        }
        trigger="click"
        arrow={false}
        open={verticalMorePopoevrOpen}
        onOpenChange={handleVerticalMorePopoevrOpenChange}
        placement="bottomRight"
        className={`${!isOwner && 'hidden'}`}
      >
        <Button className="hover w-[32px] h-[32px] border-gray88 flex items-center justify-center">
          <Icon src={moreVerticalIcon} />
        </Button>
      </Popover>
    </div>
  );
}
