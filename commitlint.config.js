module.exports = {
  extends: ['@commitlint/config-conventional', '@commitlint/parse'],
  parserPreset: {
    parserOpts: {
      // TODO : replace `([A-Z].*)` with ticket prefix => ex: `MK2`
      headerPattern: /^(\w*)(\([A-Z].*-\d+\))?:\s(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'header-pattern': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'header-pattern': (parsed) => {
          const { type, scope, subject } = parsed;
          if (type === null && scope === null && subject === null) {
            return [
              false,
              // TODO : replace `([A-Z].*)` with ticket prefix => ex: `MK2`
              "header must respect this pattern: '/^(w*)((([A-Z].*)-d+))?:s(.*)$/'",
            ];
          }

          return [true, ''];
        },
      },
    },
  ],
};
