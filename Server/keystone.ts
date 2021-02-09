import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';


const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/kestone-store-fronts-tutorial';

const sessionConfi = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
}

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials:true,
    }
  },

  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // add data seeding here
  },
  lists: createSchema({
    // Schema items go here
  }),
  ui: {
    //change this for roles
    isAccessAllowed: () => true,
    },
    // Add session values here
})