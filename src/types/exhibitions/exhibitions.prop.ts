import type { ExhibitionListData } from './exhibition.type';

export interface ExhibitionTableProps {
  exhibitions: ExhibitionListData[];
  isLoading: boolean;
  isError: boolean;
  type: 'via-art-fair' | 'via-atelier' | 'via-prive';
}
