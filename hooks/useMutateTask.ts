import { supabase } from '../utils/supabase'
import useStore from "../store"
import { useQueryClient, useMutation } from 'react-query'
import { Task, EditedTask } from '../types/types'


export const useMutateTask = () => {
	const queryClient = useQueryClient()
	const reset = useStore((state: any) => state.resetEditedTask)

	const createTaskMutation = useMutation(
		async (task: Omit<Task, "id" | "created_at">) => {
			const { data, error } = await supabase.from('todos').insert(task)
			if (error) throw new Error(error.message)
			return data
		},
		{
			onSuccess: (res) => {
				const previouseTodos = queryClient.getQueryData<Task[]>(['todos'])
				if (previouseTodos) {
					queryClient.setQueryData(['todos'], [...previouseTodos, res[0]])
				}
				reset()
			},
			onError: (err: any) => {
				alert(err.message)
				reset()
			},
		}
	)

	const updateTaskMutation = useMutation(
		async (task: EditedTask) => {
			const { data, error } = await supabase
				.from('todos')
				.update({ title: task.title })
				.eq('id', task.id)
			if (error) throw new Error(error.message)
			return data
		},
		{
			onSuccess: (res, variables) => {
				const previouseTodos = queryClient.getQueryData<Task[]>(['todos'])
				if (previouseTodos) {
					queryClient.setQueryData(
						['todos'],
						previouseTodos.map((task) =>
							task.id === variables.id ? res[0] : task
						))
				}
				reset()
			},
			onError: (err: any) => {
				alert(err.message)
				reset()
			}
		}
	)

	const deleteTaskMutation = useMutation(
		async (id: string) => {
			const { data, error } = await supabase.from('todos').delete().eq('id', id)
			if (error) throw new Error(error.message)
			return data
		},
		{
			onSuccess: (_, variables) => {
				const previouseTodos = queryClient.getQueryData<Task[]>(['todos'])
				if (previouseTodos) {
					queryClient.setQueryData(
						['todos'],
						previouseTodos.filter((task) => task.id !== variables)
					)
				}
				reset()
			},
			onError: (err: any) => {
				alert(err.message)
				reset()
			}
		}
	)
	return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}
