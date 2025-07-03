'use client';

import { Skeleton } from '@/components/ui/skeleton'; // nếu có dùng component này
import { AlertCircle } from 'lucide-react';
import { NewsList } from '@/lib';
import { iconMap, isValidUrlType } from '../options/news_icons';
import { SocialMediaIcon } from '@/assets/icons/icons';
import Link from 'next/link';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components';
import { truncateText } from '@/utils/helpers/truncate_text.helper';

export default function RecentNews() {
  const params = {
    page_size: 5,
  };

  const { news, isLoading, isError } = NewsList(1, params, 0);

  return (
    <div className="p-6 rounded-none shadow border border-gray-300">
      <h2 className="text-xl font-semibold mb-4">Recent Contact</h2>
      <div className="flow-root min-h-[150px]">
        {isLoading ? (
          <ul className="-my-5 divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <li key={index} className="py-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-6 w-6 rounded-full bg-gray-200" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-4 w-3/4 mb-1 bg-gray-200" />
                    <Skeleton className="h-3 w-1/2 bg-gray-200" />
                  </div>
                  <Skeleton className="h-5 w-20 rounded-full bg-gray-200" />
                </div>
              </li>
            ))}
          </ul>
        ) : isError ? (
          <div className="flex items-center text-sm text-red-500 space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>Failed to load news. Please try again.</span>
          </div>
        ) : (
          <ul className="-my-5 divide-y divide-gray-200">
            {news.map((contact) => (
              <li key={contact.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 text-gray-500">
                    {/* Dùng icon tương ứng với url_type */}
                    {isValidUrlType(contact.url_type) ? (
                      iconMap[contact.url_type]
                    ) : (
                      <SocialMediaIcon.TbWorld />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {contact.title}
                    </p>
                    <p className="text-sm text-gray-500">{contact.url_type}</p>
                  </div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="text-blue-600 underline hover:text-blue-800">
                            {truncateText(contact.url, 40)}
                          </span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{contact.url}</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isLoading && !isError && (
        <div className="mt-6">
          <Link
            href="/admin/news"
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-none text-gray-700 bg-white hover:bg-gray-50"
          >
            View all news
          </Link>
        </div>
      )}
    </div>
  );
}
