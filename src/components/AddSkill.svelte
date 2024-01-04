<script lang="ts">
        import {characterStore} from '../character.ts';
        import {purimiveria_skills} from '../lib/libraries.ts';
        import type {Skill} from '../lib/libraries.ts';

        let selectedSkill:Skill = purimiveria_skills[0];
        let tagged:boolean = false;
        let specialization:string = '';

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
</script>

<label>
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
        Skill:
        <select
                bind:value={selectedSkill}
                on:change={() => specialization = ''}
        >
                {#each skills as skill (skill.id)}
                        <option value={skill}>
                                {skill.name}
                        </option>
                {/each}
        </select>
</label>
<label>
        Tagged:
        <input type="checkbox" bind:checked={tagged}>
</label>
{#if selectedSkill && selectedSkill.specialized}
<label>
        Specialization:
        <input bind:value={specialization}>
</label>
{/if}
<button on:click={addSkill}>
        Add
</button>
