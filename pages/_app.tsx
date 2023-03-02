import '@/styles/globals.css'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

//各metricの計測結果を送信するための関数
export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      console.log(`FCP: ${Math.round(metric.value * 10) / 10}`)
      break
    case 'LCP':
      console.log(`LCP: ${Math.round(metric.value * 10) / 10}`)
      break
    case 'TTFB':
      console.log(`TTFB: ${Math.round(metric.value * 10) / 10}`)
      break
    case 'Next.js-hydration':
      console.log(
        `Hydration: ${Math.round(metric.value * 10) / 10} -> ${
          Math.round((metric.startTime + metric.value) * 10) / 10
        }`
      )
      break
    default:
      break
  }
}

//retry falseでリトライしない
//refetchOnWindowFocus falseでフォーカス時に再取得しない
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter()

  // ログインチェック
  const validateSession = async () => {
    const user = supabase.auth.user()
    if (user && pathname === '/') {
      push('/dashboard')
    } else if (!user && pathname !== '/') {
      push('/')
    }
  }

  // ログイン状態の変化を監視
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname !== '/') {
      push('/dashboard')
    }
    if (event === 'SIGNED_OUT') {
      push('/')
    }
  })

  useEffect(() => {
    validateSession()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
