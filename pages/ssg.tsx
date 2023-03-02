import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticPropsが呼ばれました')

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

type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  return (
    <>
      <Layout title="SSG">
        <p className="mb-3 text-blue-500">SSG</p>
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
      </Layout>
    </>
  )
}

export default Ssg
