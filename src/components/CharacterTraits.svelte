<script lang="ts">
        import AddTrait from './AddTrait.svelte'
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
        import {characterStore} from '../character.ts';
        const {characterTraits, traitExperience, specie} = characterStore;

        let visible:boolean = false;
</script>
{#if visible}
        <button on:click={() => visible = !visible}>Hide Traits</button>
{:else}
        <button on:click={() => visible = !visible}>Show Traits</button>
{/if}

{#if visible}
        <h2>Ancestry Traits</h2>
<Table>
        <TableHeader>
                <div class="trait-cell">
                        Trait Name
                </div>
        </TableHeader>
        {#each $specie.traits as trait, i}
                <TableRow title={trait} other={i % 2 == 0}>
                        <div class="trait-cell name">
                                {trait}
                        </div>
                </TableRow>
        {/each}
</Table>
        <h2>Traits</h2>
<Table>
        <TableHeader>
                <div class="trait-cell">
                        {$traitExperience} exp
                </div>
                <div class="trait-cell">
                        Name
                </div>
                <div class="trait-cell">
                        Level
                </div>
                <div class="trait-cell">
                        Cost
                </div>
                <div class="trait-cell">
                        Removable
                </div>
                <div class="trait-cell">
                </div>
        </TableHeader>
        {#each $characterTraits as trait, i}
                <TableRow title={trait.trait.description} other={i % 2 == 0} underRequirement={!trait.requirementsMet}>
                        <div class="trait-cell name">
                                <button on:click={() => characterStore.removeTrait(trait, i) }>Remove</button>
                        </div>
                        <div class="trait-cell name">
                                {trait.trait.name}
                        </div>
                        <div class="trait-cell">
                                {#if trait.level > 0}
                                        {trait.level}
                                {:else}
                                        -
                                {/if}
                        </div>
                        <div class="trait-cell">
                                {trait.cost}
                        </div>
                        <div class="trait-cell">
                                {trait.trait.removable}
                        </div>
                        {#if trait.trait.levels}
                                <div class="trait-cell">
                                        <button disabled={trait.level > 9} on:click={() => characterStore.increaseTrait(trait, i) }>+</button>
                                        <button disabled={trait.level < 1} on:click={() => characterStore.decreaseTrait(trait, i) } class="decrease">-</button>
                                </div>
                        {/if}
                </TableRow>
        {/each}
</Table>
<AddTrait />
{/if}

<style>
        .decrease {
                color: red;
        }
        .trait-cell {
                display: table-cell;
                max-width: 25em;
                padding: 5px 10px;
        }
        .name {
                text-align: left;
        }
</style>
