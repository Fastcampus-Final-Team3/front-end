export interface SpaceInfo {
  hasWall: boolean;
  spaceWallId: number;
  list: List[];
}

export interface List {
  memberId: number;
  memberName: string;
  memberHashtag: string;
  accountType: string;
  phoneNumber: string;
}
