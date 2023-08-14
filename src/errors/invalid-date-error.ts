import { ApplicationError } from '@/protocols';

export function invalidDate(): ApplicationError {
  return {
    name: 'invalidDate',
    message: 'Invalid date!',
  };
}