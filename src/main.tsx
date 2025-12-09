import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MovieDetail from './MovieDetail.tsx'
// react-routerでルーティングができるように
import { createBrowserRouter, RouterProvider } from 'react-router'

// ルーティングのエンドポイントを設定
const router = createBrowserRouter([
  { path: "/", Component: App},
  { path: "/movie/:movieId", Component: MovieDetail}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* RouterProviderを使用しエンドポイントを有効化 */}
    <RouterProvider router={router} />
  </StrictMode>,
)
