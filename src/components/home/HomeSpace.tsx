import spaceIcon from '@/assets/icons/home/space.svg';
import userIcon from '@/assets/icons/home/user.svg';
import arrowRightIcon from '@/assets/icons/home/arrowRight.svg';
import { useNavigate } from 'react-router-dom';
import Icon from '../common/Icon';

export default function HomeSpace({ memberName }: { memberName?: string }) {
  const navigate = useNavigate();
  return (
    <section className="mb-[40px]">
      <div className="flex items-center gap-[8px] db-20 mb-[14px] text-lightBlack">
        <Icon src={spaceIcon} />
        <span>스페이스</span>
      </div>
      <div className="space-y-[10px]">
        <div className="bg-lightGray p-[18px] rounded-[15px]">
          <div className="db-16 mb-[6px]">개인 스페이스</div>
          <p className="dm-14 text-gray88 mb-[31px] leading-4">
            내가 받은 문서를 보관하거나,
            <br />
            지인들에게 공지·레터·계약문서를 보낼 수 있어요.
          </p>
          <div
            className="flex items-center justify-between hover ring-2 ring-offset-2 ring-blue"
            onClick={() => navigate('/space/personal')}
          >
            <div>
              <Icon src={userIcon} className="w-[16px] mr-[15px]" />
              <span className="dm-16">{memberName}</span>
            </div>
            <Icon src={arrowRightIcon} />
          </div>
        </div>
        <div className="bg-lightGray p-[18px] rounded-[15px]">
          <div className="db-16 mb-[6px]">단체 스페이스</div>
          <p className="dm-14 text-gray88 mb-[31px] leading-4">
            내가 초대되어있거나 내가 만든 스페이스로,
            <br />
            다양한 자버 문서를 보낼 수 있어요.
          </p>
          <div className="flex items-center justify-between hover">
            <div>
              <Icon src={userIcon} className="w-[16px] mr-[15px]" />
              <span className="dm-16 space-x-6">
                <span>단체스페이스</span>
              </span>
            </div>
            <Icon src={arrowRightIcon} />
          </div>
        </div>
      </div>
    </section>
  );
}
