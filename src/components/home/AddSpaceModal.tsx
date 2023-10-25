import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import { customAxios } from '@/api/customAxios';

type AddSpaceModalProps = {
  setIsAddSpaceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddSpaceModalOpen: boolean;
};

type FieldType = {
  spaceTitle?: string;
};

export default function AddSpaceModal({
  setIsAddSpaceModalOpen,
  isAddSpaceModalOpen,
}: AddSpaceModalProps) {
  const onFinish = async (values: FieldType) => {
    try {
      const response = await customAxios.post('/space', {
        spaceTitle: values.spaceTitle,
        representativeName: '',
        spaceType: 'organization',
      });
      console.log(response);
      if (response.status === 200) {
        setIsAddSpaceModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleCloseModal = () => {
    setIsAddSpaceModalOpen(false);
  };

  return (
    <Modal
      centered
      closeIcon={false}
      title="단체 스페이스 추가하기"
      footer={null}
      open={isAddSpaceModalOpen}
      onCancel={handleCloseModal}
    >
      <Form
        className="relative"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="스페이스 이름"
          name="spaceTitle"
          rules={[
            { required: true, message: '단체 스페이스 이름을 입력해주세요' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 10, offset: 0 }}>
          <Button type="primary" htmlType="submit">
            생성
          </Button>
          <Button
            danger
            className="ml-2"
            onClick={() => setIsAddSpaceModalOpen(false)}
          >
            취소
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
