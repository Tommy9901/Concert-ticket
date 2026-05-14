'use client';

import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';
import type { TicketType } from '@/generated';

type OrderDetailTicketRowProps = {
  type: TicketType;
  idx: number;
  quantity: number[];
  handleQuantityChange: (_idx: number, _id: string, _price: number, _name: string, _operation: 'add' | 'sub') => void;
};

const zoneTextClass = (idx: number) => {
  if (idx === 0) return 'text-[#4651C9]';
  if (idx === 1) return 'text-[#C772C4]';
  return 'text-white';
};

export const OrderDetailTicketRow = ({ type, idx, quantity, handleQuantityChange }: OrderDetailTicketRowProps) => {
  const totalQuantity = Number(type.totalQuantity);
  const soldQuantity = Number(type.soldQuantity);
  const remainingQuantity = totalQuantity - soldQuantity;
  const discount = Number(type.discount);
  const unitPrice = Number(type.unitPrice);
  const discountPrice = (unitPrice * (100 - discount)) / 100;
  const price = discount !== 0 ? discountPrice : unitPrice;
  const textClass = `flex flex-col justify-between text-sm ${zoneTextClass(idx)}`;

  return (
    <div data-cy={`ticket-type-${idx}`} className="w-full border-b border-dashed border-[#1F1F1F]">
      <div className="flex w-full flex-col gap-3 rounded-md bg-[#131313] py-3 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-2">
        <div className={textClass}>
          <span className="flex h-auto flex-wrap items-center gap-x-2 sm:h-5">
            <Circle className="mr-2 h-3 w-3 shrink-0" />
            <div className="text-sm font-bold">{type.zoneName}</div>
            <div className="text-sm font-semibold">({remainingQuantity})</div>
          </span>
          <div data-cy={`ticket-price-${idx}`}>
            {discount !== 0 ? (
              <div className="flex flex-col">
                <p className="text-sm text-white" data-cy={`discount-price-${idx}`}>
                  {discountPrice} <span>₮</span>
                </p>
                <p className="text-xs font-light text-muted-foreground">
                  {unitPrice} <span>₮</span>
                </p>
              </div>
            ) : (
              <p className="text-sm text-white" data-cy={`unit-price-${idx}`}>
                {unitPrice} <span>₮</span>
              </p>
            )}
          </div>
          <div className="text-xs font-light text-muted-foreground">{type.additional}</div>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-1">
          <Button
            data-cy={`decrease-${idx}`}
            onClick={() => handleQuantityChange(idx, type._id, price, type.zoneName, 'sub')}
            className="rounded-md px-3 py-1 hover:bg-slate-100 hover:text-black"
          >
            -
          </Button>
          <input data-cy={`quantity-input-${idx}`} readOnly type="number" value={quantity[idx] || 0} className="w-10 bg-[#131313] text-center text-white" />
          <Button
            data-cy={`increase-${idx}`}
            disabled={remainingQuantity <= quantity[idx]}
            onClick={() => handleQuantityChange(idx, type._id, price, type.zoneName, 'add')}
            className="rounded-md px-3 py-1 hover:bg-slate-100 hover:text-black"
          >
            +
          </Button>
        </div>
      </div>
      {remainingQuantity <= quantity[idx] && (
        <p className="ml-4 text-xs text-red-500">Та {quantity[idx]}-с дээш суудал захиалах боломжгүй байна!</p>
      )}
    </div>
  );
};
