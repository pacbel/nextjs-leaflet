/** @type {import('@commitlint/types').UserConfig} */
const CommitLintConfiguration = {
  extends: ["@commitlint/config-conventional"],
  // Permissivo: aceita mensagens comuns
  rules: {
    "subject-empty": [0],
    "type-empty": [0],
    "type-enum": [0],
    "scope-case": [0],
    "header-max-length": [0],
  },
};

module.exports = CommitLintConfiguration;
