<script>
        export let other = false;
        export let title = '';
        export let underRequirement = false;
</script>

<div class="table-row" title={title} class:under-requirement={underRequirement} class:other={other && !underRequirement}>
        <slot />
</div>

<style>
        .table-row {
                display: table-row;
        }
        .under-requirement {
                background-color: #ffa9a9;
        }
        .other {
                background-color: antiquewhite;
        }
        @media (prefers-color-scheme: dark) {
                .other {
                        background-color: gray;
                }
                .under-requirement {
                        background-color: #8c1919;
                }
        }
</style>
