export const state = () => ({
    activeSfx: [],
    historySfx: []
})


export const mutations = {
    addSfx: (state, payload) => {
        state.activeSfx.push(payload);
        state.historySfx.push(payload);
    },
    removeSfx: (state, payload) => {
        state.activeSfx.splice(0, payload);
    }
}


