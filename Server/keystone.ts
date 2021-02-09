import "dotenv/config";

import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import { withItemData, statelessSessions } from '@keystone-next/keystone/session'

import { User } from "./schemas/User";

const databaseURL =
  process.env.DATABASE_URL ||
  "mongodb://localhost/kestone-store-fronts-tutorial";

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
    // todo: add roles
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
      // add data seeding here
    },
    lists: createSchema({
      // Schema items go here
      User,
    }),
    ui: {
      isAccessAllowed: ({ session }) => {
        console.log('keystone.ts line 48',session);
        return !!session?.data
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id'
    })
  })
);