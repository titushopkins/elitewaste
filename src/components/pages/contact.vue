<template>
    <div class="bg-white dark:bg-black w-full text-gray-800 py-20">
      <div class="max-w-3xl w-full px-6 mx-auto"> <!-- Add mx-auto to center -->

        <!-- Heading -->
        <h1 class="text-4xl font-bold text-center text-belk-blue mb-4">Contact Us</h1>
        <p class="text-center text-gray-600 max-w-xl mx-auto mb-12">
          Need help with your heating or cooling system? Get in touch with Belk Heating & Cooling — we’re here to help!
        </p>

        <!-- Grid Layout -->
          <!-- Contact Info -->
           <div class="flex w-full justify-center px-8">
          <div class="flex-col flex sm:flex-row gap-y-8 gap-x-8 w-full justify-between text-left md:text-left">
            <div>
              <h2 class="text-xl font-semibold text-belk-blue">📞 Phone</h2>
              <a href="tel:7372513394" class="text-gray-700">(737) 251-3394</a>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-belk-blue">📍 Address</h2>
              <a target="blank" href="https://maps.app.goo.gl/Sy9YYV7w1tKEfjAo6" class="text-gray-700">208 Stapp Dr, <br />Burnet, TX 78611</a>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-belk-blue">🕒 Business Hours</h2>
              <p class="text-gray-700">
                Mon–Fri: 8:00 AM – 6:00 PM<br />
                Sat: 9:00 AM – 2:00 PM<br />
                Sun: Closed
              </p>
            </div>
          </div>
          </div>

          <!-- Contact Form -->
          <form @submit.prevent="submitForm" class="bg-belk-light p-6 rounded shadow space-y-4 hidden">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" v-model="form.name" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-belk-accent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" v-model="form.email" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-belk-accent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea v-model="form.message" rows="5" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-belk-accent"></textarea>
            </div>
            <button type="submit" class="bg-belk-accent text-white font-semibold px-6 py-3 rounded shadow hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </div>
    </div>
  </template>


  <script>
  export default {
    name: 'ContactPage',
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: ''
        }
      }
    },
    methods: {
      submitForm() {
        // Simple placeholder – replace with backend integration or email handler
        alert(`Thanks, ${this.form.name}! We'll be in touch soon.`);
        this.form.name = ''
        this.form.email = ''
        this.form.message = ''
      }
    }
  }
  </script>
