import { z } from 'zod';

export const CreateEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  eventTime: z.string(),
  area: z.string(),
  routeLength:z.string().transform((val) => val === '' ? undefined : Number(val)).optional(),
  routeUrl: z.string().url('Invalid URL').or(z.literal('')).transform(value => value === '' ? undefined : value).optional(),
  location: z.string(),
  ridePace: z.string(),
  eventLeaderName: z.string(),
  passphrase: z.string().optional(),
});
