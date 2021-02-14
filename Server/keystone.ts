import "dotenv/config";

import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import { withItemData, statelessSessions } from '@keystone-next/keystone/session'

import { User } from "./schemas/User";
import { Product } from "./schemas/Products";
import { ProductImage } from './schemas/ProductImage'

import { insertSeedData } from './seed-data';

const databaseURL =
  process.env.DATABASE_URL ||
  "mongodb://localhost/keystone-store-fronts-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    // todo: add permission roles
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },

    db: {
      adapter: "mongoose",
      url: databaseURL,
      async onConnect(keystone) {
        console.log('Connected to the database!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items go here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      isAccessAllowed: ({ session }) => {
        //console.log('keystone.ts line 48',session);
        return !!session?.data
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id'
    })
  })
);
