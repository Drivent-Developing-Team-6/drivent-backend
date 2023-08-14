import { Enrollment, Subscription } from "@prisma/client";
import activitiesRepository from '@/repositories/activities-repository';
import enrollmentRepository from "../../repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { isStringDateValid } from '@/utils/validDate-utils';
import { LocationsActivitiesInput, ActivitiesDates } from '@/protocols';
import { conflictError, notFoundError, badRequestError, invalidDate } from '@/errors';

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

async function findSubscriptionsByEnrollmentId(userId: number, activityId: number) {
  const enrollment =  await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const activities =  await activitiesRepository.findActivityById(activityId);
  if (!activities) throw notFoundError();

  const subscription = await activitiesRepository.findSubscriptionsByActivityId(activityId, enrollment.id)
  return subscription
}

async function postSubscription(userId: number, activityId: number) {
  if (!userId || !activityId) throw notFoundError();

  const enrollment: Enrollment =  await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote) throw badRequestError();

  const activity = await activitiesRepository.findActivityById(activityId);
  if (!activity) throw notFoundError();

  const subscriptions: Subscription[] = await activitiesRepository.findSubscriptionsByEnrollmentId(enrollment.id);

  if (await checkTimeConflict(subscriptions, activityId)) throw conflictError('Conflito de horário');
 
  return await activitiesRepository.createSubscription(activityId, enrollment.id);
}

async function checkTimeConflict(subscriptions: Subscription[], activityId: number) {
  const newActivity = await activitiesRepository.findActivityById(activityId);
  if (!newActivity) throw badRequestError();

  for (const subscription of subscriptions) {
    const subscribedActivity = await activitiesRepository.findActivityById(subscription.activityId);

    if (subscribedActivity) {
      if (
        (newActivity.startsAt >= subscribedActivity.startsAt && newActivity.startsAt < subscribedActivity.endsAt) ||
        (newActivity.endsAt > subscribedActivity.startsAt && newActivity.endsAt <= subscribedActivity.endsAt) ||
        (newActivity.startsAt <= subscribedActivity.startsAt && newActivity.endsAt >= subscribedActivity.endsAt)
      ) {
        return true;
      }
    }
  }
}

const activitiesService = {
  findActivitiesDates,
  findActivitiesByDate,
  findSubscriptionsByEnrollmentId,
  postSubscription
};

export default activitiesService;