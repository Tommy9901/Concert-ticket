'use client';
import { Event } from '@/generated';
import dayjs from 'dayjs';
import { Calendar, Clock4, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const EventDetail = ({ event }: { event: Event }) => {
  const [openDoorTime, setOpenDoorTime] = useState<string | null>(null);
  const [musicStartTime, setMusicStartTime] = useState<string | null>(null);
  useEffect(() => {
    if (event?.scheduledDays && event.scheduledDays.length > 0) {
      const scheduledTime = dayjs(event.scheduledDays[0]);
      const doorOpenTime = scheduledTime.subtract(2, 'hour').format('hh:mm A');
      setOpenDoorTime(doorOpenTime);
    }
  }, [event]);
  useEffect(() => {
    if (event?.scheduledDays && event.scheduledDays.length > 0) {
      const scheduledTime = dayjs(event.scheduledDays[0]);
      const startTime = scheduledTime.add(2, 'hour').format('hh:mm A');
      setMusicStartTime(startTime);
    }
  }, [event]);

  return (
    <div className="mx-auto w-full max-w-full px-4 sm:max-w-[533px] sm:px-5" data-cy="Event-Detail">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-x-6 sm:gap-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            <div className="flex items-center gap-2" data-cy="Scheduled-Days">
              <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
              {event?.scheduledDays.length > 1 ? (
                <span className="flex items-center text-sm text-white lg:text-base" data-cy="Scheduled-Days-Range">
                  {dayjs(event.scheduledDays[0]).format('YYYY.MM.DD')} - {dayjs(event.scheduledDays[event.scheduledDays.length - 1]).format('MM.DD')}
                </span>
              ) : (
                event?.scheduledDays.map((day, index) => (
                  <span className="flex items-center text-sm text-white lg:text-base" key={index} data-cy={`Scheduled-Day-${index}`}>
                    {dayjs(day).format('YYYY.MM.DD')}
                  </span>
                ))
              )}
            </div>
            <div className="flex items-center gap-2" data-cy="Scheduled-Time">
              <Clock4 className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-sm text-white lg:text-base">
                {event?.scheduledDays.length > 0 && <span className="flex items-center">{dayjs(event.scheduledDays[0]).format('hh:mm A')}</span>}
              </span>
            </div>
          </div>
          <div className="flex min-w-0 items-start gap-2 sm:max-w-[50%] sm:items-center">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 sm:mt-0" />
            <span className="text-sm text-white lg:text-base" data-cy="Venue-Name">
              {event?.venue.name}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div data-cy="Special-Artist">
            <h1 className="text-sm font-light leading-5 text-[#fafafa]">Special Artist:</h1>
            {event?.guestArtists?.map((guest, index) => (
              <span className="flex gap-1 text-sm font-semibold text-white" key={index} data-cy={`Guest-Artist-${index}`}>
                {guest?.name}
              </span>
            ))}
          </div>
          <div data-cy="Schedule-Time-Details">
            <h1 className="text-xs md:text-sm font-light text-[#fafafa] leading-5">Тоглолтын цагийн хуваарь:</h1>
            <ul>
              <li className="text-xs md:text-sm font-semibold text-[#fafafa] leading-5" data-cy="Door-Open-Time">
                Door Open: {openDoorTime}
              </li>
              <li className="text-xs md:text-sm font-semibold text-[#fafafa] leading-5" data-cy="Music-Start-Time">
                Music Start: {musicStartTime}
              </li>
            </ul>
          </div>
          <div data-cy="Event-Description">
            <p className="text-xs font-light md:text-sm text-zinc-50">Тоглолтын дэлгэрэнгүй:</p>
            <span className="text-xs font-normal text-white md:text-sm">{event?.description}</span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xs font-medium md:text-sm text-zinc-50" data-cy="Stage-Plan-Title">
              Stage plan:
            </h1>
            <div data-cy="Stage-Plan">
              <img src={event?.venue.image} alt="Stage" className="h-auto w-full max-w-full rounded-md" width={533} height={413} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
