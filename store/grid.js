export const state = () => ({
    areVidsSynced: false,
    isGridPlaying: false,
    isAboutOpen: false,
    neverBeenPlayed: true,
    isModalOpen: false,
    isModalPlaying: false,
    isModalEnded: false,
    isFilm13Ended: false,
    isFilm13Restarted: false,
    activeModal: null,
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
    changeGridPlayback: (state, payload) => {
        state.isGridPlaying = payload;
        
        if (payload && state.neverBeenPlayed) {
            state.neverBeenPlayed = false;
        }
        if (state.isGridPlaying) {
            state.isAboutOpen = false;
        }
    },
    isModalTransitioning: (state, payload) => {
        state.isModalTransitioning = payload;
    },
    openAbout: (state) => {
        state.isAboutOpen = true;
    },
    openModal: (state, payload) => {
        state.activeModal = payload;

        if (!state.isModalOpen) {
            state.isModalOpen = true;
        }

        if (state.isGridPlaying) {
            state.isGridPlaying = false;
        }

        if (state.isModalEnded) {
            state.isModalEnded = false;
        }
    },
    setModalPlaying: (state, payload) => {
        state.isModalPlaying = payload;
    },
    closeModal: (state) => {
        state.isModalOpen = false;
        state.activeModal = null;
        state.isGridPlaying = true;
        state.isModalPlaying = false;
    },
    isModalEnded: (state, payload) => {
        state.isModalEnded = payload;
    },
    endFilm13: (state) => {
        state.isFilm13Ended = true;
    },
    restartFilm13: (state) => {
        state.isFilm13Restarted = true;
        state.isFilm13Ended = false;
    }
}


