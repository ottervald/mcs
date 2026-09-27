<script lang="ts">
        import Modal from './shared/Modal.svelte'
        import ListRow from './shared/ListRow.svelte';
        import {characterStore} from '../character.ts';
        import {purimiveria_gifts} from '../lib/gifts/gifts.ts';
        import type {Gift} from '../lib/gifts/gifts.ts';

        let gifts:Gift[] = purimiveria_gifts;
        let selectedGift:Gift = purimiveria_gifts[0];
        let filters:string[] = ['All', 'Trait', 'Conjury Sphere', 'Resonance'];
        let selectedFilter:string = filters[0];
        let openModal:boolean = false;

        function changeFilter() {
                if (selectedFilter !== 'All') {
                        gifts = purimiveria_gifts.filter((gift) => gift.category === selectedFilter);
                } else {
                        gifts = purimiveria_gifts;
                }
                selectedGift = gifts[0];
        }
        function addGift() {
                characterStore.addGift(selectedGift);
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
                                                id="gift-filter"
                                        >
                                                {#each filters as filter (filter)}
                                                        <option value={filter} id={filter}>
                                                                {filter}
                                                        </option>
                                                {/each}
                                        </select>
                                </label>
                        </div>
                        <div class="gift-list">
                                {#each gifts as gift, i}
                                        <ListRow other={i % 2 == 0}>
                                                <button class="gift-select" on:click={() => selectedGift = gift}>
                                                        {gift.name}
                                                </button>
                                        </ListRow>
                                {/each}
                        </div>
                </div>
                <div class="content">
                        <h2 class="gift-header">
                                {selectedGift.name}
                        </h2>
                        <div class="gift-description">
                                {selectedGift.description}
                        </div>
                        <div class="gift-cost">Cost: {selectedGift.cost} exp</div>
                        <div class="gift-requirements">
                                <h4>Requirements (one of)</h4>
                                {#if selectedGift.requiredTraits.length > 0}
                                        <h5>Traits</h5>
                                        <div class="attribute-container">
                                                {#each selectedGift.requiredTraits as trait, i}
                                                        <div class="attribute-row" class:other={i % 2 == 0}>
                                                                <div class="attribute-cell name">{trait.name}:</div>
                                                                <div class="attribute-cell">{trait.minimumValue}</div>
                                                        </div>
                                                {/each}
                                        </div>
                                {/if}
                        </div>
                </div>
        </div>
        <button on:click={() => {toggleModal(); addGift();}}>
                Add
        </button>
</Modal>
<button on:click={toggleModal}>
        Add Gift
</button>

<style>
        .content-holder {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 1em;
                align-items: baseline;
                height: calc(100% - 3em);
        }
        .content {
                width: 45%;
                margin: 0 auto;
                height: 100%;
                overflow-y: auto;
        }
        .filter-holder {
                margin-bottom: 0.3em;
        }
        .gift-list {
                max-height: calc(100% - 5em);
                overflow-y: auto;
        }
        .gift-select {
                width: 100%;
                background: none;
                color: inherit;
                border: none;
                padding: 0;
                font: inherit;
                cursor: pointer;
                outline: inherit;
        }
        .gift-description {
                white-space: pre-line;
        }
        .gift-cost {
                font-weight: bold;
        }
        .attribute-container {
                display: table;
                width: 100%;
        }
        .attribute-row {
                display: table-row;
        }
        .attribute-cell {
                display: table-cell;
        }
        .name {
                text-align: left;
        }
</style>
