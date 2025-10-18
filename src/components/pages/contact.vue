<template>
  <div class="bg-gray-50 text-gray-900">

    <!-- Top strip -->
    <div class="bg-[#7A2525] text-white text-center text-sm py-2">
      Locally Owned • Fully Sanitized • Odor-Free Guarantee
    </div>

    <!-- Hero -->
    <section class="bg-gradient-to-b from-black to-gray-900 text-white">
      <div class="max-w-6xl mx-auto px-6 py-16">
        <h1 class="text-4xl md:text-5xl font-extrabold">Contact Us</h1>
        <p class="mt-4 text-gray-300 max-w-3xl">
          Questions, quotes, or scheduling—send us a message and we’ll get back fast.
        </p>
      </div>
    </section>

    <!-- Contact Block -->
    <section class="bg-white">
      <div class="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10">
        <!-- Info -->
        <div class="space-y-6">
          <div class="rounded-2xl p-6 bg-gray-50 ring-1 ring-gray-200">
            <h2 class="text-xl font-bold mb-2">Get in Touch</h2>
            <p class="text-gray-700">We’re local and responsive—reach us any time.</p>
            <div class="mt-4 space-y-3 text-gray-800">
              <!-- <a href="tel:5127557020" class="block hover:underline">📞 (512) 755-7020</a> -->
              <a href="mailto:info@elitewastelogistics.com" class="block hover:underline">✉️ info@elitewastelogistics.com</a>
              <p>⏱ Mon–Sat, 8:00am–6:00pm</p>
            </div>
          </div>

          <div class="rounded-2xl p-6 bg-gray-50 ring-1 ring-gray-200">
            <h3 class="text-lg font-bold mb-2">Why choose Elite?</h3>
            <ul class="space-y-2">
              <li>✅ Odor-Free Guarantee</li>
              <li>✅ Curbside convenience</li>
              <li>✅ Family-owned, local</li>
            </ul>
          </div>
        </div>

        <!-- Form -->
        <div class="lg:col-span-2">
          <!--
            ACTION IDEAS:
            - Netlify Forms: add data-netlify="true" name="contact"
            - Formspree: action="https://formspree.io/f/xxxx" method="POST"
          -->
          <form
            class="bg-white rounded-2xl shadow p-6 md:p-8 ring-1 ring-gray-200"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p class="hidden">
              <label>Don’t fill this out: <input name="bot-field" /></label>
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Full Name</label>
                <input name="name" required type="text" class="w-full rounded-xl border-gray-300 focus:border-[#7A2525] focus:ring-[#7A2525]" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input name="email" required type="email" class="w-full rounded-xl border-gray-300 focus:border-[#7A2525] focus:ring-[#7A2525]" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Phone</label>
                <input name="phone" type="tel" class="w-full rounded-xl border-gray-300 focus:border-[#7A2525] focus:ring-[#7A2525]" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Address (for service)</label>
                <input name="address" type="text" class="w-full rounded-xl border-gray-300 focus:border-[#7A2525] focus:ring-[#7A2525]" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1"># of Cans</label>
                <select name="cans" class="w-full rounded-xl border-gray-300 focus:border-[#7A2525] focus:ring-[#7A2525]">
                  <option>1</option><option>2</option><option>3</option><option>4+</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Preferred Date</label>
                <input name="date" type="date" class="w-full rounded-xl border-gray-300 focus:border-[#7A2525] focus:ring-[#7A2525]" />
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">How can we help?</label>
              <textarea name="message" rows="5" class="w-full rounded-xl border-gray-300 focus:border-[#7A2525] focus:ring-[#7A2525]" placeholder="Quote request, neighborhood, gate code, etc."></textarea>
            </div>

            <div class="mt-4 flex items-center gap-2">
              <input id="agree" type="checkbox" required class="rounded border-gray-300 text-[#7A2525] focus:ring-[#7A2525]" />
              <label for="agree" class="text-sm text-gray-700">I agree to be contacted about my request.</label>
            </div>

              <button type="submit" class="inline-flex justify-center rounded-xl bg-[#7A2525] px-6 py-3 font-semibold text-white hover:bg-[#5f1d1d]">
                Send Message
              </button>
              <!-- <a href="tel:5127557020" class="inline-flex justify-center rounded-xl bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800">
                Call Now
              </a> -->

            <p class="mt-3 text-xs text-gray-500">Easy online payment — no contracts, no hassle.</p>
          </form>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="bg-gray-100">
      <div class="max-w-6xl mx-auto px-6 py-10 text-center">
        <p class="text-gray-700">
          Prefer email? <a href="mailto:info@elitewastelogistics.com" class="text-[#7A2525] font-semibold hover:underline">info@elitewastelogistics.com</a>
        </p>
      </div>
    </section>

  </div>
</template>
