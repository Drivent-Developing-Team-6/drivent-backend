import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  findDates,
  findActivitiesByDate,
  findActivitiesByUserId,
  subscribeInActivity,
} from '@/controllers';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/dates', findDates)
  .get('/', findActivitiesByDate)
  .get('/subscriptions', findActivitiesByUserId)
  .post('/', subscribeInActivity)

export { activitiesRouter };