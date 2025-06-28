import { CategoryCountList, ContactCountList } from '@/lib';
import { Activity, Flame } from 'lucide-react';

export default function DashboardStats() {
  const { categoryCount, isLoading, isError } = CategoryCountList(0);
  const {
    contactCount,
    isLoading: isContactLoading,
    isError: isContactError,
  } = ContactCountList(0);

  const statData = [
    ...categoryCount.map((item: any) => ({
      name: item.title,
      value: item.total_count,
      icon: Activity,
      color: 'bg-blue-500',
    })),
    {
      name: 'Contacts',
      value: contactCount?.data || 0,
      icon: Flame,
      color: 'bg-red-500',
    },
  ];

  if (isLoading || isContactLoading) return <p>Loading...</p>;
  if (isError || isContactError) return <p>Error loading stats!</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {statData.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-200 border-gray-500 overflow-hidden shadow rounded-none"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
