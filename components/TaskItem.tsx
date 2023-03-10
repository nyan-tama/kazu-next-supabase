import { FC } from 'react'
import useStore from '@/store'
import { useMutateTask } from '../hooks/useMutateTask'
import { Task } from '../types/types'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

export const TaskItem: FC<Omit<Task, 'created_at' | 'user_id'>> = ({
  id,
  title,
}) => {
  const update = useStore((state) => state.updateEditedTask)
  // 一旦stateはcreate()のこと。stateでオブジェクトを作成している
  // updateに入るものは、updateEditedTaskメソッド
  // (payload) {
  //   return set({
  //       editedTask: {
  //           id: payload.id,
  //           title: payload.title
  //       }
  // });
  // 後に
  // update({ id, title })}とて呼出す


  const { deleteTaskMutation } = useMutateTask()

  return (
    
    <li className="my-3 text-lg font-extrabold">
      <span>{title}</span>
      <div className="float-right ml-20 flex">
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => update({ id, title })}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-red-500"
          onClick={() => deleteTaskMutation.mutate(id)}
        />
      </div>
    </li>
  )
}
