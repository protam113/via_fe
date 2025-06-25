/**
 * ==========================
 * 📌 @props ContactTableProps
 * ==========================
 */

import { ContactList } from './contact.type';

export interface ContactTableProps {
  contacts: ContactList[];
  isLoading: boolean;
  isError: boolean;
}
