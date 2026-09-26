<script lang="ts">
        import {characterStore} from '../character.ts';
        const {notes} = characterStore;

        let visible:boolean = false;
</script>
{#if visible}
        <button class="show-button" on:click={() => visible = !visible}>Hide Notes</button>
{:else}
        <button class="show-button" on:click={() => visible = !visible}>Show Notes</button>
{/if}

{#if visible}
        <h2>Notes</h2>
        <textarea bind:value={$notes} rows="10" cols="40" id="player-notes" />
{/if}
<style>
        .show-button {
                margin: 5px;
        }
</style>
