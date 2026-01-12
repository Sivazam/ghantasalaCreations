// Zustand store for Shiva Smarana state management
import { create } from 'zustand';

const useShivaSmaranaStore = create((set, get) => ({
    // Session state
    sessionCount: 0,
    totalCount: 0,
    visitorId: null,

    // UI state
    isMuted: true, // Start muted by default
    isFullscreen: false,
    isLoading: false,

    // Droplet animation state
    activeDroplets: [],
    nextDropletId: 0,

    // Leaderboard state
    leaderboard: [],
    userRank: null,

    // Actions
    setVisitorId: (id) => set({ visitorId: id }),

    setTotalCount: (count) => set({ totalCount: count }),

    incrementSessionCount: () => {
        const currentCount = get().sessionCount;
        set({ sessionCount: currentCount + 1 });
    },

    resetSessionCount: () => set({ sessionCount: 0 }),

    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

    setMuted: (muted) => set({ isMuted: muted }),

    toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),

    setFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),

    setLoading: (loading) => set({ isLoading: loading }),

    // Droplet management
    addDroplet: () => {
        const id = get().nextDropletId;
        set((state) => ({
            activeDroplets: [...state.activeDroplets, { id, createdAt: Date.now() }],
            nextDropletId: state.nextDropletId + 1
        }));
        return id;
    },

    removeDroplet: (id) => {
        set((state) => ({
            activeDroplets: state.activeDroplets.filter(d => d.id !== id)
        }));
    },

    // Leaderboard
    setLeaderboard: (leaderboard) => set({ leaderboard }),

    setUserRank: (rank) => set({ userRank: rank }),

    // Reset all state
    resetState: () => set({
        sessionCount: 0,
        activeDroplets: [],
        nextDropletId: 0
    })
}));

export default useShivaSmaranaStore;
