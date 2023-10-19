import { Modal, message } from 'antd';
import { BlockSettings } from './BlockSettings';
import { ThemeSettings } from './ThemeSettings';
import { ModalHeader } from '@/components/common/ModalHeader';
import brushIcon from '@/assets/icons/brush.svg';
import { useWallStore } from '@/store';
import { produce } from 'immer';
import { useState } from 'react';
import BackgroundSettings from './BackgroundSettings';
import Icon from '@/components/common/Icon';

type CustomizationModalProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

export default function CustomizationModal({
  isModalOpen,
  handleOk,
  handleCancel,
}: CustomizationModalProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const { wall, setWall } = useWallStore();

  const modalTitle = (
    <div className="flex items-center gap-2">
      <Icon src={brushIcon} />
      <span>스타일 설정</span>
    </div>
  );

  const [backgroundOptions, setBackgroundOptions] = useState<
    'solid' | 'gradation' | 'image'
  >(() => {
    if (wall.styleSetting.backgroundSetting.styleImgURL) {
      return 'image';
    }
    if (wall.styleSetting.backgroundSetting.gradation) {
      return 'gradation';
    }
    if (!wall.styleSetting.backgroundSetting.gradation) {
      return 'solid';
    }
    return 'solid';
  });

  const handleResetStyle = () => {
    setWall(
      produce(wall, (draft) => {
        draft.styleSetting.backgroundSetting.gradation = false;
        draft.styleSetting.backgroundSetting.solidColor = '#eeeeee';
        draft.styleSetting.backgroundSetting.styleImgURL = '';
        draft.styleSetting.blockSetting.gradation = false;
        draft.styleSetting.blockSetting.shape = '0px';
        draft.styleSetting.blockSetting.style = 'none';
        draft.styleSetting.blockSetting.styleColor = '#ffffff';
        draft.styleSetting.blockSetting.gradation = false;
        draft.styleSetting.themeSetting.theme = null;
      }),
    );
    setBackgroundOptions('solid');
    setBlockOptions('solid');
    messageApi.info('스타일 설정을 초기화했습니다.');
  };

  const [blockOptions, setBlockOptions] = useState<'solid' | 'gradation'>(
    () => {
      if (wall.styleSetting.blockSetting.gradation) {
        return 'gradation';
      }
      if (!wall.styleSetting.blockSetting.gradation) {
        return 'solid';
      }
      return 'solid';
    },
  );

  return (
    <Modal
      centered
      open={isModalOpen}
      onCancel={handleCancel}
      width="660px"
      footer={null}
      getContainer={false}
      closable={false}
    >
      {contextHolder}
      <ModalHeader
        title={modalTitle}
        handleOk={handleOk}
        handleCloseModal={handleCancel}
        reset={true}
        handleResetStyle={handleResetStyle}
      />
      <BackgroundSettings
        backgroundOptions={backgroundOptions}
        setBackgroundOptions={setBackgroundOptions}
      />
      <BlockSettings
        blockOptions={blockOptions}
        setBlockOptions={setBlockOptions}
      />
      <ThemeSettings />
    </Modal>
  );
}
