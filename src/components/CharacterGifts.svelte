<script lang="ts">
        import AddGift from './AddGift.svelte'
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
        import {characterStore} from '../character.ts';
        const {characterGifts, giftExperience} = characterStore;

        let visible:boolean = false;
</script>
{#if visible}
        <button class="show-button" on:click={() => visible = !visible}>Hide Gifts</button>
{:else}
        <button class="show-button" on:click={() => visible = !visible}>Show Gifts</button>
{/if}

{#if visible}
        <h2>Gifts</h2>
<Table>
        <TableHeader>
                <div class="gift-cell">
                        {$giftExperience} exp
                </div>
                <div class="gift-cell">
                        Name
                </div>
                <div class="gift-cell">
                        Cost
                </div>
        </TableHeader>
        {#each $characterGifts as gift, i}
                <TableRow title={gift.gift.description} other={i % 2 == 0} underRequirement={!gift.requirementsMet}>
                        <div class="gift-cell name">
                                <button on:click={() => characterStore.removeGift(gift, i) }>Remove</button>
                        </div>
                        <div class="gift-cell name">
                                {gift.gift.name}
                        </div>
                        <div class="gift-cell">
                                {gift.cost}
                        </div>
                </TableRow>
        {/each}
</Table>
<AddGift />
{/if}

<style>
        .decrease {
                color: red;
        }
        .gift-cell {
                display: table-cell;
                max-width: 25em;
                padding: 5px 10px;
        }
        .name {
                text-align: left;
        }
        .show-button {
                margin: 5px;
        }
</style>
