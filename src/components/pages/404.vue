<template>
	<main class="w-full pt-16 flex flex-col justify-center items-center text-center min-h-screen">
		<div class="w-full flex flex-wrap justify-center items-center relative px-8 md:px-16">
			<h1 class="w-full text-8xl sm:text-9xl md:text-10xl font-bold text-gray-800 leading-none">404</h1>
			<p class="w-full text-4xl font-semibold text-gray-600">Are you lost?</p>
			<p class="w-full text-2xl font-semibold text-gray-600 mt-4">
				How about messages on
				<router-link
					class="text-3xl text-ncfic-blue-500 dark:text-ncfic-blue-800 hover:text-ncfic-blue-600 font-bold hover:underline hover:-translate-y-2 transition-all duration-500 inline-block"
					:to="`/resources/topics/60c927e8826ba92e9196fcd5`"
				>
					The Gospel
					<i class="fas fa-long-arrow-right text-gray-200 dark:text-gray-800"></i>
				</router-link>
			</p>
		</div>
	</main>
</template>

<script>
export default {

}
</script>

<style>

</style>
