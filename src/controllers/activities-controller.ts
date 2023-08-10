import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function findDates(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    res.status(200).send("findDates");
  } catch (error) {
    next(error);
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
