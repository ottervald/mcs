<script>
        export let other = false;
</script>

<div class="list-row" class:other={other}>
        <slot />
</div>

<style>
        .other {
                background-color: antiquewhite;
        }
        @media (prefers-color-scheme: dark) {
                .other {
                        background-color: black;
                }
        }
</style>
