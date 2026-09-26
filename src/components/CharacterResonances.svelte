<script lang="ts">
        import {characterStore} from '../character.ts';
        const {characterResonances, totalResonances} = characterStore;
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';

        let visible:boolean = false;
</script>
{#if visible}
        <button class="show-button" on:click={() => visible = !visible}>Hide Resonances</button>
{:else}
        <button class="show-button" on:click={() => visible = !visible}>Show Resonances</button>
{/if}

{#if visible}
        <h2>Resonances</h2>
<div class:decrease={$totalResonances < 0}>
        Resonance points left: {$totalResonances}
</div>
<Table>
        <TableHeader>
                <div class="attribute-cell">
                        Resonance
                </div>
                <div class="attribute-cell">
                        Value
                </div>
        </TableHeader>
        <TableRow >
                <div class="attribute-cell name">
                        Air
                </div>
                <div class="attribute-cell">
                        {$characterResonances.air}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseAir() }>+</button>
                        <button disabled={$characterResonances.air < 1} on:click={() => characterStore.decreaseAir() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow >
                <div class="attribute-cell name">
                        Earth
                </div>
                <div class="attribute-cell">
                        {$characterResonances.earth}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseEarth() }>+</button>
                        <button disabled={$characterResonances.earth < 1} on:click={() => characterStore.decreaseEarth() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow >
                <div class="attribute-cell name">
                        Fire
                </div>
                <div class="attribute-cell">
                        {$characterResonances.fire}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseFire() }>+</button>
                        <button disabled={$characterResonances.fire < 1} on:click={() => characterStore.decreaseFire() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow >
                <div class="attribute-cell name">
                        Water
                </div>
                <div class="attribute-cell">
                        {$characterResonances.water}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseWater() }>+</button>
                        <button disabled={$characterResonances.water < 1} on:click={() => characterStore.decreaseWater() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow >
                <div class="attribute-cell name">
                      Life  
                </div>
                <div class="attribute-cell">
                        {$characterResonances.life}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseLife() }>+</button>
                        <button disabled={$characterResonances.life < 1} on:click={() => characterStore.decreaseLife() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow >
                <div class="attribute-cell name">
                        Death
                </div>
                <div class="attribute-cell">
                        {$characterResonances.death}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseDeath() }>+</button>
                        <button disabled={$characterResonances.death < 1} on:click={() => characterStore.decreaseDeath() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow >
                <div class="attribute-cell name">
                        Light
                </div>
                <div class="attribute-cell">
                        {$characterResonances.light}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseLight() }>+</button>
                        <button disabled={$characterResonances.light < 1} on:click={() => characterStore.decreaseLight() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow >
                <div class="attribute-cell name">
                        Darkness
                </div>
                <div class="attribute-cell">
                        {$characterResonances.darkness}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseDarkness() }>+</button>
                        <button disabled={$characterResonances.darkness < 1} on:click={() => characterStore.decreaseDarkness() } class="decrease">-</button>
                </div>
        </TableRow>
</Table>
{/if}
<style>
        .decrease {
                color: red;
        }
        .attribute-cell {
                display: table-cell;
                padding: 5px 10px;
        }
        .name {
                text-align: left;
        }

        .show-button {
                margin: 5px;
        }
</style>
