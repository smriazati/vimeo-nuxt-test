export const state = () => ({
    areVidsSynced: false,
    isGridPlaying: false,
    isAboutOpen: false,
    neverBeenPlayed: true,
    isModalOpen: false,
    isModalPlaying: false,
    activeModal: null,
    isPaginationExpanded: false,
    isModalTransitioning: false,
    subtitleLanguage: 'en'
})


export const mutations = {
    areVidsSynced: (state, payload) => {
        state.areVidsSynced = payload;
    },
    setSubtitle: (state, payload) => {
        state.subtitleLanguage = payload;
    },
    gridFirstPlay: (state) => {
        state.isGridPlaying = true;
        state.neverBeenPlayed = false;
    },
    changeGridPlayback: (state, payload) => {
        state.isGridPlaying = payload;
        if (state.isGridPlaying) {
            state.isAboutOpen = false;
        }
    },
    isModalTransitioning: (state, payload) => {
        state.isModalTransitioning = payload;
    },
    toggleAbout: (state) => {
        state.isAboutOpen = !state.isAboutOpen;
        
        if (state.isAboutOpen) {
            state.isGridPlaying = false;
        } else {
            state.isGridPlaying = true;
        }
    },
    openModal: (state, payload) => {
        state.isPaginationExpanded = false;
        state.isModalOpen = true;
        state.activeModal = payload;
        state.isGridPlaying = false;
    },
    setModalPlaying: (state, payload) => {
        state.isModalPlaying = payload;
    },
    closeModal: (state) => {
        state.isModalOpen = false;
        state.activeModal = null;
        state.isGridPlaying = true;
        state.isModalPlaying = false;
        state.isPaginationExpanded = false;
    },
    expandPagination: (state) => {
        state.isPaginationExpanded = true;
        state.isModalOpen = false;
        state.isModalPlaying = false;
    },
    minimizePagination: (state) => {
        state.isPaginationExpanded = false;
    }
}


