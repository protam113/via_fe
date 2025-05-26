'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumb = () => {
  const path = usePathname();

  const pathArray = path?.split('/').filter((p) => p);

  return (
    <div className="ml-4 text-14  mt-4 mb-4 text-gray-500">
      {/* Home */}
      <Link href="/vi" passHref>
        <span className="hover:text-lime-500 mr-1">Trang Chủ</span>
      </Link>

      {pathArray?.map((segment, index) => {
        const href = '/' + pathArray.slice(0, index + 1).join('/');
        return (
          <span key={href}>
            &gt;
            {index === pathArray.length - 1 ? (
              <span className="ml-1 text-lime-500">{segment}</span>
            ) : (
              <>
                <Link href={href} passHref>
                  <span className="hover:text-lime-500 ml-1">{segment}</span>
                </Link>
              </>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
