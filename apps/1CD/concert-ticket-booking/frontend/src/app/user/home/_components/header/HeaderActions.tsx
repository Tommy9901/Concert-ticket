'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Filter, House, LogOut, ShoppingCart } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { LoginMutation } from '@/generated';

type AuthUser = LoginMutation['login']['user'];

type HeaderActionsProps = {
  user: AuthUser | null;
  signout: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  showSearchSlot: boolean;
};

export const HeaderActions = ({ user, signout, open, setOpen, showSearchSlot }: HeaderActionsProps) => {
  const handleItemClick = () => {
    setOpen(false);
  };

  const navClass = showSearchSlot
    ? 'col-start-2 row-start-1 flex items-center justify-end gap-1 md:gap-4 lg:col-start-3'
    : 'col-start-2 row-start-1 flex items-center justify-end gap-1 md:gap-4';

  return (
    <div className={navClass}>
      <Link href="/user/home/filter">
        <Filter className="mx-1 hidden h-4 w-4 lg:block xl:h-5 xl:w-5" />
      </Link>
      {!user && (
        <div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 lg:hidden">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger data-testid="dropdown-trigger">
                  <House className="h-5 w-5 text-gray-200 hover:text-white" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-white shadow-lg">
                  <DropdownMenuItem>
                    <Link href="/user/home/filter" className="hover:text-gray-300">
                      <button data-testid="EventsCl" onClick={handleItemClick}>
                        Эвентүүд
                      </button>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/user/sign-in" className="hover:text-gray-300">
                      <button data-testid="SignInCl" onClick={handleItemClick}>
                        Нэвтрэх
                      </button>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/user/sign-up" className="hover:text-gray-300">
                      <button data-testid="SignUpCl" onClick={handleItemClick}>
                        Бүртгүүлэх
                      </button>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link href="/user/sign-up">
              <Button
                data-cy="SignUpBtn"
                data-testid="SignUpBtn"
                className="hidden w-20 rounded-lg border border-gray-600 bg-black text-[10px] font-medium leading-5 md:w-28 md:text-xs xl:w-36 xl:text-sm lg:block"
              >
                Бүртгүүлэх
              </Button>
            </Link>
            <Link href="/user/sign-in">
              <Button
                data-cy="SignInBtn"
                data-testid="SignInBtn"
                className="hidden w-20 bg-[#00B7f4] text-[10px] font-medium leading-5 text-black hover:text-white md:w-28 md:text-xs xl:w-36 xl:text-sm lg:block"
              >
                Нэвтрэх
              </Button>
            </Link>
          </div>
        </div>
      )}
      {user && (
        <div className="flex items-center gap-2">
          <Link href="/user/home/user-profile">
            <ShoppingCart className="mx-1 hidden h-4 w-4 md:mx-4 lg:block xl:h-5 xl:w-5" />
          </Link>
          <span data-cy="UserEmail" data-testid="UserEmail" className="hidden text-sm font-medium text-gray-300 lg:block">
            {user.email}
          </span>
          <div className="flex items-center gap-2 lg:hidden">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger data-testid="dropdown-trigger">
                <House className="h-5 w-5 text-gray-200 hover:text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 text-white shadow-lg">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/user/home/user-profile" className="hover:text-gray-300">
                    <button data-testid="user-close-button" onClick={handleItemClick}>
                      Хэрэглэгчийн мэдээлэл
                    </button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/user/home/filter" className="hover:text-gray-300">
                    <button data-testid="ClEvents" onClick={handleItemClick}>
                      Эвентүүд
                    </button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button data-testid="SignOutCl" onClick={signout} variant="ghost" className="text-red-500">
                    <LogOut className="h-4 w-4" />
                    <span>Гарах</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button data-cy="SignOutBtn" data-testid="SignOutBtn" className="hidden bg-black font-medium leading-5 text-white md:text-sm lg:block" onClick={signout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
