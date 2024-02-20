<script lang="ts">
        import Modal from './shared/Modal.svelte'
        import ListRow from './shared/ListRow.svelte';
        import {characterStore} from '../character.ts';
        import {purimiveria_traits} from '../lib/traits/traits.ts';
        import type {Trait} from '../lib/traits/traits.ts';

        let traits:Trait[] = purimiveria_traits;
        let selectedTrait:Trait = purimiveria_traits[0];
        let filters:string[] = ['All', 'Mundane', 'Expertise', 'Magical & Supernatural', 'Conjury Sphere', 'Allies & Companions', 'Starting Equipment', 'MEGA SPECIAL'];
        let selectedFilter:string = filters[0];
        let openModal:boolean = false;

        function changeFilter() {
                if (selectedFilter !== 'All') {
                        traits = purimiveria_traits.filter((trait) => trait.category === selectedFilter);
                } else {
                        traits = purimiveria_traits;
                }
                selectedTrait = traits[0];
        }
        function addTrait() {
                characterStore.addTrait(selectedTrait);
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
                                                id="trait-filter"
                                        >
                                                {#each filters as filter (filter)}
                                                        <option value={filter} id={filter}>
                                                                {filter}
                                                        </option>
                                                {/each}
                                        </select>
                                </label>
                        </div>
                        <div class="trait-list">
                                {#each traits as trait, i}
                                        <ListRow other={i % 2 == 0}>
                                                <div class="trait-select" on:click={() => selectedTrait = trait}>
                                                        {trait.name}
                                                </div>
                                        </ListRow>
                                {/each}
                        </div>
                </div>
                <div class="content">
                        <h2 class="trait-header">
                                {selectedTrait.name}
                        </h2>
                        <div class="trait-description">
                                {selectedTrait.description}
                        </div>
                </div>
        </div>
        <button on:click={() => {toggleModal(); addTrait();}}>
                Add
        </button>
</Modal>
<button on:click={toggleModal}>
        Add Trait
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
        .trait-list {
                max-height: 48em;
                overflow-y: auto;
        }
        .trait-select {
                cursor: pointer;
        }
</style>
