import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('getServerSidePropsが呼ばれました')

  //supabaseからデータを取得
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })
  return { props: { tasks, notices } }
}

type ServerSideProps = {
  tasks: Task[]
  notices: Notice[]
}

const Ssr: NextPage<ServerSideProps> = ({ tasks, notices }) => {
  const router = useRouter()
  return (
    <>
      <Layout title="SSR">
        <p className="mb-3 text-pink-500">SSR</p>
        <ul className="mb-3">
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <p className="front-extrabold text-lg">{task.title}</p>
              </li>
            )
          })}
        </ul>
        <ul className="mb-3">
          {notices.map((notice) => {
            return (
              <li key={notice.id}>
                <p className="front-extrabold text-lg">{notice.content}</p>
              </li>
            )
          })}
        </ul>
        <Link href="/ssg" prefetch={false}>
          <a className="my-3 text-xs">Link to ssg</a>
        </Link>
        {/* prefetch={false}でクリック時にISRが発動 ちなみにtrueだとViewport表示時 */}
        <Link href="/isr" prefetch={false}>
          <a className="mb-3 text-xs">Link to isr</a>
        </Link>
        {/* prefetchは全くおこらない */}
        <button className="mb-3 text-xs" onClick={() => router.push('/ssg')}>
          Route to ssg
        </button>
        <button className="mb-3 text-xs" onClick={() => router.push('/isr')}>
          Route to isr
        </button>
      </Layout>
    </>
  )
}

export default Ssr
