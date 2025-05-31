'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [location, setLocation] = useState<string>('Đang lấy vị trí...');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Lấy vị trí
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(
            `Lat: ${latitude.toFixed(2)}, Lng: ${longitude.toFixed(2)}`
          );
        },
        (err) => {
          console.error('Không thể lấy vị trí:', err);
          setLocation('Không xác định vị trí');
        }
      );
    } else {
      setLocation('Trình duyệt không hỗ trợ định vị');
    }

    // Lấy giờ hệ thống theo thời gian thực
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString()); // Có thể thêm options nếu muốn định dạng đẹp
    }, 1000);

    return () => clearInterval(interval); // Clear khi unmount
  }, []);

  return (
    <footer>
      <div className="container mx-auto mb-4 max-w-7xl text-gray-600 font-semibold text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 ">
          <footer className="text-center text-sm text-gray-500 py-4">
            © {new Date().getFullYear()} All rights reserved. — by{' '}
            <Link
              href="https://vietstrix.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vietstrix
            </Link>
          </footer>

          {/* Thay phần info bằng đồng hồ */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span>Time: {currentTime}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <span>{location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
