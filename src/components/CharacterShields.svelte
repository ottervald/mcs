<script lang="ts">
        import {characterStore} from '../character.ts';
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
        const {shields, strength, specie} = characterStore;

        let visible:boolean = true;
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
                <TableRow title={shield.item.description} underRequirement={($strength + $specie.attribute_modifiers.strength) < shield.item.strength_requirement} other={i % 2 == 0 && ($strength + $specie.attribute_modifiers.strength) >= shield.item.strength_requirement} >
                        <div class="shield-cell name">
                                {shield.item.name}
                        </div>
                        <div class="shield-cell">
                                {shield.item.defense_bonus}
                        </div>
                        <div class="shield-cell">
                                {shield.item.strength_requirement}
                        </div>
                        <div class="shield-cell">
                                {shield.item.sturdiness}
                        </div>
                        <div class="shield-cell">
                                {shield.item.size}
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
