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

export async function findActivitiesByDate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    res.status(200).send("findActivitiesByDate");
  } catch (error) {
    next(error);
  }
}

export async function findActivitiesByUserId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    res.status(200).send("findActivitiesByUserId");
  } catch (error) {
    next(error);
  }
}

export async function subscribeInActivity(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    res.status(400).send("findActivitiesByUserId");
  } catch (error) {
    next(error);
  }
}
