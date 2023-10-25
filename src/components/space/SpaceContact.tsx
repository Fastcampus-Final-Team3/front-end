import circleArrowRightIcon from '@/assets/icons/space/circle-arrow-right.svg';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import userIcon from '@/assets/icons/user.svg';
import { useEffect, useState } from 'react';
import TempSaveModal from './TempSaveModal';
import Icon from '../common/Icon';
import { customAxios } from '@/api/customAxios';
import type { SpaceInfo } from '@/types/space';

export default function SpaceContact() {
  // const hasSpace = memberInfo && memberInfo?.spaceWall.personal.length > 0;
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>();
  const [isTempModalOpen, setIsTempModalOpen] = useState(false);
  const { state } = useLocation();
  console.log(spaceInfo);
  const handleNextStep = async () => {
    // TODO
    if (spaceInfo?.hasWall) {
      navigate(`/wall/${spaceInfo.spaceWallId}`);
      return;
    }
    // try {
    //   const response = await fetch(
    //     `${import.meta.env.VITE_SERVER_BASE_URL}/wall-temporary/storage/${
    //       memberInfo?.member.memberId as number
    //     }/${memberInfo?.spaceWall.personal[0].spaceId as number}`,
    //   );
    //   if (response.ok) {
    //     navigate(`/category`);
    //     return;
    //   }
    //   setIsTempModalOpen(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await getSpace(
  //         memberInfo?.member.memberId as number,
  //         memberInfo?.spaceWall.personal[0].spaceId as number,
  //         memberInfo?.spaceWall.personal[0].spaceType as string,
  //       );
  //       setSpaceWallId(response.data.spaceWallId);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getData();
  // }, [memberInfo?.member.memberId, memberInfo?.spaceWall.personal]);

  useEffect(() => {
    const getSpaceInfo = async () => {
      try {
        const response = await customAxios(
          `/employee/${spaceId}?spaceType=${state}`,
        );
        setSpaceInfo(response.data.data as SpaceInfo);
      } catch (error) {
        console.error(error);
      }
    };
    getSpaceInfo();
  }, [spaceId, state]);

  if (!state) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="bg-sky min-h-screen pl-[24px]">
      <TempSaveModal
        spaceWallId={spaceInfo?.spaceWallId}
        isTempModalOpen={isTempModalOpen}
        setIsTempModalOpen={setIsTempModalOpen}
        // memberInfo={memberInfo}
      />
      <div className="bg-white px-[24px] py-[22px] rounded-tl-[24px] rounded-bl-[24px] min-h-[calc(100vh-99px)] ">
        <div className="flex items-center justify-between border-lightBlack border-solid border-b-[1px] pb-[15px] mb-[15px]">
          <div
            className="flex items-center gap-2 hover"
            onClick={handleNextStep}
          >
            <p className="dm-16">
              {spaceInfo?.hasWall ? '공유페이지 이동' : '공유페이지 생성'}
            </p>
            <Icon src={circleArrowRightIcon} />
          </div>
        </div>
        <ul>
          {spaceInfo?.list.map((contact) => (
            <li
              key={contact.memberId}
              className="flex items-center gap-[12px] border-line border-solid border-b-[1px] pb-[18px] mt-[18px]"
            >
              <Icon src={userIcon} className="w-[18px] h-[18px]" />
              <span className="dm-16">{123}</span>
              <p className="text-gray88 dm-16">{contact.accountType}</p>
              <p className="text-gray88 dm-16">{contact.memberHashtag}</p>
              <p className="text-gray88 dm-16">{contact.memberName}</p>
              <p className="text-gray88 dm-16">{contact.phoneNumber}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
