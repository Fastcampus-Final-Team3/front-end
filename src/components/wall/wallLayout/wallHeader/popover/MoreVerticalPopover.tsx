import { Switch } from 'antd';
import WallHeaderPopoverTriggers from '../WallHeaderPopoverTriggers';
import { useWallStore } from '@/store';
import useCustomAxios from '@/hooks/useCustomAxios';
import { useState } from 'react';

type MoreVerticalPopoverProps = {
  handleVerticalMorePopoevrOpenChange: (newOpen: boolean) => void;
};

export default function MoreVerticalPopover({
  handleVerticalMorePopoevrOpenChange,
}: MoreVerticalPopoverProps) {
  const customAxios = useCustomAxios();
  const { wall, setWall } = useWallStore();
  const [switching, setSwitching] = useState(false);

  const handleSwitch = async () => {
    setSwitching(true);
    try {
      const response = await customAxios.put('wall/public', {
        spaceId: Number(localStorage.getItem('spaceId')),
        spaceWallId: wall.spaceWallId,
        isPublic: !wall.isPublic,
      });
      if (response.status === 200) {
        setWall({ ...wall, isPublic: !wall.isPublic });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSwitching(false);
    }
  };
  console.log(wall);

  return (
    <div>
      <label className="dm-16 text-gray88 flex items-center hover">
        <Switch
          defaultChecked
          id="disclosure"
          className="mr-2"
          checked={wall.isPublic}
          onChange={handleSwitch}
          loading={switching}
        />
        외부공개
      </label>
      <WallHeaderPopoverTriggers
        verticalMore
        handleVerticalMorePopoevrOpenChange={
          handleVerticalMorePopoevrOpenChange
        }
      />
    </div>
  );
}
