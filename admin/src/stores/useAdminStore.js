import { defineStore, createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const persistedStateAdmin = createPersistedState({
    key: 'PiniaPersistedstateAdmin',
    paths: ['isAuthenticatedAdmin'],
    storage: localStorage,
});

const piniaAdmin = createPinia();
piniaAdmin.use(persistedStateAdmin);

export const useAdminStore = defineStore({
    id: 'AdminAuthenticated',
    state: () => ({
        isAuthenticatedAdmin: false,
    }),
    actions: {
        setIsAuthenticatedAdmin(isAuthenticatedAdmin) {
            this.isAuthenticatedAdmin = isAuthenticatedAdmin;
        },
    },
    persist: true,
});