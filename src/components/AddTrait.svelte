<script lang="ts">
        import {characterStore} from '../character.ts';
        import {purimiveria_traits} from '../lib/traits/traits.ts';
        import type {Trait} from '../lib/traits/traits.ts';

        let traits:Trait[] = purimiveria_traits;
        let selectedTrait:Trait = purimiveria_traits[0];
        let filters:string[] = ['All', 'Mundane', 'Expertise', 'Magical & Supernatural', 'Conjury Sphere', 'Allies & Companions', 'Starting Equipment', 'MEGA SPECIAL'];
        let selectedFilter:string = filters[0];

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
                Trait:
                <select
                        bind:value={selectedTrait}
                >
                        {#each traits as trait (trait.id)}
                                <option value={trait}>
                                        {trait.name}
                                </option>
                        {/each}
                </select>
        </label>
        <button on:click={addTrait}>
                Add
        </button>
        <div class="description">
                {selectedTrait.description}
        </div>
</div>

<style>
        .description {
                margin: 0 auto;
                overflow-wrap: break-word;
                width: 400px;
        }
</style>
