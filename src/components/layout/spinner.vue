<template>
	<div
		class="flex justify-center items-center border-transparent"
		:class="{'w-full h-screen': !small}"
	>
		<div class="rounded-full border-4 animate-spin w-full h-full max-w-32 max-h-32 border-inherit" :class="color"/>
	</div>
</template>

<script>
export default {
	props: {
        small: {type: Boolean, default: false},
        color: {default: 'border-t-blue-500'}
    },
}
</script>
