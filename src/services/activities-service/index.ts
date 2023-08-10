import { invalidDate } from '@/errors/invalid-date-error';
import { LocationsActivitiesInput, ActivitiesDates } from '@/protocols';
import activitiesRepository from '@/repositories/activities-repository';
import { isStringDateValid } from '@/utils/validDate-utils';
import { notFoundError } from '@/errors';
import { date } from 'joi';

async function findActivitiesDates() {
  const dates: ActivitiesDates[] = await activitiesRepository.findActivitiesDates();
  if (!dates) throw notFoundError
  return [...new Set(dates.map((event) => event.startsAt.toISOString().split('T')[0]))];
}

async function findActivitiesByDate(date: string): Promise<LocationsActivitiesInput[]> {
  if (!isStringDateValid(date)) throw invalidDate();

  const activitiesByDate = await activitiesRepository.findActivitiesByDate(new Date(date));
  const activitiesByDateFormated = activitiesByDate.map((location) => ({
    id: location.id,
    name: location.name,
    Activities: location.Activity.map((activity) => ({
      id: activity.id,
      name: activity.name,
      startsAt: activity.startsAt.toISOString(),
      endsAt: activity.endsAt.toISOString(),
      avaliable: activity.capacity - activity.Subscription.length,
      capacity: activity.capacity,
    })),
  }));
  return activitiesByDateFormated;
}

const activitiesService = {
  findActivitiesDates,
  findActivitiesByDate
};

export default activitiesService;