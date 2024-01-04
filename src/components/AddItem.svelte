<script lang="ts">
        import {characterStore} from '../character.ts';
        import {purimiveria_armours, purimiveria_items, purimiveria_weapons, purimiveria_shields} from '../lib/libraries.ts';
        import type {Item} from '../lib/libraries.ts';

        let items:Item[] = [...purimiveria_items, ...purimiveria_weapons, ...purimiveria_armours, ...purimiveria_shields];
        let selectedItem:Item = purimiveria_items[0];
        let amountItems:number = 1;
        let filters:string[] = ['All', 'Basic Items', 'Weapons', 'Armours', 'Shields']
        let selectedFilter:string = filters[0];

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
</script>

<div>
        <label>
                Filter:
                <select
                        bind:value={selectedFilter}
                        on:change={changeFilter}
                >
                        {#each filters as filter (filter)}
                                <option value={filter}>
                                        {filter}
                                </option>
                        {/each}
                </select>
        </label>
        <label>
                Item:
                <select
                        bind:value={selectedItem}
                >
                        {#each items as item (item.id)}
                                <option value={item}>
                                        {item.name}
                                </option>
                        {/each}
                </select>
        </label>
        <label>
                Amount:
                <input type="number" bind:value={amountItems}>
        </label>

        <button on:click={addItem}>
                Add
        </button>
        <div class="description">
                {selectedItem.description}
        </div>
</div>

<style>
        .description {
                margin: 0 auto;
                overflow-wrap: break-word;
                width: 400px;
        }
</style>
