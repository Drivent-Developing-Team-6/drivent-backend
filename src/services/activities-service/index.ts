import { ActivitiesDates } from '@/protocols';
import activitiesRepository from '@/repositories/activities-repository';
import { notFoundError } from '@/errors';

async function findActivitiesDates() {
  const dates: ActivitiesDates[] = await activitiesRepository.findActivitiesDates();
  if (!dates) throw notFoundError
  return [...new Set(dates.map((event) => event.startsAt.toISOString().split('T')[0]))];
}

const activitiesService = {
  findActivitiesDates,
};

export default activitiesService;