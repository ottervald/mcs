<script lang="ts">
        import AddItem from './AddItem.svelte'
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
        import {characterStore} from '../character.ts';
        const {characterItems, itemCostTotal, itemSizeTotal} = characterStore;

        let visible:boolean = false;
</script>
{#if visible}
        <button on:click={() => visible = !visible}>Hide Inventory</button>
{:else}
        <button on:click={() => visible = !visible}>Show Inventory</button>
{/if}

{#if visible}
        <h2>Inventory</h2>
<Table>
        <TableHeader>
                <div class="item-cell">
                        Total cost {$itemCostTotal}
                </div>
                <div class="item-cell">
                        Name
                </div>
                <div class="item-cell">
                        Size
                </div>
                <div class="item-cell">
                        Amount
                </div>
                <div class="item-cell">
                        Total Size: {$itemSizeTotal}
                </div>
                <div class="item-cell">
                        Sturdiness
                </div>
                <div class="item-cell">
                        Cost
                </div>
        </TableHeader>
        {#each $characterItems as item, i}
                <TableRow title={item.item.description} other={i % 2 == 0}>
                        <div class="item-cell name">
                                <button on:click={() => characterStore.removeItem(item, i) }>Remove</button>
                        </div>
                        <div class="item-cell name">
                                {item.item.name}
                        </div>
                        <div class="item-cell">
                                {item.item.size}
                        </div>
                        <div class="item-cell">
                                {item.amount}
                        </div>
                        <div class="item-cell">
                                {item.item.size * item.amount}
                        </div>
                        <div class="item-cell">
                                {item.item.sturdiness}
                        </div>
                        <div class="item-cell">
                                {item.item.cost * item.amount}
                        </div>
                </TableRow>
        {/each}
</Table>
<AddItem />
{/if}

<style>
        .item-cell {
                display: table-cell;
                max-width: 25em;
                padding: 5px 10px;
        }
        .name {
                text-align: left;
        }
</style>
