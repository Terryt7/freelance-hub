// Lightweight localStorage utility for front-end only persistence
// Handles all demo data: user, orders, messages, dashboard state, wallet

const localStorageManager = {
  // Core save/load/clear helpers
  save: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error)
    }
  },

  load: (key: string, defaultValue: any = null): any => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Failed to load ${key} from localStorage:`, error)
      return defaultValue
    }
  },

  clear: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Failed to clear ${key} from localStorage:`, error)
    }
  },

  // Domain-specific helpers
  saveUser: (user: any) => localStorageManager.save("user", user),
  loadUser: () => localStorageManager.load("user", null),
  clearUser: () => localStorageManager.clear("user"),

  saveOrders: (orders: any) => localStorageManager.save("orders", orders),
  loadOrders: () => localStorageManager.load("orders", {}),
  clearOrders: () => localStorageManager.clear("orders"),

  saveMessages: (messages: any) => localStorageManager.save("messages", messages),
  loadMessages: () => localStorageManager.load("messages", []),
  clearMessages: () => localStorageManager.clear("messages"),

  saveDashboardState: (state: any) => localStorageManager.save("dashboardState", state),
  loadDashboardState: () => localStorageManager.load("dashboardState", {}),
  clearDashboardState: () => localStorageManager.clear("dashboardState"),

  saveJobStates: (states: any) => localStorageManager.save("jobStates", states),
  loadJobStates: () => localStorageManager.load("jobStates", {}),
  clearJobStates: () => localStorageManager.clear("jobStates"),

  saveProfileData: (profile: any) => localStorageManager.save("profileData", profile),
  loadProfileData: () =>
    localStorageManager.load("profileData", {
      bio: "Professional freelancer with 5+ years of experience",
      skills: "Web Development, UI/UX Design, React, Node.js",
      hourlyRate: 75,
    }),
  clearProfileData: () => localStorageManager.clear("profileData"),

  saveWalletState: (state: any) => localStorageManager.save("walletState", state),
  loadWalletState: () => localStorageManager.load("walletState", { connected: false, address: null }),
  clearWalletState: () => localStorageManager.clear("walletState"),

  saveCart: (cart: any) => localStorageManager.save("cart", cart),
  loadCart: () => localStorageManager.load("cart", []),
  clearCart: () => localStorageManager.clear("cart"),
  getCart: () => localStorageManager.load("cart", []),

  // Bulk clear for logout
  clearAllData: () => {
    localStorageManager.clearUser()
    localStorageManager.clearOrders()
    localStorageManager.clearMessages()
    localStorageManager.clearDashboardState()
    localStorageManager.clearJobStates()
    localStorageManager.clearProfileData()
  },
}

export default localStorageManager
