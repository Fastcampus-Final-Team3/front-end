import { Navbar } from '@/components/navbar/Navbar';
import { useUserStore } from '@/store';
import { useEffect, useState } from 'react';
import spaceIcon from '@/assets/icons/home/space.svg';
import userIcon from '@/assets/icons/home/user.svg';
import arrowRightIcon from '@/assets/icons/home/arrowRight.svg';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/common/Icon';

export default function Home() {
  const [personalSpaceTitle, setPersonalSpaceTitle] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  useEffect(() => {
    const getUserSpace = async () => {
      try {
        const response = await fetch(
          `https://javajobers.shop/api/home/${user?.memberId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const {
          data: { spaceWall },
        } = await response.json();
        setPersonalSpaceTitle(spaceWall.personal[0].spaceTitle);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };
    getUserSpace();
  }, [setUser, user?.accessToken, user?.memberId]);

  return (
    <>
      <Navbar />
      <div className="px-[24px] py-[22px] break-keep">
        <section className="mb-[40px]">
          <div className="flex items-center gap-[8px] db-20 mb-[14px] text-lightBlack">
            <Icon src={spaceIcon} />
            <span>스페이스</span>
          </div>
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
                <span className="dm-16">{personalSpaceTitle}</span>
              </div>
              <Icon src={arrowRightIcon} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
