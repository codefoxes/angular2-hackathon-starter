let config:any = {};
config.db      = process.env.MONGODB_URI || process.env.MONGOLAB_URI;
config.secret  = process.env.SESSION_SECRET;
config.rootUrl = 'https://example.com/';

// User settings.
config.roles = {
  admin: {
    permissions: [],
  },
  principal: {
    permissions: [],
  },
  teacher: {
    permissions: [],
  },
  parent: {
    permissions: [],
  },
  student: {
    permissions: [],
  },
};

export { config };
