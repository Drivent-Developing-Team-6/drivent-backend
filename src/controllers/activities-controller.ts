import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';

export async function findDates(req: AuthenticatedRequest, res: Response) {
  try {
    const dates: string[] = await activitiesService.findActivitiesDates();
    res.status(httpStatus.OK).send(dates);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function findActivitiesByDate(req: AuthenticatedRequest, res: Response) {
  const { date } = req.query;
  try {
    const activitiesByDate = await activitiesService.findActivitiesByDate(date as string);
    res.status(httpStatus.OK).send(activitiesByDate);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function findActivitiesByEnrollmentId(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const activityId = Number(req.params.activityId);
    if (!activityId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const subscribedActivities = await activitiesService.findSubscriptionsByEnrollmentId(userId, activityId);
    return res.status(httpStatus.OK).send(subscribedActivities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postSubscription(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.body;
  if (!activityId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const subscription = await activitiesService.postSubscription(userId, Number(activityId));
    
    return res.status(httpStatus.CREATED).send(subscription);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
