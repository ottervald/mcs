<script lang="ts">
        import Modal from './shared/Modal.svelte'
        import ListRow from './shared/ListRow.svelte';
        import {characterStore} from '../character.ts';
        import {purimiveria_traits} from '../lib/traits/traits.ts';
        import type {Trait} from '../lib/traits/traits.ts';

        let traits:Trait[] = purimiveria_traits;
        let selectedTrait:Trait = purimiveria_traits[0];
        let filters:string[] = ['All', 'Mundane', 'Expertise', 'Magical & Supernatural', 'Conjury Sphere', 'Grimoire Spell', 'Allies & Companions','Contacts & Factions' , 'Starting Equipment', 'MEGA SPECIAL'];
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
                                                <button class="trait-select" on:click={() => selectedTrait = trait}>
                                                        {trait.name}
                                                </button>
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
                        <div class="trait-cost">Cost: {selectedTrait.cost} exp{#if selectedTrait.levels}&nbsp;per level{/if}</div>
                        <div class="trait-requirements">
                                <h4>Requirements</h4>
                                <h5>Attributes</h5>
                                <div class="attribute-container">
                                        <div class="attribute-row">
                                                <div class="attribute-cell name">Dexterity:</div>
                                                <div class="attribute-cell">{selectedTrait.requirements.attributes.dexterity}</div>
                                        </div>
                                        <div class="attribute-row">
                                                <div class="attribute-cell name">Body:</div>
                                                <div class="attribute-cell">{selectedTrait.requirements.attributes.body}</div>
                                        </div>
                                        <div class="attribute-row">
                                                <div class="attribute-cell name">Mind:</div>
                                                <div class="attribute-cell">{selectedTrait.requirements.attributes.mind}</div>
                                        </div>
                                        <div class="attribute-row">
                                                <div class="attribute-cell name">Spirit:</div>
                                                <div class="attribute-cell">{selectedTrait.requirements.attributes.spirit}</div>
                                        </div>
                                        <div class="attribute-row">
                                                <div class="attribute-cell name">Strength:</div>
                                                <div class="attribute-cell">{selectedTrait.requirements.attributes.strength}</div>
                                        </div>
                                </div>
                                {#if selectedTrait.requirements.traits.length > 0}
                                        <h5>Traits</h5>
                                        <div class="attribute-container">
                                                {#each selectedTrait.requirements.traits as trait, i}
                                                        <div class="attribute-row" class:other={i % 2 == 0}>
                                                                <div class="attribute-cell name">{trait.name}:</div>
                                                                <div class="attribute-cell">{trait.minimumValue}</div>
                                                        </div>
                                                {/each}
                                        </div>
                                {/if}
                                {#if selectedTrait.requirements.skills.length > 0}
                                        <h5>Skills</h5>
                                        <div class="attribute-container">
                                                {#each selectedTrait.requirements.skills as skill, i}
                                                        <div class="attribute-row" class:other={i % 2 == 0}>
                                                                <div class="attribute-cell name">{skill.name}:</div>
                                                                <div class="attribute-cell">{skill.minimumValue}</div>
                                                        </div>
                                                {/each}
                                        </div>
                                {/if}
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
        .trait-list {
                max-height: calc(100% - 5em);
                overflow-y: auto;
        }
        .trait-select {
                width: 100%;
                background: none;
                color: inherit;
                border: none;
                padding: 0;
                font: inherit;
                cursor: pointer;
                outline: inherit;
        }
        .trait-description {
                white-space: pre-line;
        }
        .trait-cost {
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
