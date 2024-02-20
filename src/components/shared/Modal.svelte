<script>
        export let open = false;
        export let onClose;
</script>

<div class="modal" class:open-modal={open} on:click|self={onClose}>
        <div class="container">
                <div class="close" on:click={onClose}>X</div>
                <slot />
        </div>
</div>

<style>
        .modal {
                z-index: 1;
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.6);
                display: none;
        }
        .open-modal {
                display: block;
        }
        .container {
                border-radius: 2px;
                position: absolute;
                left: 4em;
                top: 4em;
                right: 4em;
                bottom: 4em;
                padding: 2em;
                background-color: white;
                overflow: hidden;
        }
        .close {
                position: absolute;
                top: 7px;
                right: 7px;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                font-size: 20px;
                font-weight: bold;
                background-color: antiquewhite;
                cursor: pointer;
        }
        @media (prefers-color-scheme: dark) {
                .container {
                        background-color: gray;
                }
                .close {
                        background-color: black;
                }
        }
</style>
