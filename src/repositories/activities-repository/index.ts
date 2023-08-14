import { Activity } from '@prisma/client';
import { prisma } from '@/config';
import { ActivitiesDates } from '@/protocols';

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

async function findActivityById(id: number): Promise<Activity> {
  return prisma.activity.findUnique({
    where: { id },
  });
}

async function findSubscriptionsByEnrollmentId(enrollmentId: number) {
  return await prisma.subscription.findMany({
    where: {
      enrollmentId: enrollmentId,
    },
  });
}

async function findSubscriptionsByActivityId(activityId: number, enrollmentId: number) {
  return prisma.subscription.findFirst({
    where: {
      enrollmentId: enrollmentId,
      activityId: activityId,
    },
    include: {
      Activity: true,
    }
  });
}

async function createSubscription(activityId: number, enrollmentId: number) {
  return await prisma.subscription.create({
    data: {
      enrollmentId,
      activityId,
    },
  });
}

const activitiesRepository = {
  findActivitiesByDate,
  findActivitiesDates,
  findActivityById,
  findSubscriptionsByEnrollmentId,
  findSubscriptionsByActivityId,
  createSubscription
};

export default activitiesRepository;