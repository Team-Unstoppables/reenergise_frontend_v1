import { defineStore } from 'pinia'

export const useUserDataStore = defineStore({
    id: 'user-data',
    state: () => {
        return {
            lat: "",
            long: "",
            ac_temp: "",
            ac_type: "",
            ac_model: "",
            ac_cost: ""
        }
    },
    actions: {},
    getters: {
        lat: state => state.lat,
        long: state => state.long,
        ac_temp: state => state.ac_temp,
        ac_type: state => state.ac_type,
        ac_model: state => state.ac_model,
        ac_cost: state => state.ac_cost,
    },
})
