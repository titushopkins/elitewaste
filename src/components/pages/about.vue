<template>

    <!-- <template>
    <div class="bg-white dark:bg-black text-gray-800 py-20">
      <div class="max-w-6xl mx-auto px-6">
        <h1 class="text-4xl font-bold text-belk-blue text-center mb-12">About Us</h1>


        <div class="flex flex-col items-center sm:space-x-10 mb-16">
          <div class="flex flex-col w-full justify-center items-center flex mb-6 sm:mb-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVI1Rl_bHxS2IQ81PTxnoFCn8hxZTaPDEKEQ&s"
              alt="Noah Hopkins"
              class="rounded-3xl shadow-lg w-80 h-80 object-cover object-center mb-4"
            />
            <h2 class="text-xl font-bold text-belk-blue mb-4 text-center">Noah Hopkins <span class="">•</span> <span class="text-gray-400 font-thin">Manager/Owner</span></h2>
          </div>
          <div class="sm:w-2/3">

            <div class="text-belk-blue text-base sm:text-lg mb-4">
              Noah Hopkins, born and raised in the scenic Texas Hill Country, is the founder and lead expert behind Belk Heating & Cooling. With a strong work ethic shaped by his roots and a passion for serving his local community, Noah has spent over 5 years working in the HVAC industry.
            </div>
            <div class="text-belk-blue text-base sm:text-lg">
              Inspired and mentored by the late William “Bill” Belk — a seasoned HVAC professional with a heart for helping people — Noah set out to carry on the Belk legacy through honest work, expert care, and personalized service. Today, Belk Heating & Cooling continues to reflect those values in every home and business it serves.
            </div>
          </div>
        </div>


        <div class="text-center">
          <h2 class="text-3xl font-bold text-belk-blue mb-6">Our Mission</h2>
          <div class="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg italic text-center">
            Provide high-quality, trustworthy HVAC solutions that make homes more comfortable and energy efficient. At Belk Heating & Cooling, we believe in doing things right the first time, with transparency, care, and pride in our craftsmanship.
          </div>
        </div>
      </div>
    </div>
  </template> -->


    <div class="bg-white dark:bg-black text-gray-800 py-20">
      <div class="max-w-6xl mx-auto px-6 space-y-8 text-base sm:text-lg">

        <!-- Page Heading -->
        <div class="text-center">
          <h1 class="text-4xl font-bold text-belk-blue mb-4">About Belk Heating & Cooling</h1>
          <div class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Built on integrity, reliability, and a commitment to excellence — Belk Heating & Cooling is here to keep your home comfortable year-round.
          </div>
        </div>

        <div class="flex w-full justify-center bg-belk-blue py-px rounded-full" />

        <!-- Owner Section -->
        <div class="flex flex-col sm:flex-row items-center sm:space-x-10 space-y-6 sm:space-y-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVI1Rl_bHxS2IQ81PTxnoFCn8hxZTaPDEKEQ&s"
            alt="Owner"
            class="w-48 min-w-48 h-48 min-h-48 object-cover object-center rounded-full shadow-md border-4 border-belk-blue/80"
          />
          <div>
            <h2 class="text-2xl font-bold text-belk-blue">Noah Hopkins</h2>
            <div class="text-gray-400 font-medium mb-2">Owner/Manager, HVAC Technician</div>
            <div class="text-gray-700 leading-relaxed">
              Noah founded Belk Heating & Cooling with one mission: to offer honest, top-quality HVAC service to his community. With years of experience and a passion for doing things right, he leads the team with integrity and care.
            </div>
          </div>
        </div>

        <div class="py-6 sm:py-12">
           <div class="flex w-full justify-center bg-belk-blue py-px rounded-full" />
        </div>


        <!-- Employee Section -->
        <div class="flex flex-col sm:flex-row-reverse items-center sm:space-x-reverse sm:space-x-10 space-y-6 sm:space-y-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVI1Rl_bHxS2IQ81PTxnoFCn8hxZTaPDEKEQ&s"
            alt="Employee"
            class="w-48 min-w-48 h-48 min-h-48 object-cover object-center rounded-full shadow-md border-4 border-belk-blue/80"
          />
          <div>
            <h2 class="text-2xl font-bold text-belk-blue">Nick Lamb</h2>
            <div class="text-gray-400 font-medium mb-2">HVAC Technician</div>
            <div class="text-gray-700 leading-relaxed">
              Nick is a dedicated technician who brings expertise, a strong work ethic, and a friendly attitude to every job. Whether it’s installing new systems or diagnosing complex issues, Nick ensures the job gets done right.
            </div>
          </div>
        </div>

        <div class="">
           <div class="flex w-full justify-center bg-belk-blue py-px rounded-full" />
        </div>

        <!-- CTA -->
        <div class="text-center pt-12">
          <h3 class="text-2xl font-semibold text-belk-blue mb-4">Ready to Work With a Team You Can Trust?</h3>
          <a href="/contact" class="inline-block bg-belk-accent text-white font-semibold px-6 py-3 rounded shadow hover:bg-blue-700 transition">
            Contact Us Today
          </a>
        </div>

      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'AboutPage'
  }
  </script>

  <style scoped>
  .text-belk-blue {
    color: #1e3a8a;
  }
  .bg-belk-accent {
    background-color: #3b82f6;
  }
  </style>
