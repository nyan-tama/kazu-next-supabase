import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'
import { Layout } from '../components/Layout'

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])

  //初回レンダリング時に実行 CSR
  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true })
      setTasks(tasks as Task[])
    }

    const getNotices = async () => {
      const { data: notices } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: true })
      setNotices(notices as Notice[])
    }

    //実行
    getTasks()
    getNotices()
  }, [])

  return (
    <>
      <Layout title="CSR">
        <p className="mb-3 text-orange-500">SSG + CSR</p>
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

export default Csr
