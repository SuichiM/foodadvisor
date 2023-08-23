module.exports = ({ env }) => ({
  scheduler: {
    enabled: true,
    config: {
      model: 'scheduler',
    },
  },
  'cookie-manager': {
    enabled: true,
    config: {
      localization: true,
    },
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  email: {
    config: {
      provider: 'sendmail',
      settings: {
        defaultFrom: 'suichiM@strapi.io',
        defaultReplyTo: 'suichiM@strapi.io',
        testAddress: 'martiniroqueesteban@gmail.com',
        silent: false,
      },
    },
  },
  'user-permissions': {
    config: {
      jwt: {
        expiresIn: '1d',
      },
    },
  },
});
