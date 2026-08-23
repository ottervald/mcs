<script lang="ts">
        import AddItem from './AddItem.svelte'
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
        import {characterStore} from '../character.ts';
        const {trinkets, maxTrinkets, carriedTrinkets} = characterStore;

        let visible:boolean = false;
</script>
{#if visible}
        <button on:click={() => visible = !visible}>Hide Trinkets</button>
{:else}
        <button on:click={() => visible = !visible}>Show Trinkets</button>
{/if}

{#if visible}
        <h2>Trinkets</h2>
        <div class:decrease={$maxTrinkets - $carriedTrinkets < 0}>
                Trinket spots left: {$maxTrinkets - $carriedTrinkets}
        </div>
<Table>
        <TableHeader>
                <div class="item-cell">
                        Name
                </div>
                <div class="item-cell">
                        Trinket Count
                </div>
        </TableHeader>
        {#each $trinkets as trinket, i}
                <TableRow title={trinket.description} other={i % 2 == 0}>
                        <div class="item-cell name">
                                {trinket.name}
                        </div>
                        <div class="item-cell">
                                {trinket.trinket_count}
                        </div>
                </TableRow>
        {/each}
</Table>
<AddItem />
{/if}

<style>
        .decrease {
                color: red;
        }
        .item-cell {
                display: table-cell;
                max-width: 25em;
                padding: 5px 10px;
        }
        .name {
                text-align: left;
        }
</style>
