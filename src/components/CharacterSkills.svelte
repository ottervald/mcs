<script lang="ts">
        import AddSkill from './AddSkill.svelte'
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
        import {characterStore} from '../character.ts';
        const {characterSkills, nativeLanguage, nativeLanguageBaseLevel, skillExperience} = characterStore;

        let visible:boolean = false;
</script>
{#if visible}
        <button on:click={() => visible = !visible}>Hide Skills</button>
{:else}
        <button on:click={() => visible = !visible}>Show Skills</button>
{/if}

{#if visible}
        <h2>Skills</h2>
        <div>
                Skill experience points left: {$skillExperience}
        </div>
<Table>
        <TableHeader>
                <div class="skill-cell">
                        <button on:click={() => characterStore.resetSkillExperience() }>Reset</button>
                </div>
                <div class="skill-cell">
                        Name
                </div>
                <div class="skill-cell">
                        Level
                </div>
                <div class="skill-cell">
                        Cost
                </div>
                <div class="skill-cell">
                        Tagged
                </div>
        </TableHeader>
        <TableRow>
                <div class="skill-cell">
                        Native Language
                </div>
                <div class="skill-cell name">
                        <input bind:value={$nativeLanguage}>
                </div>
                <div class="skill-cell">
                        {$nativeLanguageBaseLevel}
                </div>
                <div class="skill-cell">
                </div>
                <div class="skill-cell">
                </div>
                <div class="skill-cell">
                        <button disabled={true} on:click={() => characterStore.increaseNativeLanguage() }>+</button>
                        <button disabled={true} on:click={() => characterStore.decreaseNativeLanguage() } class="decrease">-</button>
                </div>
        </TableRow>
        {#each $characterSkills as skill, i}
                <TableRow other={i % 2 == 0}>
                        <div class="skill-cell">
                                <button on:click={() => characterStore.removeSkill(skill, i) }>Remove</button>
                        </div>
                        <div class="skill-cell name">
                                {skill.skill.name}{#if skill.skill.specialized} ({skill.specialization}){/if}
                        </div>
                        <div class="skill-cell">
                                {skill.level}
                        </div>
                        <div class="skill-cell">
                                {skill.cost}
                        </div>
                        <div class="skill-cell">
                                {skill.tagged}
                        </div>
                        <div class="skill-cell">
                                <button disabled={skill.level > 9} on:click={() => characterStore.increaseSkill(skill, i) }>+</button>
                                <button disabled={skill.level < 1} on:click={() => characterStore.decreaseSkill(skill, i) } class="decrease">-</button>
                        </div>
                </TableRow>
        {/each}
</Table>
<AddSkill />
{/if}

<style>
        .decrease {
                color: red;
        }
        .skill-cell {
                display: table-cell;
                padding: 5px 10px;
        }
        .name {
                text-align: left;
        }
</style>
