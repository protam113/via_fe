import type {
  ExhibitionListData,
  UpdateHeadExhibitionData,
  UpdateTranslationData,
} from './exhibition.type';

export interface ExhibitionTableProps {
  exhibitions: ExhibitionListData[];
  isLoading: boolean;
  isError: boolean;
  type: 'via-art-fair' | 'via-atelier' | 'via-prive';
}

export interface UpdateExhibitionDialogProps {
  postId: string;
  exhibition: UpdateHeadExhibitionData;
  category: string;
  href: string;
}

export interface UpdateTranslationDialogProps {
  exhibition: UpdateTranslationData;
}

export interface AddTranslationDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSuccess?: () => void;
  language: string;
  postId: string;
}
