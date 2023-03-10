import { FormEvent, FC } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '@/store'
import { useMutateTask } from '../hooks/useMutateTask'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'

export const TaskForm: FC = () => {
  const { editedTask } = useStore()
  // formのonChangeでstateを更新するためには、useStoreのupdateEditedTask関数を呼び出す必要がある
  // 最終的にupdate = (payload) => set({ editedTask: { id: payload.id, title: payload.title } }),
  // reduxのselector関数と同じ記法らしい

  const update = useStore((state) => state.updateEditedTask)
  const { createTaskMutation, updateTaskMutation } = useMutateTask()

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === '')
      createTaskMutation.mutate({
        title: editedTask.title,
        user_id: supabase.auth.user()?.id,
      })
    else
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
      })
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="mu-2 focus: rounded border border-gray-300 border-indigo-500 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
        placeholder="New task ?"
        value={editedTask.title}
        // ここでは、オブジェクトのスプレッド構文を使って、editedTaskオブジェクトの既存のプロパティを保持しながら、titleプロパティだけを新しい値（フォーム入力の値）に置き換えています。
        // なのでupdate({ id: "xxxx(固定)", title: "新しい値" })となっている
        // よって、payloadとして{id,title}を渡している
        onChange={(e) => update({ ...editedTask, title: e.target.value })}
      />
      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        {editedTask.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
