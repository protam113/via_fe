/**
 * ==========================
 * 📌 @props ContactTableProps
 * ==========================
 */

export interface ContactTableProps {
  contacts: any[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}
