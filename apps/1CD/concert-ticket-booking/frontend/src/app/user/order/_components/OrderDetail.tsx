/* eslint-disable no-unused-vars */
/* eslint-disable  complexity */
'use client';
import { Button } from '@/components/ui/button';
import { useGetTicketWithVenueLazyQuery } from '@/generated';
import { Order } from '@/utils/type';
import dayjs from 'dayjs';
import { Asterisk } from 'lucide-react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'sonner';
import { OrderDetailTicketRow } from './OrderDetailTicketRow';

type OrderDetailProp = {
  setState: Dispatch<SetStateAction<number>>;
  setOrder: Dispatch<SetStateAction<Order[]>>;
  setQuantity: Dispatch<SetStateAction<number[]>>;
  order: Order[] | null;
  quantity: number[];
  handleQuantityChange: (idx: number, id: string, price: number, name: string, operation: 'add' | 'sub') => void;
};
const OrderDetail = ({ setState, setQuantity, quantity, order, handleQuantityChange }: OrderDetailProp) => {
  const [getTicket, { data, error, loading }] = useGetTicketWithVenueLazyQuery();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const venueId = searchParams.get('venue');
  const venue = data?.getTicketWithVenue.findVenue;
  const ticket = data?.getTicketWithVenue.findTicket;
  useEffect(() => {
    getTicket({
      variables: {
        input: {
          ticketId: id as string,
          venueId: venueId!,
        },
      },
    });
  }, [id, venueId, getTicket]);

  useEffect(() => {
    if (ticket && ticket.ticketType) {
      setQuantity(ticket.ticketType.map(() => 0));
    }
  }, [ticket]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [error]);
  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-8 px-4 lg:flex-row lg:items-start lg:justify-center lg:gap-10" data-cy="order-detail">
      {loading ? (
        <div className="flex min-h-[50vh] w-full items-center justify-center">
          <div className="text-xl font-semibold text-white">Loading...</div>
        </div>
      ) : (
        <>
          <div data-cy="venue-image" className="w-full shrink-0 lg:max-w-xl">
            {venue?.image ? (
              <Image src={venue.image} alt="Venue Image" width={500} height={300} className="h-auto max-h-[320px] w-full rounded-md object-cover sm:max-h-[400px]" />
            ) : (
              <div>No image available</div>
            )}
          </div>
          <div className="mx-auto flex h-auto w-full max-w-md flex-col items-center justify-center gap-3 rounded-md bg-[#131313] px-4 py-6 sm:px-6">
            <div data-cy="event-scheduled-time" className="w-full max-w-[320px] px-1">
              <p className="w-full bg-[#131313] pl-1 text-sm text-white sm:text-base">
                Сонгосон өдөр: {dayjs(ticket?.scheduledDay).format('YY.MM.DD hh:mm a')}
              </p>
            </div>
            <div className="w-full max-w-[320px]">
              {ticket?.ticketType.map((type, idx) => (
                <OrderDetailTicketRow
                  key={type._id}
                  type={type}
                  idx={idx}
                  quantity={quantity}
                  handleQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
        <div data-cy="order-summary" className="flex w-full max-w-[320px] flex-col gap-5 px-2 pt-2 text-[14px] text-white sm:px-5">
          <div>
            {order &&
              order.map((item, idx) => (
                <div key={idx} className="flex justify-between text-[#A1A1AA] px-5" data-cy={`order-item-${idx}`}>
                  <p className='flex items-center flex-nowrap'>
                    {item.zoneName} <Asterisk size={10}/> {item.buyQuantity}
                  </p>
                  <p>
                    {item.price * item.buyQuantity} <span>₮</span>
                  </p>
                </div>
              ))}
            <div className="mt-4">
              <p className="px-5 text-white" data-cy="total-price">
                Нийт төлөх дүн: {order && order.reduce((total, item) => total + item.price * item.buyQuantity, 0)} <span>₮</span>
              </p>
            </div>
          </div>
          <Button
            disabled={order?.length === 0}
            data-cy="purchase-ticket-button"
            onClick={() => setState(2)}
            className="mx-auto h-10 w-full max-w-sm rounded-md bg-[#00B7F4] text-white hover:bg-white hover:text-[#00B7F4]"
          >
            Тасалбар авах
          </Button>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
export default OrderDetail;


