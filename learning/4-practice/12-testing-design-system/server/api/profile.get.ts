import { currentFixture, fixtures, reads } from '../utils/fixtures'
export default defineEventHandler((event) => {
  const fixture = currentFixture(getCookie(event, 'stage12_fixture'))
  reads[fixture]++
  return { ...fixtures[fixture] }
})
