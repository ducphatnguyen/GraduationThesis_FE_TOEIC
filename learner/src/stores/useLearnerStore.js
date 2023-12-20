import { defineStore, createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const persistedStateLearner = createPersistedState({
    key: 'PiniaPersistedstateLearner',
    paths: ['isAuthenticatedLearner'],
    storage: localStorage,
});

const piniaLearner = createPinia();
piniaLearner.use(persistedStateLearner);

export const useLearnerStore = defineStore({
    id: 'LearnerAuthenticated',
    state: () => ({
        isAuthenticatedLearner: false,
    }),
    actions: {
        setIsAuthenticatedLearner(isAuthenticatedLearner) {
            this.isAuthenticatedLearner = isAuthenticatedLearner;
        },
    },
    persist: true,
});