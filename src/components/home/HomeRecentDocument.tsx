import { Button } from 'antd';
import documentIcon from '@/assets/icons/home/document.svg';
import useMemberInfo from '@/hooks/useMemberInfo';
import Icon from '../common/Icon';

export default function HomeRecentDocument() {
  const { memberInfo } = useMemberInfo();
  return (
    <section className="mb-[40px]">
      <div className="flex items-center gap-[12px] db-20 mb-[14px] text-lightBlack">
        <Icon src={documentIcon} />
        <span>최근문서</span>
        <div className="flex items-center gap-[6px]">
          <Button type="primary" shape="round" className="dm-14">
            전체
          </Button>
          <Button shape="round" className="dm-14">
            개인
          </Button>
          <Button shape="round" className="dm-14">
            공유
          </Button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-[10px]">
        <div className="bg-lightGray p-[18px] rounded-[15px] sm:h-[200px] flex flex-col justify-between ">
          <div>
            <div className="flex items-center justify-between mb-[6px] sm:mb-[8px]">
              <div className="db-16">자기소개서</div>
              <div className="text-[12px] border-none text-blue bg-none hover">
                개인
              </div>
            </div>
            <p className="dm-14 mb-[13px] leading-4">
              안녕하세요, {memberInfo?.member.memberName}입니다.
            </p>
          </div>
          <span className="dmn-14 text-gray88">2023.09.13</span>
        </div>
        <div className="bg-lightGray p-[18px] rounded-[15px] sm:h-[200px] flex flex-col justify-between ">
          <div>
            <div className="flex items-center justify-between mb-[6px] sm:mb-[8px]">
              <div className="db-16">문의하기</div>
              <div className="text-[12px] border-none text-blue bg-none hover">
                개인
              </div>
            </div>
            <p className="dm-14 mb-[13px] leading-4">
              궁금한 점이나 필요한 사항을 문의 주시면 답변을 드리겠습니다.
            </p>
          </div>
          <span className="dmn-14 text-gray88">2023.09.04</span>
        </div>
        <div className="bg-lightGray p-[18px] rounded-[15px] sm:h-[200px] flex flex-col justify-between ">
          <div>
            <div className="flex items-center justify-between mb-[6px] sm:mb-[8px]">
              <div className="db-16">건강검진 안내 공지</div>
              <div className="text-[12px] border-none text-blue bg-none hover">
                개인
              </div>
            </div>
            <p className="dm-14 mb-[13px] leading-4">
              올해 건강검진 대상자에게 검진 실시를 안내하는 문서 양식입니다.
            </p>
          </div>
          <span className="dmn-14 text-gray88">2023.09.13</span>
        </div>
        <div className="bg-lightGray p-[18px] rounded-[15px] sm:h-[200px] flex flex-col justify-between ">
          <div>
            <div className="flex items-center justify-between mb-[6px] sm:mb-[8px]">
              <div className="db-16">명함</div>
              <div className="text-[12px] border-none text-blue bg-none hover">
                개인
              </div>
            </div>
            <p className="dm-14 mb-[13px] leading-4">심플한 명함입니다.</p>
          </div>
          <span className="dmn-14 text-gray88">2023.09.13</span>
        </div>
      </div>
    </section>
  );
}
