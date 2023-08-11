import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  findDates,
  findActivitiesByDate,
  findActivitiesByEnrollmentId,
  subscribeInActivity,
} from '@/controllers';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/dates', findDates)
  .get('/', findActivitiesByDate)
  .get('/subscriptions/:activityId', findActivitiesByEnrollmentId)
  .post('/', subscribeInActivity)

export { activitiesRouter };