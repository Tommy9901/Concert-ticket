'use client';
import { useQueryState } from 'nuqs';
import CardTicket from '@/components/Card';
import CarouselMain from '@/app/user/home/_components';
import { Event, useGetEventsLazyQuery, useGetSpecialEventQuery } from '@/generated';
import { useEffect } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import Link from 'next/link';
import SkeletonCard from '@/components/SkeletonCard';
import SkeletonCarausel from '@/components/SkeletonCarausel';

const Page = () => {
  const [q] = useQueryState('q', { defaultValue: '' });
  const debouncedQ = useDebounce(q, 300);
  const [getEvents1, { data, loading }] = useGetEventsLazyQuery();
  const { data: eventData, loading: loadingCarausel } = useGetSpecialEventQuery();
  const firstEvent = eventData?.getSpecialEvent;

  useEffect(() => {
    getEvents1({
      variables: {
        filter: {
          q: debouncedQ,
        },
      },
    });
  }, [debouncedQ]);

  return (
    <div className="w-full bg-black" data-cy="Home-Page">
      {loadingCarausel && <SkeletonCarausel />}

      {firstEvent && <CarouselMain event={firstEvent} />}

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:gap-8 sm:px-6 md:grid-cols-2 md:py-12 xl:grid-cols-3 xl:gap-10 xl:px-8">
        {(loading || data?.getEvents == null) && Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}

        {data?.getEvents?.map((event) => (
          <div key={event?._id}>
            {event && (
              <Link href={`/user/home/event/${event._id}`}>
                <CardTicket event={event as Event} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Page;
