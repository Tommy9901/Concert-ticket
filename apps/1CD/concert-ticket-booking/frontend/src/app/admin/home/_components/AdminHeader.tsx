'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/components/providers';
import { LogOut } from 'lucide-react';

const navigation = [
  {
    name: 'Тасалбар',
    link: '/admin/home',
  },
  {
    name: 'Цуцлах хүсэлт',
    link: '/admin/cancel-request',
  },
];

export const AdminHeader = () => {
  const [activeLink, setActiveLink] = useState('/home');
  const { user } = useAuth();
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  if (!user || user.role !== 'admin') {
    return <div></div>;
  }

  return (
    <div className="w-full bg-white px-4 pt-4 text-black">
      <div data-cy="AdminHeader-Logo-Text" className="mx-auto mb-4 flex max-w-6xl flex-col gap-3 px-2 py-2 sm:mb-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-5 w-5 shrink-0 rounded-full bg-sky-400" />
          <h1 className="truncate text-lg font-semibold sm:text-2xl">TICKET BOOKING</h1>
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <Link href={'/admin/home/admin-profile'} className="min-w-0 max-w-full truncate text-sm sm:text-base">
            <span data-cy="AdminEmail" data-testid="AdminEmail">
              {user?.email}
            </span>
          </Link>
          <div data-cy="Admin-Header-Exit-Account" className="shrink-0">
            <Link href="/user/sign-in" className="bg-white text-black">
              <LogOut className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <div data-cy="AdminHeader-Navigation-link" className="flex flex-wrap gap-4 border-t border-gray-200 px-4 py-3 sm:gap-8 sm:px-8 md:px-12">
        {navigation.map((nav, idx) => (
          <Link
            key={idx}
            href={nav.link}
            className={`whitespace-nowrap pb-1 text-sm sm:text-base ${activeLink === nav.link ? 'border-b-2 border-b-black text-black' : 'text-gray-800'}`}
            onClick={() => handleLinkClick(nav.link)}
          >
            {nav.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
