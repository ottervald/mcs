<script lang="ts">
        import Modal from './shared/Modal.svelte'
        import ListRow from './shared/ListRow.svelte';
        import {characterStore} from '../character.ts';
        import {purimiveria_skills} from '../lib/libraries.ts';
        import type {Skill} from '../lib/libraries.ts';

        let selectedSkill:Skill = purimiveria_skills[0];
        let tagged:boolean = false;
        let specialization:string = '';
        let openModal:boolean = false;

        let skills:Skill[] = purimiveria_skills;
        let filters:string[] = ['All', 'Combat', 'Magic', 'Misc', 'Social', 'Specialized'];
        let selectedFilter:string = filters[0];
        function changeFilter() {
                if (selectedFilter !== 'All') {
                        skills = purimiveria_skills.filter((skill) => skill.category === selectedFilter);
                } else {
                        skills = purimiveria_skills;
                }
                selectedSkill = skills[0];
                specialization = '';
        }
        function addSkill() {
                characterStore.addSkill(selectedSkill, tagged, specialization);
                specialization = '';
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
                                                id="skill-filter"
                                        >
                                                {#each filters as filter (filter)}
                                                        <option value={filter} id={filter}>
                                                                {filter}
                                                        </option>
                                                {/each}
                                        </select>
                                </label>
                        </div>
                        <div class="skill-list">
                                {#each skills as skill, i}
                                        <ListRow other={i % 2 == 0}>
                                                <div class="skill-select" on:click={() => {specialization = ''; selectedSkill = skill;}}>
                                                        {skill.name}
                                                </div>
                                        </ListRow>
                                {/each}
                        </div>
                </div>
                <div class="content">
                        <h2 class="skill-header">
                                {selectedSkill.name}
                        </h2>
                        <div class="skill-description">
                                {selectedSkill.description}
                        </div>
                </div>
        </div>
        <div>
                <label>
                        Tagged:
                        <input type="checkbox" bind:checked={tagged} id="selected-skill-tagged">
                </label>
                {#if selectedSkill && selectedSkill.specialized}
                        <label>
                                Specialization:
                                <input bind:value={specialization} id="selected-skill-specialization">
                        </label>
                {/if}
        </div>
        <button on:click={() => { toggleModal(); addSkill(); }}>
                Add
        </button>
</Modal>
<button on:click={toggleModal}>
        Add Skill
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
        .skill-list {
                max-height: 48em;
                overflow-y: auto;
        }
        .skill-select {
                cursor: pointer;
        }
</style>
