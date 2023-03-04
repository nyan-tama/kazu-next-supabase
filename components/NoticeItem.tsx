import { FC, useEffect, useState } from 'react'
import useStore from '@/store'
import { useMutateNotice } from '../hooks/useMutateNotice'
import { Notice } from '../types/types'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'

export const NoticeItem: FC<Omit<Notice, 'created_at'>> = ({
  id,
  content,
  user_id,
}) => {
  const [userID, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedNotice)
  const { deleteNoticeMutation } = useMutateNotice()

  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{content}</span>
      {userID === user_id && (
        <div className="float-right ml-20 flex">
          <PencilAltIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => update({ id, content })}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-red-500"
            onClick={() => deleteNoticeMutation.mutate(id)}
          />
        </div>
      )}
    </li>
  )
}
