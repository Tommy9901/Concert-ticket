import { Event } from '@/generated';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
const DetailTop = ({ event }: { event: Event }) => {
  return (
    <div className="relative w-full min-h-[220px] sm:min-h-[280px] md:min-h-[320px]" data-cy="DetailTop-Component">
      {event?.image && (
        <Image src={event.image} alt="" fill className="object-cover" sizes="100vw" priority />
      )}
      <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 bg-gradient-to-t from-black via-black/70 to-black/20 p-4 sm:gap-4 sm:p-6 md:items-center md:justify-center md:bg-black/35 md:from-black/60 md:via-black/25 md:to-transparent md:p-8">
        <div className="flex max-w-full flex-wrap gap-2">
          {event?.mainArtists.map((artist) => (
            <span className="mb-1 w-fit rounded-2xl border border-white border-opacity-25 px-2 py-1 text-xs sm:text-sm" key={artist.name}>
              {artist?.name}
            </span>
          ))}
        </div>
        {event?.name && (
          <p className="max-w-full text-balance text-2xl font-bold text-white sm:text-3xl md:text-center md:text-4xl lg:text-5xl">{event.name}</p>
        )}
        <div className="flex flex-wrap items-center gap-2 text-sm text-white sm:text-base md:justify-center">
          <Calendar className="h-4 w-4 shrink-0" />
          {event?.scheduledDays.map((day) => (
            <span key={day}>{dayjs(day).format('MM.DD')}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailTop;
