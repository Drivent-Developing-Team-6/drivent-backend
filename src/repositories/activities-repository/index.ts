import { prisma } from '@/config';
import { ActivitiesDates } from '@/protocols';

async function findActivitiesDates(): Promise<ActivitiesDates[]> {
  return prisma.activity.findMany({
    select: {
      startsAt: true,
    },
  });
}

const activitiesRepository = {
  findActivitiesDates,
};

export default activitiesRepository;