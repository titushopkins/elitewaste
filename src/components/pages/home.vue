<template>
  <div class="bg-gray-50 text-gray-900">

    <!-- HERO -->
    <section class="bg-gradient-to-b from-black to-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div class="flex items-baseline space-x-3">
            <span class="bg-white text-black font-extrabold tracking-widest px-3 py-1 text-2xl leading-none uppercase">Elite</span>
            <span class="uppercase tracking-[0.25em] text-sm">Waste Logistics</span>
          </div>
          <h1 class="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">
            Professional Trash Can Cleaning
          </h1>
          <p class="mt-5 text-gray-300 text-lg">
            Your trash cans are breeding bacteria and stinking up your driveway —
            <span class="font-semibold text-white">we make them look, smell, and feel brand new again in minutes.</span>
          </p>

          <div class="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#pricing" class="inline-flex justify-center rounded-xl bg-[#7A2525] px-6 py-3 font-semibold hover:bg-[#5f1d1d]">
              See Pricing
            </a>
            <a href="#how" class="inline-flex justify-center rounded-xl px-6 py-3 font-semibold ring-1 ring-white/25 hover:bg-white/10">
              How It Works
            </a>
          </div>
          <ul class="flex flex-col space-y-1 mt-4 text-sm list-none text-gray-400">
            <li class="flex items-center">
             <svg class="w-6 h-6 text-[#7A2525]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M5 13l4 4L19 7"/></svg>
             <p>Locally Owned • Fully Sanitized • Odor-Free Guarantee</p>
            </li>
            <li class="flex items-center">
             <svg class="w-6 h-6 text-[#7A2525]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M5 13l4 4L19 7"/></svg>
             <p>Easy online payment — no hassle.</p>
            </li>
          </ul>
        </div>

        <!-- Price Highlight -->
        <div class="bg-white text-gray-900 rounded-2xl shadow-2xl p-8">
          <div class="text-5xl font-extrabold">$35</div>
          <div class="mt-1 text-lg font-semibold">first can</div>
          <div class="mt-1 text-gray-600">+ $15 for each additional</div>

          <ul class="mt-6 space-y-3">
            <li class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-[#7A2525]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <p>Kills <span class="font-semibold">99.9%</span> of germs</p>
            </li>
            <li class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-[#7A2525]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <p>Deodorized and spotless</p>
            </li>
            <li class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-[#7A2525]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <p>Cleaned curbside — you don’t lift a finger</p>
            </li>
          </ul>

          <button @click="showForm = true" class="mt-8 inline-flex w-full justify-center rounded-xl bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800">
            Sign Up Now
          </button>
          <p class="mt-2 text-center text-xs text-gray-500">One-time or recurring service available.</p>
        </div>
      </div>
    </section>





    <!-- Modal Overlay -->
    <transition name="fade">
      <div
        v-if="showForm"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      >
        <div
          class="bg-white rounded-xl py-8 w-[95%] max-w-3xl relative shadow-2xl"
        >
          <button
            @click="showForm = false"
            class="absolute top-1 right-2 text-[#7a2525] hover:text-black text-3xl font-bold"
            aria-label="Close"
          >
            ×
          </button>

          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdrV6doNvYp-sJuj2qqxOnCr7IIAIBnBCMTSY1aG2L92H_E9g/viewform?embedded=true"
            class="w-full flex"
            style="min-height: 80vh;"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </transition>




    <!-- HOW IT WORKS -->
    <section id="how" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-extrabold text-center">How It Works</h2>
        <div class="mt-10 grid md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-2xl ring-1 ring-gray-200">
            <div class="text-sm font-semibold text-[#7A2525]">Step 1</div>
            <h3 class="mt-1 text-xl font-bold">Book Online</h3>
            <p class="mt-2 text-gray-600">Choose a date and tell us how many cans. We’ll send reminders before arrival.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-2xl ring-1 ring-gray-200">
            <div class="text-sm font-semibold text-[#7A2525]">Step 2</div>
            <h3 class="mt-1 text-xl font-bold">Curbside Clean</h3>
            <p class="mt-2 text-gray-600">High-temp wash + eco-friendly sanitizer. Rinse, deodorize, and dry.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-2xl ring-1 ring-gray-200">
            <div class="text-sm font-semibold text-[#7A2525]">Step 3</div>
            <h3 class="mt-1 text-xl font-bold">Smell-Good Finish</h3>
            <p class="mt-2 text-gray-600">Your cans are left spotless and odor-free. No contracts — pay as you go.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-extrabold text-center">Simple, Upfront Pricing</h2>
        <p class="text-center text-gray-600 mt-2">Transparent rates with no surprises.</p>

        <div class="mt-10 grid lg:grid-cols-3 gap-8">
          <!-- One-Time -->
          <div class="bg-white rounded-2xl shadow p-8">
            <h3 class="font-bold text-xl">One-Time Clean</h3>
            <div class="mt-3">
              <div class="text-4xl font-extrabold">$35</div>
              <div class="text-gray-600">first can</div>
              <div class="text-gray-600">+ $15 each additional</div>
            </div>
            <button @click="showForm = true" class="mt-8 inline-flex w-full justify-center rounded-xl bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800">
              Sign Up Now
            </button>
          </div>

          <!-- Monthly (featured) -->
          <div class="bg-[#7A2525] text-white rounded-2xl shadow-lg p-8 ring-4 ring-[#7A2525]/20">
            <h3 class="font-bold text-xl">Monthly Plan</h3>
            <p class="text-white/80">Best for busy households</p>
            <div class="mt-3">
              <div class="text-4xl font-extrabold">$25</div>
              <div class="opacity-80">per visit • first can</div>
              <div class="opacity-80">+ $10 each additional</div>
            </div>
            <button @click="showForm = true" class="mt-8 inline-flex w-full justify-center rounded-xl bg-white text-black px-6 py-3 font-semibold hover:bg-gray-100">
              Start Monthly
            </button>
          </div>

          <!-- Quarterly -->
          <div class="bg-white rounded-2xl shadow p-8">
            <h3 class="font-bold text-xl">Quarterly Plan</h3>
            <div class="mt-3">
              <div class="text-4xl font-extrabold">$30</div>
              <div class="text-gray-600">per visit • first can</div>
              <div class="text-gray-600">+ $12 each additional</div>
            </div>
            <button @click="showForm = true" class="mt-8 inline-flex w-full justify-center rounded-xl bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800">
              Choose Quarterly
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST/FEATURES STRIP -->
    <section class="bg-white">
      <div class="max-w-7xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-6 text-center">
        <div class="rounded-xl bg-gray-50 p-5 ring-1 ring-gray-200">✅ Fully Sanitized</div>
        <div class="rounded-xl bg-gray-50 p-5 ring-1 ring-gray-200">✅ Odor-Free Guarantee</div>
        <div class="rounded-xl bg-gray-50 p-5 ring-1 ring-gray-200">✅ Curbside Convenience</div>
      </div>
    </section>

    <!-- CONTACT CTA -->
    <section id="contact" class="bg-black text-white">
      <div class="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 class="text-3xl md:text-4xl font-extrabold">Ready to Freshen Your Cans?</h2>
        <p class="mt-3 text-gray-300 text-lg">Book online or contact us for a quick quote.</p>
        <div class="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <button @click="showForm = true" class="inline-flex items-center justify-center rounded-xl bg-[#7A2525] px-6 py-3 font-semibold hover:bg-[#5f1d1d]">
            Sign Up Services
          </button>
          <a href="mailto:info@elitewastelogistics.com" class="inline-flex items-center justify-center rounded-xl bg-white text-black px-6 py-3 font-semibold hover:bg-gray-100">
            ✉️ info@elitewastelogistics.com
          </a>
        </div>
      </div>
    </section>

  </div>
</template>


<script>
export default {
  name: "SignUpModal",
  data() {
    return {
      showForm: false, // modal closed by default
    };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
