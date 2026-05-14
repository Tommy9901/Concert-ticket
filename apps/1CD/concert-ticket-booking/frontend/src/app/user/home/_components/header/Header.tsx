'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/AuthProvider';
import { useQueryState } from 'nuqs';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { HeaderActions } from './HeaderActions';

export const Header = () => {
  const [q, setQ] = useQueryState('q', { defaultValue: '' });
  const { user, signout } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isDetailOrProfilePage = pathname?.includes('/user/home/event/') || pathname?.includes('/user/home/user-profile');
  const headerGrid = isDetailOrProfilePage
    ? 'z-10 grid grid-cols-[1fr_auto] items-center gap-3 border-b border-gray-600 bg-black px-4 py-4 text-white md:px-12 md:py-6'
    : 'z-10 grid grid-cols-[1fr_auto] items-center gap-3 border-b border-gray-600 bg-black px-4 py-4 text-white md:px-12 md:py-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-8';

  return (
    <div className={headerGrid}>
      <div className="col-start-1 row-start-1 flex items-center justify-start">
        <Link href="/user/home" className="flex gap-2">
          <Image src="/images/logo.png" alt="HeaderLogo" width={212} height={48} className="h-8 w-auto max-w-[160px] object-contain sm:h-9 md:h-12 md:max-w-none" />
        </Link>
      </div>

      {!isDetailOrProfilePage && (
        <div className="relative col-span-2 row-start-2 flex min-h-10 w-full min-w-0 items-center lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:px-2">
          <Input
            data-testid="Search-Input"
            type="text"
            placeholder="Хайлт"
            className="w-full border-gray-600 bg-black pr-10 text-xs sm:text-sm"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Search className="pointer-events-none absolute right-3 h-4 w-4 text-gray-400" />
        </div>
      )}

      <HeaderActions user={user} signout={signout} open={open} setOpen={setOpen} showSearchSlot={!isDetailOrProfilePage} />
    </div>
  );
};
