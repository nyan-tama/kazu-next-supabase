import { supabase } from '../utils/supabase'
import useStore from "../store"
import { useQueryClient, useMutation } from 'react-query'
import { Notice, EditedNotice } from '../types/types'


export const useMutateNotice = () => {
	const queryClient = useQueryClient()
	const reset = useStore((state: any) => state.resetEditedTask)

	const createNoticeMutation = useMutation(
		async (notice: Omit<Notice, "id" | "created_at">) => {
			const { data, error } = await supabase.from('notices').insert(notice)
			if (error) throw new Error(error.message)
			return data
		},
		{
			onSuccess: (res) => {
				const previouseNotices = queryClient.getQueryData<Notice[]>(['notices'])
				if (previouseNotices) {
					queryClient.setQueryData(['notices'], [...previouseNotices, res[0]])
				}
				reset()
			},
			onError: (err: any) => {
				alert(err.message)
				reset()
			},
		}
	)

	const updateNoticeMutation = useMutation(
		async (notice: EditedNotice) => {
			const { data, error } = await supabase
				.from('notices')
				.update({ content: notice.content })
				.eq('id', notice.id)
			if (error) throw new Error(error.message)
			return data
		},
		{
			onSuccess: (res, variables) => {
				const previouseNotices = queryClient.getQueryData<Notice[]>(['notices'])
				if (previouseNotices) {
					queryClient.setQueryData(
						['notices'],
						previouseNotices.map((task) =>
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

	const deleteNoticeMutation = useMutation(
		async (id: string) => {
			const { data, error } = await supabase.from('notices').delete().eq('id', id)
			if (error) throw new Error(error.message)
			return data
		},
		{
			onSuccess: (_, variables) => {
				const previouseNotices = queryClient.getQueryData<Notice[]>(['notices'])
				if (previouseNotices) {
					queryClient.setQueryData(
						['notices'],
						previouseNotices.filter((task) => task.id !== variables)
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
	return { createNoticeMutation, updateNoticeMutation, deleteNoticeMutation }
}
