import { WallType } from '@/types/wall';

export const wall: WallType = {
  category: 'personal',
  memberId: 1,
  spaceId: 1,
  shareURL: 'howooking',
  wallInfoBlock: {
    wallInfoBlockId: 9,
    wallInfoTitle: '김현우',
    wallInfoDescription: '안녕하세요. 백엔드 개발자 김현우입니다.',
    wallInfoImgURL: 'https://avatars.githubusercontent.com/u/87072568?v=4',
    backgroundImgURL:
      'https://images.unsplash.com/photo-1696251143046-2d32fb985b59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
  },
  blocks: [
    {
      blockUUID: '1108fff1-0106-4340-b505-280e15626ecc',
      blockType: 'listBlock',
      subData: [
        {
          listBlockId: 33,
          listLabel: '학력/경력',
          listTitle: '학력',
          listDescription: '서울대학교',
          isLink: false,
        },
        {
          listBlockId: 34,
          listLabel: '학력/경력',
          listTitle: '경력',
          listDescription: 'https://www.naver.com',
          isLink: true,
        },
      ],
    },
    {
      blockUUID: '4-0106-4340-b505-280e15626ecc',
      blockType: 'listBlock',
      subData: [
        {
          listBlockId: 35,
          listLabel: '자격증',
          listTitle: '운전면허증',
          listDescription: '2종보통',
          isLink: false,
        },
        {
          listBlockId: 36,
          listLabel: '자격증',
          listTitle: '바리스타자격증',
          listDescription: '스타벅스',
          isLink: false,
        },
      ],
    },
    {
      blockUUID: '7-0106-4340-b505-280e15626ecc',
      blockType: 'freeBlock',
      subData: [
        {
          freeBlockId: 13,
          freeTitle: '자유블록 제목',
          freeContent: '자유블록 내용',
        },
      ],
    },
    {
      blockUUID: '8-0106-4340-b505-280e15626ecc',
      blockType: 'freeBlock',
      subData: [
        {
          freeBlockId: 14,
          freeTitle: '자유블록 제목',
          freeContent: '자유블록 내용',
        },
      ],
    },
    {
      blockUUID: '9-0106-4340-b505-280e15626ecc',
      blockType: 'templateBlock',
      subData: [
        {
          templateBlockId: 17,
          templateUUID: '0-0106-4340-b505-280e15626ecc',
          templateTitle: '자기소개서',
          templateDescription: '김현우님의 자기소개서입니다.',
        },
        {
          templateBlockId: 18,
          templateUUID: 'a-0106-4340-b505-280e15626ecc',
          templateTitle: '문의하기',
          templateDescription: '궁금한 점이나 제안할 내용을 작성해주세요.',
        },
      ],
    },
    {
      blockUUID: 'b-0106-4340-b505-280e15626ecc',
      blockType: 'snsBlock',
      subData: [
        {
          snsBlockId: 25,
          snsUUID: 'c-0106-4340-b505-280e15626ecc',
          snsType: 'facebook',
          snsURL: 'https://asdf.facebook.com',
        },
        {
          snsBlockId: 26,
          snsUUID: 'd-0106-4340-b505-280e15626ecc',
          snsType: 'instagram',
          snsURL: 'https://adfd.instagram.com',
        },
      ],
    },
    {
      blockUUID: 'f108fff1-0106-4340-b505-280e15626ecc',
      blockType: 'fileBlock',
      subData: [
        {
          fileBlockId: 11,
          fileTitle: '포트폴리오1',
          fileDescription: '2022년 포트폴리오',
          fileName: '',
        },
      ],
    },
  ],
  styleSetting: {
    backgroundSetting: {
      backgroundSettingBlockId: 7,
      solidColor: '#eeeeee',
      gradation: false,
      styleImgURL: null,
    },
    blockSetting: {
      blockSettingBlockId: 7,
      shape: '0px',
      style: 'none',
      styleColor: '#ffffff',
      gradation: false,
    },
    themeSetting: {
      themeSettingBlockId: 7,
      theme: null,
    },
  },
};
