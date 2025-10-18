<template>
    <div class="bg-white dark:bg-black text-gray-800">

      <!-- Hero div -->
      <div class="bg-gradient-to-tr from-belk-blue to-belk-accent text-white py-20">
        <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div class="mb-10 md:mb-0 md:w-1/2">
            <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Stay Comfortable Year-Round
            </h2>
            <p class="text-lg mb-6">
              Belk Heating & Cooling provides trusted HVAC services across your community. Repairs, installs, maintenance — we’ve got your comfort covered.
            </p>
            <a href="#contact" class="inline-block bg-belk-accent text-white font-semibold px-6 py-3 rounded shadow hover:bg-blue-700 transition">
              Request a Quote
            </a>
          </div>
          <img
            src="https://media.istockphoto.com/id/1470745396/photo/air-conditioning-technician-or-engineer-on-roof-for-maintenance-building-or-construction-of.jpg?s=612x612&w=0&k=20&c=7I5zXURf4R7z9mtlJh5Yh00BrVTk5MLOtpOC6_COmMs="
            alt="AC Repair"
            class="w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>
      </div>

      <!-- Mitsubishi Section -->
      <div class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-6 md:flex md:items-center md:space-x-10">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <img src="https://www.mitsubishicomfort.com/sites/default/files/styles/large/public/2020-06/Outdoor_Unit.png" alt="Mitsubishi AC Unit" class="rounded shadow-md">
          </div>
          <div class="md:w-1/2">
            <h3 class="text-3xl font-bold mb-4 text-belk-blue">Why Mitsubishi AC Units Are the Best</h3>
            <ul class="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Energy Efficient:</strong> Inverter-driven technology lowers energy use and cuts electricity bills.</li>
              <li><strong>Quiet Operation:</strong> As low as 22 dB — you won’t even notice it running.</li>
              <li><strong>Durability:</strong> Built to last with industry-leading warranties and reliability.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Services -->
      <div id="services" class="py-20 bg-belk-light">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <h3 class="text-4xl font-bold mb-12 text-belk-blue">Our Services</h3>
          <div class="grid gap-10 md:grid-cols-3">
            <div class="bg-white dark:bg-black p-6 rounded shadow hover:shadow-lg transition">
              <h4 class="text-xl text-belk-blue font-semibold mb-3">AC Installation</h4>
              <p class="text-gray-600">Energy-efficient AC systems installed quickly and professionally.</p>
            </div>
            <div class="bg-white dark:bg-black p-6 rounded shadow hover:shadow-lg transition">
              <h4 class="text-xl text-belk-red font-semibold mb-3">Heating Repair</h4>
              <p class="text-gray-600">We keep you warm in winter with expert furnace and heater service.</p>
            </div>
            <div class="bg-white dark:bg-black p-6 rounded shadow hover:shadow-lg transition">
              <h4 class="text-xl text-belk-blue font-semibold mb-3">System Maintenance</h4>
              <p class="text-gray-600">Prevent breakdowns and improve performance with seasonal maintenance.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- About Section -->
      <div id="about" class="py-20 bg-white dark:bg-black">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <h3 class="text-3xl font-bold mb-6 text-belk-blue">Why Choose Belk?</h3>
          <p class="text-gray-700 max-w-3xl mx-auto">
            With years of experience, Belk Heating & Cooling is dedicated to honest work, transparent pricing, and lasting results. We're fully licensed and proudly serve our neighbors with integrity under the leadership of Noah Hopkins.
          </p>
        </div>
      </div>

      <!-- Meet Noah -->
      <div class="py-20 bg-gray-100">
        <div class="max-w-6xl mx-auto px-6 md:flex md:items-center md:space-x-10">
          <div class="md:w-1/3 mb-6 md:mb-0">
            <img src="https://via.placeholder.com/300x300.png?text=Noah+Hopkins" alt="Noah Hopkins" class="rounded-full shadow-lg">
          </div>
          <div class="md:w-2/3">
            <h3 class="text-3xl font-bold mb-4 text-belk-blue">Meet the Owner – Noah Hopkins</h3>
            <p class="text-gray-700 text-lg">
              Noah Hopkins brings over 15 years of HVAC expertise to every job. As the owner of Belk Heating & Cooling, Noah ensures each project is handled with care, professionalism, and a focus on long-term comfort. Certified, experienced, and trusted by the community, Noah is committed to delivering the best in customer satisfaction and technical excellence.
            </p>
          </div>
        </div>
      </div>

      <!-- Testimonials -->
      <div id="testimonials" class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <h3 class="text-3xl font-bold mb-12 text-belk-blue">What Our Customers Say</h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white dark:bg-black p-6 rounded shadow">
              <p class="text-gray-700 italic">"Test comment A"</p>
              <p class="mt-4 font-semibold text-belk-blue">– Client A.</p>
            </div>
            <div class="bg-white dark:bg-black p-6 rounded shadow">
              <p class="text-gray-700 italic">"Test comment B."</p>
              <p class="mt-4 font-semibold text-belk-blue">– Client B.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div id="contact" class="py-20 bg-belk-blue/90 text-white text-center">
        <div class="max-w-2xl mx-auto px-6">
          <h3 class="text-3xl font-bold mb-4">Ready to Get Comfortable?</h3>
          <p class="mb-6 text-lg">Call us today or request a quote and we’ll be in touch shortly.</p>
          <a href="tel:7372513394" class="inline-block bg-belk-accent text-white font-semibold px-6 py-3 rounded shadow hover:bg-blue-700 transition">
            📞 (737) 251-3394
          </a>
        </div>
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {}
    },
    methods: {},
    components: {}
  }
  </script>

  <style scoped>
  /* .bg-belk-light { background-color: #f5faff; }
  .text-belk-blue { color: #1e3a8a; }
  .bg-belk-blue { background-color: #1e3a8a; }
  .text-belk-accent, .bg-belk-accent { color: #ff6b35; background-color: #ff6b35; }
  .text-belk-red { color: #dc2626; }

  .text-belk-gray { color: #4b5563; }
  .bg-belk-amber { background-color: #f59e0b; }
  .bg-belk-teal { background-color: #14b8a6; } */
  </style>
