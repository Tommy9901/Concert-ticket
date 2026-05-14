'use client';

import React, { useState } from 'react';
import UserInfo from './_components/UserInfo';
import PasswordReset from './_components/PasswordReset';
import OrderInfo from './_components/OrderInfo';

const UserInfoPage = () => {
  const [state, setState] = useState(1);

  return (
    <div className="flex min-h-[calc(100vh-1px)] justify-center bg-black px-4 py-6" data-cy="User-Info-Comp">
      <div className="mx-auto my-8 flex w-full max-w-5xl flex-col gap-8 lg:my-12 lg:flex-row lg:items-start lg:gap-10">
        <nav className="flex w-full shrink-0 flex-col gap-2 lg:w-56 xl:w-64" aria-label="Профайл цэс">
          <button
            data-cy="info-state-button"
            className="w-full rounded-md border border-transparent bg-[#09090B] px-4 py-2 text-start text-white transition-all duration-300 hover:bg-[#111112] focus:outline-none focus:ring-2 focus:ring-[#09090B]"
            onClick={() => setState(1)}
          >
            Хэрэглэгчийн мэдээлэл
          </button>
          <button
            data-cy="order-state-button"
            className="w-full rounded-md bg-transparent px-4 py-2 text-start text-white transition-all duration-300 hover:bg-[#09090B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#09090B]"
            onClick={() => setState(2)}
          >
            Захиалгын түүх
          </button>
          <button
            data-cy="password-state-button"
            className="w-full rounded-md bg-transparent px-4 py-2 text-start text-white transition-all duration-300 hover:bg-[#09090B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#09090B]"
            onClick={() => setState(3)}
          >
            Нууц үг сэргээх
          </button>
        </nav>
        <div className="min-w-0 flex-1">
          {state === 1 && <UserInfo />}
          {state === 2 && <OrderInfo />}
          {state === 3 && <PasswordReset />}
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;

