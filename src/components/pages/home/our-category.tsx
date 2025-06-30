import CustomImage from '@/components/common/design/image.component';
import { Separator } from '@/components';
import { navItemsFeatured, CategoryList } from '@/lib';
import { Spinner } from '@/components/loading/spinner';
import { Link } from '@/i18n/navigation';

export function FeaturedSection() {
  const { categories, isLoading, isError } = CategoryList(
    1,
    { page_size: 3 },
    0
  );

  return (
    <section className="w-full py-8 px-4">
      <div className="mb-4">
        <h2 className="text-sm text-gray-500 uppercase mb-6 pb-2">Featured</h2>
        <Separator className="bg-gray-600" />
      </div>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p className="text-sm text-red-500">
          Failed to load featured categories.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {navItemsFeatured.map((navItem) => {
            const category = categories.find((c) => c.id === navItem.id);
            if (!category) return null;

            return (
              <Link
                key={navItem.id}
                href={{
                  pathname: navItem.path,
                }}
                className="block w-full"
              >
                <div className="group w-full flex items-center justify-between rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                  <div className="relative aspect-square w-full max-w-[100px] rounded-md overflow-hidden">
                    <CustomImage
                      src={category.thumbnail?.url || '/icons/Logo_noTitle.svg'}
                      alt={category.title}
                      fill
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-[16px] text-gray-800 transition-all duration-300 group-hover:text-red-600 group-hover:text-[18px]">
                    {category.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
