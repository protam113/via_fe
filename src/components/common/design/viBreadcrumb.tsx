'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ViBreadcrumb = () => {
  const path = usePathname();

  const pathArray = path?.split('/vi').filter((p) => p);

  return (
    <div className="ml-4 text-2xl font-bold  mt-4 mb-4 text-white">
      {/* Home */}
      <Link href="/vi" passHref>
        <span className="hover:text-gray-500 mr-1">trang chủ</span>
      </Link>

      {pathArray?.map((segment, index) => {
        const href = '/' + pathArray.slice(0, index + 1).join('/');
        return (
          <span key={href}>
            &gt;
            {index === pathArray.length - 1 ? (
              <span className="ml-1 text-white">{segment}</span>
            ) : (
              <>
                <Link href={href} passHref>
                  <span className="hover:text-white ml-1">{segment}</span>
                </Link>
              </>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default ViBreadcrumb;
