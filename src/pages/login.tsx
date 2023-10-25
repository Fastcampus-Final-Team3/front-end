import { useUserStore } from '@/store';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/members/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );
      const { data } = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      navigate('/');
    } catch (error) {
      console.error(error);
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  type FieldType = {
    email?: string;
    password?: string;
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item<FieldType>
          label="이메일"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue="bake@naver.com"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          initialValue="bake9292!"
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            로그인
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
