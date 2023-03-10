import create from "zustand"
import { EditedTask, EditedNotice } from "./types/types"

type State = {
    // key : value
    editedTask: EditedTask
    editedNotice: EditedNotice
    updateEditedTask: (payload: EditedTask) => void
    updateEditedNotice: (payload: EditedNotice) => void
    resetEditedTask: () => void
    resetEditedNotice: () => void
}

// storeの作成にはcreateを使う
// createはzustandが用意するset, getを引数に取る setはstateの更新 getはstateの取得
const useStore = create<State>((set) => ({
    // key : value
    editedTask: { id: "", title: "" },
    editedNotice: { id: "", content: "" },
    // オブジェクトのプロパティとして定義されているので、updateEditedTask({ id: 1, title: "New Title" }) のように呼び出せない
    // 具体的には、次のように useStore 関数を使用して、 updateEditedTask 関数をコンポーネント内で使用することができます。
    // const updateEditedTask = useStore((state) => state.updateEditedTask)
    updateEditedTask: (payload) => set({ editedTask: { id: payload.id, title: payload.title } }),
    updateEditedNotice: (payload) => set({ editedNotice: { id: payload.id, content: payload.content } }),
    resetEditedTask: () => set({ editedTask: { id: "", title: "" } }),
    resetEditedNotice: () => set({ editedNotice: { id: "", content: "" } }),
}))

export default useStore
