import { Event } from '@/generated';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Calendar, MapPin } from 'lucide-react';

const CardTicket = ({ event }: { event: Event }) => {
  const discount = Number(event.products[0].ticketType[1].discount) || 0; // Default to 0 if discount is falsy
  const unitPrice = Number(event.products[0].ticketType[1].unitPrice);
  const discountPrice = (unitPrice * (100 - discount)) / 100;

  return (
    <div className="relative mx-auto h-full w-full max-w-md overflow-hidden rounded border border-none" data-cy="Card-Component">
      <div className="relative aspect-video w-full overflow-hidden">
        {discount !== 0 && (
          <div className="absolute bottom-3 left-3 z-[1] rounded-xl bg-[#EF4444] px-2 py-1 text-xs font-bold text-white sm:text-sm">
            {event.products[0].ticketType[1].discount}%
          </div>
        )}
        <Image src={event.image} width={500} height={500} alt="" className="object-contain" />
      </div>
      <div className="flex h-full w-full flex-col gap-2 overflow-hidden bg-[#18181B] p-4 text-[#FAFAFA] sm:p-6">
        <div>
          <p className="text-lg font-normal sm:text-xl">{event.name}</p>
          {event.mainArtists.map((artist, index) => (
            <span className="text-muted-foreground text-[16px] font-light mr-2" key={index}>
              {artist.name}
            </span>
          ))}
        </div>

        {discount !== 0 ? (
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold">{discountPrice}₮ </p>
            <s className="text-muted-foreground text-[16px] font-light">{unitPrice}₮</s>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold">{unitPrice}₮</p>
          </div>
        )}

        <div className="flex flex-col justify-between text-muted-foreground">
          <div className="items-center gap-1 ">
            {event.scheduledDays.length > 1 ? (
              <span className="flex items-center gap-1">
                <Calendar className="w-4" />
                {dayjs(event.scheduledDays[0]).format('MM.DD')} - {dayjs(event.scheduledDays[event.scheduledDays.length - 1]).format('MM.DD')}
              </span>
            ) : (
              <span className="flex gap-2">
                {event.scheduledDays.map((day, index) => (
                  <span className="flex items-center gap-1" key={index}>
                    <Calendar className="w-4" />
                    {dayjs(day).format('MM.DD')}
                  </span>
                ))}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1 ">
            <MapPin className="w-4" />
            {event.venue.name}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardTicket;
