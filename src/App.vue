<template>
    <div :class="{'dark':darkMode.enabled}">
        <div class="relative from-white bg-gradient-to-b w-full min-h-screen">


            <!-- Hamburger Toggle + Mobile Menu -->
          <header class="sticky top-0 bg-gradient-to-t from-[#4a1212] to-black text-white z-30">
            <div class="w-full max-w-5xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4 relative">
              <a href="/" class="flex items-center space-x-2">
                <img src="/images/elite-waste-logistics-logo.svg" class="w-40" />
              </a>

              <div class="w-full max-w-40 sm:max-w-none text-center sm:text-end text-white font-bold text-lg sm:text-2xl">Elite Waste Logistics</div>


            </div>
          </header>

              <!-- Slide-out Mobile Menu -->
              <div
                v-if="showMenu"
                @click.self="showMenu = false"
                class="fixed inset-0 z-40 bg-black bg-opacity-50"
              >
                <div
                  class="bg-white dark:bg-black w-3/4 h-full p-6 shadow-lg space-y-6 text-belk-blue transform transition duration-300"
                  @click.stop
                >
                  <h2 class="text-xl font-bold mb-4">Menu</h2>
                  <a @click="showMenu = false" href="/" class="block hover:underline">Home</a>
                  <a @click="showMenu = false" href="/services" class="block hover:underline">Services</a>
                  <a @click="showMenu = false" href="/about" class="block hover:underline">About</a>
                  <a @click="showMenu = false" href="/contact" class="block hover:underline">Contact</a>
                </div>
              </div>


            <RouterView v-slot="{ Component, route }" @navHidden="navHidden = $event">
                <Suspense :timeout="200" >
                    <Component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
                    <template #fallback><spinner /></template>
                </Suspense>
            </RouterView>

        </div>
        <!-- Footer -->
        <footer class="flex flex-col w-full justify-center bg-gradient-to-t from-[#4a1212] to-black text-gray-200 text-sm py-6 text-center items-center m-auto gap-4">
            © {{ new Date().getFullYear() }} Elite Waste Logistics. All rights reserved.


      <!-- LOGIN MODAL -->
      <div
        v-if="showLogin"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded shadow text-center w-80">
          <h2 class="font-bold text-xl mb-4">Admin Login</h2>
          <input
            type="email"
            v-model="email"
            class="border border-gray-300 rounded px-3 py-2 w-full mb-2"
            placeholder="Email"
          />
          <input
            type="password"
            v-model="password"
            class="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            placeholder="Password"
          />
          <div class="flex justify-between">
            <button
              @click="login"
              class="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
            >Login</button>
            <button
              @click="showLogin = false"
              class="text-gray-600 hover:underline"
            >Cancel</button>
          </div>
        </div>
      </div>
        <img :src="logo" />
  <img :src="ewLogo" />
  <img :src="trashCan" />
    </footer>

    </div>
</template>




<script>
import login from './components/layout/login.vue'
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAffJRJ4jYJEUAaiFBrTIixVku3N8OzJ34",
  authDomain: "lone-star-visitor-tracking.firebaseapp.com",
  projectId: "lone-star-visitor-tracking",
  storageBucket: "lone-star-visitor-tracking.appspot.com",
  messagingSenderId: "1056922043979",
  appId: "1:1056922043979:web:cd7244785957a284b26fce"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const LCRA_COUNTIES = ["Burnet", "Travis", "Bastrop", "Fayette", "Llano", "Gillespie", "Colorado", "Matagorda"];

export default {
  components: { login },
  inject: ['store','darkMode'],
  name: "EliteWaste",
  data() {
    return {
      navHidden: false,
      showMenu: false,
      showLogin: false,
      email: '',
      password: '',
      loggedIn: false,
      sessionStart: null,
      stats: {
        total: 0,
        durations: [],
        visitors: []
      }
    };
  },
  computed: {
    averageTime() {
      if (!this.stats.durations.length) return 0;
      const total = this.stats.durations.reduce((a, b) => a + b, 0);
      return Math.round(total / this.stats.durations.length);
    }
  },
  mounted() {
    this.sessionStart = Date.now();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedIn = true;
        this.fetchStats();
      } else {
        this.loggedIn = false;
      }
    });

    // Track IP + Region
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => {
        const isLCRA = LCRA_COUNTIES.includes(data.region);
        addDoc(collection(db, "visits"), {
          timestamp: new Date(),
          sessionID: crypto.randomUUID(),
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          isLCRA
        });
      })
      .catch(err => console.warn("IP tracking failed:", err));
  },
  beforeUnmount() {
    const sessionEnd = Date.now();
    const durationSec = Math.floor((sessionEnd - this.sessionStart) / 1000);
    addDoc(collection(db, "durations"), {
      timestamp: new Date(),
      duration: durationSec
    });
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.showLogin = false;
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    },
    async logout() {
      await signOut(auth);
    },
    async fetchStats() {
      const visitsSnap = await getDocs(collection(db, "visits"));
      const durationsSnap = await getDocs(collection(db, "durations"));

      this.stats.total = visitsSnap.size;
      this.stats.durations = durationsSnap.docs.map(doc => doc.data().duration || 0);
      this.stats.visitors = visitsSnap.docs.map(doc => doc.data());
    }
  }
};
</script>
