import { Activity } from '@prisma/client';
import { prisma } from '@/config';
import { ActivitiesDates, LocationsActivitiesInput } from '@/protocols';

async function findActivitiesDates(): Promise<ActivitiesDates[]> {
  return prisma.activity.findMany({
    select: {
      startsAt: true,
    },
  });
}

async function findActivitiesByDate(date: Date) {
  return await prisma.location.findMany({
    select: {
      id: true,
      name: true,
      Activity: {
        where: {
          startsAt: {
            equals: date,
          },
        },
        select: {
          id: true,
          name: true,
          startsAt: true,
          endsAt: true,
          capacity: true,
          Subscription: true,
        },
      },
    },
  })
}

const activitiesRepository = {
  findActivitiesByDate,
  findActivitiesDates
};

export default activitiesRepository;