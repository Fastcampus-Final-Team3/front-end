import circleArrowRightIcon from '@/assets/icons/space/circle-arrow-right.svg';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import TempSaveModal from './TempSaveModal';
import Icon from '../common/Icon';
import type { SpaceInfo } from '@/types/space';
import ContactTable, { DataType } from './ContactTable';
import useCustomAxios from '@/hooks/useCustomAxios';

export default function SpaceContact() {
  const customAxios = useCustomAxios();
  const {
    state: { spaceType, spaceTitle },
  } = useLocation();
  const navigate = useNavigate();
  const { spaceId } = useParams();
  useEffect(() => {
    localStorage.setItem('spaceId', spaceId as string);
  }, [spaceId]);

  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>();
  const [isTempModalOpen, setIsTempModalOpen] = useState(false);
  const [tempSpaceWallId, setTempSpaceWallId] = useState();

  const handleNextStep = async () => {
    // TODO
    if (spaceInfo?.hasWall) {
      navigate(`/wall/${spaceInfo.spaceWallId}`, {
        state: { spaceId, isNew: false },
      });
      return;
    }
    try {
      const response = await customAxios(`wall-temporary/check/${spaceId}`);
      if (!response.data.data.hasWallTemporary) {
        navigate(`/category`, { state: { spaceType, spaceId } });
        return;
      }
      setIsTempModalOpen(true);
      setTempSpaceWallId(response.data.data.spaceWallId);
    } catch (error) {
      console.log(error);
    }
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
          `/employee/${spaceId}?spaceType=${spaceType}`,
        );
        setSpaceInfo(response.data.data as SpaceInfo);
      } catch (error) {
        console.error(error);
      }
    };
    getSpaceInfo();
  }, [spaceId, spaceType, localStorage.getItem('user')]);

  const data: DataType[] = useMemo(
    () =>
      spaceInfo?.list.map((contact) => ({
        key: contact.memberId,
        memberName: contact.memberName,
        accountType: contact.accountType,
        phoneNumber: contact.phoneNumber,
        memberHashtag: [contact.memberHashtag],
      })) || [],
    [spaceInfo?.list],
  );

  if (!spaceType) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="bg-sky min-h-screen pl-[24px]">
      <TempSaveModal
        tempSpaceWallId={tempSpaceWallId}
        spaceId={spaceId}
        spaceType={spaceType}
        isTempModalOpen={isTempModalOpen}
        setIsTempModalOpen={setIsTempModalOpen}
      />
      <div className="bg-white px-[24px] py-[22px] rounded-tl-[24px] rounded-bl-[24px] min-h-[calc(100vh-99px)]">
        <div className="flex items-center justify-between border-lightBlack border-solid border-b-[1px] pb-[15px] mb-[15px]">
          <div
            className="flex items-center gap-2 hover"
            onClick={handleNextStep}
          >
            <p className="dm-16">
              {spaceInfo?.hasWall
                ? `${spaceTitle} 공유페이지 이동`
                : `${spaceTitle} 공유페이지 생성`}
            </p>
            <Icon src={circleArrowRightIcon} />
          </div>
        </div>

        <ContactTable data={data} />
      </div>
    </div>
  );
}
