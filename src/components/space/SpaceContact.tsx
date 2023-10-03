import { Icon } from '../common';
import circleArrowRightIcon from '@/assets/icons/space/circle-arrow-right.svg';
import zoominIcon from '@/assets/icons/categories/zoom-in.svg';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function SpaceContact() {
  const navigate = useNavigate();

  return (
    <div className="bg-sky min-h-screen pl-[24px] pt-[70px]">
      <div className="bg-white px-[24px] py-[22px] rounded-tl-[24px] rounded-bl-[24px] min-h-[calc(100vh-99px)] ">
        {/* 공유페이지 생성, 검색 */}
        <div className="flex items-center justify-between border-lightBlack border-solid border-b-[1px] pb-[15px] mb-[15px]">
          <div
            className="flex items-center gap-[3px] hover"
            onClick={() => navigate('/category')}
          >
            <div className="w-[100px] dm-16">공유페이지 생성</div>
            <Icon src={circleArrowRightIcon} />
          </div>
          <div className="flex items-center gap-2">
            <Input className="border-none" />
            <Icon src={zoominIcon} className="hover" />
          </div>
        </div>

        {/* 버튼3개 */}
        <div className="flex gap-[6px]">
          <Button type="primary" shape="round" className="dm-14">
            전체
          </Button>
          <Button shape="round" className="border-blue text-blue dm-14">
            연락처 추가
          </Button>
          <Button danger shape="round" className="dm-14">
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
