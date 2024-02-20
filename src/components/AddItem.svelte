<script lang="ts">
        import Modal from './shared/Modal.svelte'
        import ListRow from './shared/ListRow.svelte';
        import {characterStore} from '../character.ts';
        import {purimiveria_armours, purimiveria_items, purimiveria_weapons, purimiveria_shields} from '../lib/libraries.ts';
        import type {Item} from '../lib/libraries.ts';

        let items:Item[] = [...purimiveria_items, ...purimiveria_weapons, ...purimiveria_armours, ...purimiveria_shields];
        let selectedItem:Item = purimiveria_items[0];
        let amountItems:number = 1;
        let filters:string[] = ['All', 'Basic Items', 'Weapons', 'Armours', 'Shields']
        let selectedFilter:string = filters[0];
        let openModal:boolean = false;

        function changeFilter() {
                switch (selectedFilter) {
                        case 'Basic Items':
                                items = purimiveria_items;
                                break;
                        case 'Weapons':
                                items = purimiveria_weapons;
                                break;
                        case 'Armours':
                                items = purimiveria_armours;
                                break;
                        case 'Shields':
                                items = purimiveria_shields;
                                break;
                        case 'All':
                        default:
                                items = [...purimiveria_items, ...purimiveria_weapons, ...purimiveria_armours, ...purimiveria_shields];
                }
                selectedItem = items[0];
        }
        function addItem() {
                characterStore.addItem(selectedItem, amountItems);
        }
        function toggleModal() {
                openModal = !openModal;
        }
</script>

<Modal open={openModal} onClose={toggleModal}>
        <div class="content-holder">
                <div class="content">
                        <div class="filter-holder">
                                <label>
                                        Filter:
                                        <select
                                                bind:value={selectedFilter}
                                                on:change={changeFilter}
                                                id="item-filter"
                                        >
                                                {#each filters as filter (filter)}
                                                        <option value={filter} id={filter}>
                                                                {filter}
                                                        </option>
                                                {/each}
                                        </select>
                                </label>
                        </div>
                        <div class="item-list">
                                {#each items as item, i}
                                        <ListRow other={i % 2 == 0}>
                                                <div class="item-select" on:click={() => {selectedItem = item;}}>
                                                        {item.name}
                                                </div>
                                        </ListRow>
                                {/each}
                        </div>
                </div>
                <div class="content">
                        <h2 class="item-header">
                                {selectedItem.name}
                        </h2>
                        <div class="item-description">
                                {selectedItem.description}
                        </div>
                </div>
        </div>
        <div>
                <label>
                        Amount:
                        <input type="number" bind:value={amountItems} id="selected-item-amount">
                </label>
        </div>
        <button on:click={() => {toggleModal(); addItem();}}>
                Add
        </button>
</Modal>
<button on:click={toggleModal}>
        Add Item
</button>

<style>
        .content-holder {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 1em;
                align-items: baseline;
        }
        .content {
                width: 45%;
                margin: 0 auto;
        }
        .filter-holder {
                margin-bottom: 0.3em;
        }
        .item-list {
                max-height: 48em;
                overflow-y: auto;
        }
        .item-select {
                cursor: pointer;
        }
</style>
