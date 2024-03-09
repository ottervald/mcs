<script lang="ts">
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
        import {characterStore} from '../character.ts';
        const {
                initiative,
                physicalSoak,
                energySoak,
                passiveMeleeDefense,
                passiveRangedDefense,
                passiveMagicResistance,
                manaMax,
                manaBaseRecovery,
                vitalityColumns,
                vitalityBaseRecovery,
                willpowerColumns,
                willpowerBaseRecovery,
                carryBase,
                carryLight,
                carryMedium,
                carryHeavy,
                carryMax,
                maxTrinkets
        } = characterStore;

        let visible:boolean = false;
</script>
{#if visible}
        <button on:click={() => visible = !visible}>Hide Derived Stats</button>
{:else}
        <button on:click={() => visible = !visible}>Show Derived Stats</button>
{/if}

{#if visible}
<Table>
        <TableHeader>
                <div class="attribute-cell">
                        Name
                </div>
                <div class="attribute-cell">
                        Value
                </div>
        </TableHeader>
        <TableRow other={true}>
                <div class="attribute-cell name">
                        Initiative
                </div>
                <div class="attribute-cell">
                        {$initiative}
                </div>
        </TableRow>
        <TableRow>
                <div class="attribute-cell name">
                        Physical Soak
                </div>
                <div class="attribute-cell">
                        {$physicalSoak}
                </div>
        </TableRow>
        <TableRow other={true}>
                <div class="attribute-cell name">
                        Energy Soak
                </div>
                <div class="attribute-cell">
                        {$energySoak}
                </div>
        </TableRow>
        <TableRow>
                <div class="attribute-cell name">
                        Passive Melee Defense
                </div>
                <div class="attribute-cell">
                        {$passiveMeleeDefense}
                </div>
        </TableRow>
        <TableRow other={true}>
                <div class="attribute-cell name">
                        Passive Ranged Defense
                </div>
                <div class="attribute-cell">
                        {$passiveRangedDefense}
                </div>
        </TableRow>
        <TableRow>
                <div class="attribute-cell name">
                        Passive Magic Resistance
                </div>
                <div class="attribute-cell">
                        {$passiveMagicResistance}
                </div>
        </TableRow>
        <TableRow other={true}>
                <div class="attribute-cell name">
                        Mana Max
                </div>
                <div class="attribute-cell">
                        {$manaMax}
                </div>
        </TableRow>
        <TableRow>
                <div class="attribute-cell name">
                        Mana Base Recovery
                </div>
                <div class="attribute-cell">
                        {$manaBaseRecovery}
                </div>
        </TableRow>
        <TableRow other={true}>
                <div class="attribute-cell name">
                        Vitality Columns
                </div>
                <div class="attribute-cell">
                        {$vitalityColumns}
                </div>
        </TableRow>
        <TableRow>
                <div class="attribute-cell name">
                        Vitality Base Recovery
                </div>
                <div class="attribute-cell">
                        {$vitalityBaseRecovery}
                </div>
        </TableRow>
        <TableRow other={true}>
                <div class="attribute-cell name">
                        Willpower Columns
                </div>
                <div class="attribute-cell">
                        {$willpowerColumns}
                </div>
        </TableRow>
        <TableRow>
                <div class="attribute-cell name">
                        Willpower Base Recovery
                </div>
                <div class="attribute-cell">
                        {$willpowerBaseRecovery}
                </div>
        </TableRow>
        <TableRow other={true}>
                <div class="attribute-cell name">
                        Carry Base
                </div>
                <div class="attribute-cell">
                        {$carryBase}
                </div>
        </TableRow>
        <TableRow>
                <div class="attribute-cell name">
                        Carry Light
                </div>
                <div class="attribute-cell">
                        {$carryLight}
                </div>
        </TableRow>
        <TableRow other={true}>
                <div class="attribute-cell name">
                        Carry Medium
                </div>
                <div class="attribute-cell">
                        {$carryMedium}
                </div>
        </TableRow>
        <TableRow>
                <div class="attribute-cell name">
                        Carry Heavy
                </div>
                <div class="attribute-cell">
                        {$carryHeavy}
                </div>
        </TableRow>
        <TableRow other={true}>
                <div class="attribute-cell name">
                        Carry Max
                </div>
                <div class="attribute-cell">
                        {$carryMax}
                </div>
        </TableRow>
        <TableRow>
                <div class="attribute-cell name">
                        Max Trinkets
                </div>
                <div class="attribute-cell">
                        {$maxTrinkets}
                </div>
        </TableRow>
</Table>
{/if}

<style>
        .attribute-cell {
                display: table-cell;
                padding: 5px 10px;
        }
        .name {
                text-align: left;
        }
</style>
