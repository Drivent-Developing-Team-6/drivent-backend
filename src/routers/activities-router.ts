import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  findDates,
  findActivitiesByDate,
  findActivitiesByEnrollmentId,
  postSubscription,
} from '@/controllers';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/dates', findDates)
  .get('/', findActivitiesByDate)
  .get('/subscriptions/:activityId', findActivitiesByEnrollmentId)
  .post('/subscriptions', postSubscription)

export { activitiesRouter };