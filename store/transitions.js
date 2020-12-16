export const state = () => ({
    oldRoute: 'about',
    newRoute: '',
    modalRouteDirection: ''
})


export const mutations = {
    routeChange: (state, payload) => {
        state.newRoute = payload.new;
        state.oldRoute = payload.old;
    },
    changeModal: (state, payload) => {
        state.modalRouteDirection = payload;
    }
}


