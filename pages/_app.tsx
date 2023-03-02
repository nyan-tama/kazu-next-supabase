import '@/styles/globals.css'
import type { AppProps, NextWebVitalsMetric } from 'next/app'

//各metricの計測結果を送信するための関数
export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      console.log(`FCP: ${metric.value * 1000}ms`)
      break
    case 'LCP':
      console.log(`LCP: ${metric.value * 1000}ms`)
      break
    case 'TTFB':
      console.log(`TTFB: ${metric.value * 1000}ms`)
      break
    case 'Next.js-hydration':
      console.log(
        `Hydration: ${metric.startTime} -> 
        ${(metric.startTime + metric.value) * 1000}ms`
      )
      break
    default:
      break
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
