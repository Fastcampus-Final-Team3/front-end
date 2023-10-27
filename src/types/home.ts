export interface SpacesInfo {
  member: Member;
  space: SpaceWall;
}

export interface Member {
  memberId: number;
  memberName: string;
  memberProfileImageUrl: null;
  memberShip: string;
}

export interface SpaceWall {
  personal: Organization[];
  organization: Organization[];
}

export interface Organization {
  spaceId: number;
  spaceType: string;
  spaceTitle: string;
}
