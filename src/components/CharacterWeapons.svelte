<script lang="ts">
        import {characterStore} from '../character.ts';
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
        const {weapons, strength, specie} = characterStore;

        let visible:boolean = false;
</script>
{#if visible}
        <button on:click={() => visible = !visible}>Hide Weapons</button>
{:else}
        <button on:click={() => visible = !visible}>Show Weapons</button>
{/if}

{#if visible}
        <h2>Weapons</h2>
<Table>
        <TableHeader>
                <div class="weapon-cell">
                        Name
                </div>
                <div class="weapon-cell">
                        Strength
                </div>
                <div class="weapon-cell">
                        Weapon Damage
                </div>
                <div class="weapon-cell">
                        Total Damage
                </div>
                <div class="weapon-cell">
                        Damage Type
                </div>
                <div class="weapon-cell">
                        Reach
                </div>
                <div class="weapon-cell">
                        Strength Requirement
                </div>
                <div class="weapon-cell">
                        Sturdiness
                </div>
                <div class="weapon-cell">
                        Size
                </div>
        </TableHeader>
        {#each $weapons as weapon, i}
                {#each weapon.attacks as attack, j}
                        <TableRow title={weapon.description} underRequirement={($strength + $specie.attribute_modifiers.strength) < attack.strength_requirement} other={i % 2 == 0 && ($strength + $specie.attribute_modifiers.strength) >= attack.strength_requirement} >
                                <div class="weapon-cell name">
                                        {weapon.name}
                                </div>
                                <div class="weapon-cell">
                                        {$strength + $specie.attribute_modifiers.strength}
                                </div>
                                <div class="weapon-cell">
                                        {attack.damage}
                                </div>
                                <div class="weapon-cell">
                                        {$strength + $specie.attribute_modifiers.strength + attack.damage}
                                </div>
                                <div class="weapon-cell">
                                        {attack.damage_modifier}
                                </div>
                                <div class="weapon-cell">
                                        {attack.reach}
                                </div>
                                <div class="weapon-cell">
                                        {attack.strength_requirement}{#if attack.two_handed}*{/if}
                                </div>
                                <div class="weapon-cell">
                                        {weapon.sturdiness}
                                </div>
                                <div class="weapon-cell">
                                        {weapon.size}
                                </div>
                        </TableRow>
                {/each}
        {/each}
</Table>
{/if}

<style>
        .weapon-cell {
                display: table-cell;
                max-width: 25em;
                padding: 5px 10px;
        }
        .name {
                text-align: left;
        }
</style>
