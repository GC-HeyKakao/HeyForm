import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const emailState = atom({
    key: 'emails',
    default: [],
})

export const previewState = atom({
    key: 'previews',
    default: {
        savedQsList: {},
        categoty: "",
        surveyTitle: "",
        curSelectedType: "",
        curQs: "",
        curQsItemList: [],
    },
})

export const replyState = atom({
    key: 'replyState',
    default:[],
})

export const userState = atom({
    key: 'userState',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const tokenState = atom({
    key: 'tokenState',
    default: '',
    effects_UNSTABLE: [persistAtom],
})