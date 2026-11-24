import { lazy, Suspense } from 'react'
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router'
const Report = lazy(() => import('./LazyNote'))
function Layout() {
  return (
    <>
      <nav aria-label="实验导航">
        <Link to="/">首页</Link> <Link to="/tasks/7?q=Vue">任务7</Link>{' '}
        <Link to="/private">受限页</Link> <Link to="/report">懒报告</Link>
      </nav>
      <Outlet />
    </>
  )
}
function Details() {
  const { id } = useParams()
  const [search, setSearch] = useSearchParams()
  const navigate = useNavigate()
  return (
    <>
      <h2>任务 {id}</h2>
      <p>查询 {search.get('q') || '无'}</p>
      <button type="button" onClick={() => setSearch({ q: 'Nuxt' })}>
        更新查询
      </button>
      <button type="button" onClick={() => navigate('/')}>
        返回首页
      </button>
    </>
  )
}
export function RoutesDemo({ signedIn = false }: { signedIn?: boolean }) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<h2>路由首页</h2>} />
        <Route path="tasks/:id" element={<Details />} />
        <Route
          path="private"
          element={
            signedIn ? <h2>受限页面占位</h2> : <Navigate to="/login" replace />
          }
        />
        <Route path="login" element={<h2>登录占位：未连接认证服务</h2>} />
        <Route
          path="report"
          element={
            <Suspense fallback={<p>报告模块加载中</p>}>
              <Report />
            </Suspense>
          }
        />
        <Route path="*" element={<h2>页面不存在</h2>} />
      </Route>
    </Routes>
  )
}
