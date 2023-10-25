import { create } from 'zustand';
import { WallType } from '@/types/wall';

type User = {
  accessToken?: string;
  memberId?: number;
  nickname?: string;
  refreshToken?: string;
} | null;

export type UserStoreType = {
  user: User | null;
  setUser: (user: User) => void;
};
export const useUserStore = create<UserStoreType>((set) => ({
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
  setUser: (user) => set(() => ({ user })),
}));

export type WallStoreType = {
  isEdit: boolean;
  setIsEdit: (bool: boolean) => void;
  isPreview: boolean;
  setIsPreview: (bool: boolean) => void;
  wall: WallType;
  setWall: (states: object) => void;
  getWall: () => Promise<void>;
};

export const useWallStore = create<WallStoreType>((set) => ({
  isEdit: false,
  setIsEdit: (bool) => set(() => ({ isEdit: bool })),
  isPreview: false,
  setIsPreview: (bool) => set(() => ({ isPreview: bool })),

  getWall: async () => {
    const response = await fetch('http://localhost:3000/wall');
    if (response.ok) {
      set({ wall: await response.json() });
    }
  },

  wall: {} as WallType,
  setWall: (states: object) =>
    set((state) => ({ wall: { ...state.wall, ...states } })),
}));

type TemplateState = {
  selectedTemplate: {
    category: string;
    templateId: string;
    templateTitle: string;
    templateDescription: string;
  };
  setSelectedTemplate: (template: {
    category: string;
    templateId: string;
    templateTitle: string;
    templateDescription: string;
  }) => void;
};

export const useTemplateStore = create<TemplateState>((set) => ({
  selectedTemplate: {
    category: '',
    templateId: '',
    templateTitle: '',
    templateDescription: '',
  },
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
}));
