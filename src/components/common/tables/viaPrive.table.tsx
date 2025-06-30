'use client';

import { Icons } from '@/assets/icons/icons';
import { ENV, ExhibitionsList } from '@/lib';
import { Container, PushButton } from '@/components';
import CustomImage from '@/components/common/design/image.component';
import NoResultsFound from '@/components/common/design/NoResultsFound';
import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components';
import { PriveContactTable } from './priveContact.table';
import Heading from '../design/Heading';

const ViaPrivePost = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data

  const params = {
    language: selectedLanguage,
    category_id: ENV.VIA_PRIVE_ID,
    page_size: 1,
  };

  const { exhibitions, isLoading, isError } = ExhibitionsList(
    1,
    params,
    refreshKey
  );

  const slug = exhibitions?.[0]?.id;

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-700">
          <Icons.Loader2 className="animate-spin h-8 w-8 mb-4 text-gray-500" />
          <p className="text-lg font-medium">
            Loading the latest news for you...
          </p>
          <p className="text-sm text-gray-500 mt-2">Please wait a moment </p>
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <p className="text-red-main">Oops! Failed to load news.</p>
      </Container>
    );
  }

  // State for the form
  const handleTypeChange = (value: string) => {
    setSelectedLanguage(value);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <div className="gap-4 w-full">
        <div className="flex items-center justify-between mb-4">
          <Heading name="Current posts" desc="Manage current posts" />

          <PushButton href={`/admin/via-prive/${slug}`} label="View Detail" />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-16 font-semibold">Language:</span>
          <Select
            onValueChange={handleTypeChange}
            defaultValue={String(selectedLanguage)}
          >
            <SelectTrigger className="w-[120px] rounded-none">
              <SelectValue placeholder={selectedLanguage} />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="en" className="rounded-none">
                English
              </SelectItem>
              <SelectItem value="vn" className="rounded-none">
                Vietnamese
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <section className="order-2 md:order-none w-full md:flex-1 flex flex-col">
          {exhibitions?.length === 0 ? (
            <NoResultsFound />
          ) : (
            <div className="container mx-auto px-4 py-8">
              <div className="mx-auto">
                <h2 className="text-4xl md:text-3xl mb-4 font-bold text-gray-900">
                  {exhibitions[0].title}
                </h2>
              </div>
              <div className="relative w-full h-96 md:h-[500px] mb-8  overflow-hidden">
                <CustomImage
                  src={exhibitions[0].thumbnail.url}
                  alt={exhibitions[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <Heading
                  name="Contact list"
                  desc="Manage your contact information here"
                />
                <PriveContactTable exhibition_id={exhibitions[0].id} />
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ViaPrivePost;
