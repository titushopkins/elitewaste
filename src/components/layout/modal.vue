<template>
    <div
        ref="modal"
        @click.prevent.stop="close"
        tabindex="-1"
        class="
            fixed w-full h-screen bg-gray-800/50 dark:bg-black/60 backdrop-blur-sm md:backdrop-blur-md opacity-0 transition-all duration-500
            flex items-start sm:items-center justify-center z-[100] inset-0 !m-0 overscroll-none cursor-default
        "
        :class="{'!opacity-100': fadeIn}"
        aria-modal="true"
        v-show="active"
        role="dialog"
    >
        <button @click.prevent.stop="close" class="absolute top-2 right-3"><i class="fa fa-times md:text-4xl" /></button>
        <div
            ref="modalContent"
            @click.stop
            class="shadow-card rounded w-full p-4 md:p-8 m-2 dark:bg-gray-800 bg-white relative
            border dark:border-gray-700 space-y-4 md:space-y-8 max-h-[75vh]"
            :class="[dialogClasses, maxWidth, allowOverflow ? 'overflow-visible' : 'overflow-y-scroll']"
        >
            <slot :close="close"/>
        </div>
    </div>
    <!-- max-w-md max-w-lg max-w-xl max-w-sm -->
</template>

<script>
export default {
    props: {
        dialogClasses: {type: String, default: ''},
        maxWidth: {default: 'max-w-md'},
        active: {default: true},
        allowOverflow: {type: Boolean, default: false},
    },
    data() {
        return {
            fadeIn: false
        }
    },
    watch: {
        active: {
            handler() {
                if (this.active) this.freeze()
                else this.thaw()
            },
            immediate: true
        }
    },
    beforeDestroy() {
        this.thaw();
    },
    unmounted() {
        this.thaw();
    },
    methods: {
        freeze() {
            this.$nextTick(() => {
                this.$refs.modalContent.focus()
                this.fadeIn = true
                document.body.style.overflow = 'hidden';
                document.getElementById('app').setAttribute('aria-hidden', 'true');
                this.$refs.modal.setAttribute('aria-modal', 'true');
                this.attachListeners();
            });
        },
        thaw() {
            document.body.style.overflow = '';
            document.getElementById('app').setAttribute('aria-hidden', 'false');
            this.$refs?.modal?.removeAttribute('aria-modal');
            this.removeListeners();
        },
        close() {
            this.fadeIn = false
            this.thaw()
            setTimeout(() => {
                this.$emit('hide')
            }, 500);
        },
        attachListeners() {
            window.addEventListener('keydown', this.handleKeydown);
        },
        removeListeners() {
            window.removeEventListener('keydown', this.handleKeydown);
        },
        handleKeydown(e) {
            if (e.key === 'Tab') {
                this.manageFocus(e);
            } else if (e.key === 'Escape') {
                this.close()
            }
        },
        manageFocus(e) {
            let focusable = Array.from(this.$refs.modal.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'));
            focusable = focusable.filter(el => window.getComputedStyle(el).display !== 'none');
            console.log('focusable', focusable)

            if (!focusable.includes(document.activeElement)) {
                e.preventDefault();
                focusable[0].focus();
            } else if (e.shiftKey && document.activeElement === focusable[0]) {
                e.preventDefault();
                focusable[focusable.length - 1].focus();
            } else if (document.activeElement === focusable[focusable.length - 1]) {
                e.preventDefault();
                focusable[0].focus();
            }

        }
    }
}
</script>
