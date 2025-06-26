import { ExhibitionListData } from './exhibition.type';

export interface ExhibitionTableProps {
  exhibitions: ExhibitionListData[];
  isLoading: boolean;
  isError: boolean;
}
