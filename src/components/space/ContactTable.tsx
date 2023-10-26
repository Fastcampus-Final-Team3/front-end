import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Icon from '../common/Icon';
import userIcon from '@/assets/icons/user.svg';

export interface DataType {
  key: number;
  memberName: string;
  accountType: string;
  phoneNumber: string;
  memberHashtag: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: '이름',
    dataIndex: 'memberName',
    key: 'memberName',
    render: (text) => (
      <div className="flex items-center gap-2">
        <Icon src={userIcon} className="w-[18px] h-[18px]" />
        {text}
      </div>
    ),
  },
  {
    title: '계정타입',
    dataIndex: 'accountType',
    key: 'accountType',
  },
  {
    title: '연락처',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: '태그',
    key: 'memberHashtag',
    dataIndex: 'memberHashtag',
    render: (_, { memberHashtag }) => (
      <>
        {memberHashtag.map((tag) => {
          const color = tag.length > 5 ? 'geekblue' : 'green';
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

export default function ContactTable({ data }: { data: DataType[] }) {
  return <Table columns={columns} dataSource={data} />;
}
