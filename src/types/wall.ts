export type WallType = {
  category: string;
  isPublic: boolean;
  memberId: number;
  spaceId: number;
  spaceWallId: number;
  shareURL: string;
  wallInfoBlock: WallInfoBlock;
  blocks: Block[];
  styleSetting: StyleSetting;
};

export type CategoryType =
  | 'career'
  | 'personal'
  | 'event'
  | 'enterprise'
  | 'basic';

export interface WallInfoBlockResponse {
  wallInfoBlockId: number;
  wallInfoTitle: string;
  wallInfoDescription: string;
  wallInfoImgURL: null;
  backgroundImgURL: null;
}

export interface Block {
  blockUUID: string;
  blockType: string;
  subData: SubDatum[];
}

export type BlockType =
  | 'listBlock'
  | 'fileBlock'
  | 'snsBlock'
  | 'templateBlock'
  | 'freeBlock';

export interface SubDatum {
  freeBlockId?: number;
  freeTitle?: string;
  freeContent?: string;
  listBlockId?: number;
  listUUID?: string;
  listLabel?: string;
  listTitle?: string;
  listDescription?: string;
  isLink?: boolean;
  snsBlockId?: number;
  snsUUID?: string;
  snsType?: string;
  snsURL?: string;
  fileBlockId?: number;
  fileTitle?: string;
  fileDescription?: string;
  file?: string | null;
  fileName?: null | string;
  templateBlockId?: number;
  templateUUID?: string;
  templateTitle?: string;
  templateDescription?: string;
  hasAccessTemplateAuth?: number[];
  hasDenyTemplateAuth?: number[];
}

export interface StyleSetting {
  backgroundSetting: BackgroundSetting;
  blockSetting: BlockSetting;
  themeSetting: ThemeSetting;
}

export interface BackgroundSetting {
  backgroundSettingBlockId: number;
  solidColor: string;
  gradation: boolean;
  styleImgURL: null | string;
}

export interface BlockSetting {
  blockSettingBlockId: number;
  shape: string;
  style: string;
  styleColor: string;
  gradation: boolean;
}

export interface ThemeSetting {
  themeSettingBlockId: number;
  theme: string | null;
}

export interface WallInfoBlock {
  wallInfoBlockId: number;
  wallInfoTitle: string;
  wallInfoDescription: string;
  wallInfoImgURL: null | string;
  backgroundImgURL: null | string;
}
