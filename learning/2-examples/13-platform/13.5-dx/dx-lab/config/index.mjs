import boundary from './rules/no-app-import.mjs'
export default [
  {
    name: 'compass/domain-policy',
    files: ['domain/**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    plugins: { compass: { rules: { 'no-app-import': boundary } } },
    rules: { 'compass/no-app-import': 'error' }
  }
]
