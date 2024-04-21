<script lang="ts">
        import {characterStore} from '../character.ts';
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
        const {shields, strength, specie} = characterStore;

        let visible:boolean = false;
</script>
{#if visible}
        <button on:click={() => visible = !visible}>Hide Shields</button>
{:else}
        <button on:click={() => visible = !visible}>Show Shields</button>
{/if}

{#if visible}
        <h2>Shields</h2>
<Table>
        <TableHeader>
                <div class="shield-cell">
                        Name
                </div>
                <div class="shield-cell">
                        Defense Bonus
                </div>
                <div class="shield-cell">
                        Strength Requirement
                </div>
                <div class="shield-cell">
                        Sturdiness
                </div>
                <div class="shield-cell">
                        Size
                </div>
        </TableHeader>
        {#each $shields as shield, i}
                <TableRow title={shield.description} underRequirement={($strength + $specie.attribute_modifiers.strength) < shield.strength_requirement} other={i % 2 == 0 && ($strength + $specie.attribute_modifiers.strength) >= shield.strength_requirement} >
                        <div class="shield-cell name">
                                {shield.name}
                        </div>
                        <div class="shield-cell">
                                {shield.defense_bonus}
                        </div>
                        <div class="shield-cell">
                                {shield.strength_requirement}
                        </div>
                        <div class="shield-cell">
                                {shield.sturdiness}
                        </div>
                        <div class="shield-cell">
                                {shield.size}
                        </div>
                </TableRow>
        {/each}
</Table>
{/if}

<style>
        .shield-cell {
                display: table-cell;
                max-width: 25em;
                padding: 5px 10px;
        }
        .name {
                text-align: left;
        }
</style>
