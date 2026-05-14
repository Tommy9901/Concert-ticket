/* eslint-disable complexity */

import { Card } from '@/components/ui/card';
import { useGetOrderLazyQuery } from '@/generated';
import dayjs from 'dayjs';
import { Clock } from 'lucide-react';

import DialogComponent from './Dialog';
import toMNT from '@/utils/show-tugrik-format';
import { useAuth } from '@/components/providers';
import { useEffect } from 'react';

const OrderInfo = () => {
  const { refetchOrder } = useAuth();
  const [getOrder, { data, refetch }] = useGetOrderLazyQuery();
  const orders = data?.getOrder;
  useEffect(() => {
    getOrder();
  }, [refetchOrder]);
  return (
    <div className="w-full max-w-3xl text-white lg:max-w-[841px]" data-cy="order-info-container">
      <h1 data-cy="order-info-title" className="mb-6 text-2xl font-semibold">
        Захиалгын мэдээлэл
      </h1>
      {orders?.map((order) => {
        const totalAmount = order?.ticketType.reduce((total, ticket) => {
          const discount = Number(ticket.discount);
          const unitPrice = Number(ticket.unitPrice);
          const soldQuantity = Number(ticket.soldQuantity);
          const discountedPrice = discount > 0 ? (unitPrice * (100 - discount)) / 100 : unitPrice;
          return total + discountedPrice * soldQuantity;
        }, 0);
        return (
          <Card className="mb-8 border-none bg-[#131313] px-4 pb-6 pt-8 sm:px-8" key={order?._id} data-cy={`order-card-${order?._id}`}>
            <div className="mb-4 flex flex-col gap-4 text-white sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
              <div className="lg:gap-1 lg:flex">
                <h2 data-cy={`order-id-${order?._id}`} className="text-base font-normal text-muted-foreground">
                  Захиалгын дугаар :{' '}
                </h2>
                {order?._id}
                <p className="flex items-center gap-2 ml-[14px]">
                  <Clock className="w-4 h-4 " /> {dayjs(order?.createdAt).format('YYYY.MM.DD')}
                </p>
              </div>
              {order?.status === 'pending' && (
                <div data-cy={`order-status-pending-${order?._id}`}>
                  <span className="text-base font-normal text-muted-foreground">Төлөв: </span>
                  <span className="rounded-full bg-black py-2 px-[10px] border-[1px] border-[#27272A] text-xs font-semibold">Цуцлах хүсэлт илгээсэн</span>
                </div>
              )}
              {order?.status === 'approved' && (
                <div data-cy={`order-status-pending-${order?._id}`}>
                  <span className="text-base font-normal text-muted-foreground">Төлөв: </span>
                  <span className="rounded-full bg-black py-2 px-[10px] border-[1px] border-[#27272A] text-xs font-semibold">Хүсэлт баталгаажсан</span>
                </div>
              )}
              {order?.status === 'available' && <DialogComponent orderId={order._id} eventId={order.eventId} totalAmount={totalAmount} refetch={refetch} />}
            </div>
            {order?.ticketType?.map((ticket, index) => {
              const discount = Number(ticket.discount);
              const discountedPrice = Number((Number(ticket.unitPrice) * (100 - discount)) / 100);
              const soldQuantity = Number(ticket.soldQuantity);
              return (
                <div
                  className="mb-2 flex min-h-[52px] flex-col items-stretch justify-between gap-2 rounded-[6px] border border-dashed border-muted-foreground bg-[#131313] px-4 py-3 sm:flex-row sm:items-center sm:px-6"
                  key={index}
                  data-cy={`ticket-card-${index}`}
                >
                  <div>
                    <span className={`${index == 0 ? 'text-[#4651C9]' : index == 1 ? 'text-[#C772C4]' : 'text-white'} flex gap-2 items-center font-bold text-sm`} data-cy={`ticket-zone-${index}}`}>
                      <div className={`${index == 0 ? 'bg-[#4651C9]' : index == 1 ? 'bg-[#C772C4]' : 'bg-white'} h-3 w-3 rounded-full`}></div>
                      {ticket.zoneName}
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-white" data-cy={`ticket-price-${index}`}>
                    <span className="text-base font-normal text-muted-foreground">
                      {toMNT(discountedPrice)}×{ticket.soldQuantity}
                    </span>
                    <span>{toMNT(discountedPrice * soldQuantity)}</span>
                  </span>
                </div>
              );
            })}
            <div className="flex items-center justify-between px-6 py-4 text-white" data-cy={`order-total-${order?._id}`}>
              <span className="text-sm font-light">Төлсөн дүн</span>
              <span className="text-xl font-bold">{toMNT(Number(totalAmount))}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default OrderInfo;
