<script lang="ts">
        import {characterStore} from '../character.ts';
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
        const {armours} = characterStore;

        let visible:boolean = false;
</script>
{#if visible}
        <button on:click={() => visible = !visible}>Hide Armours</button>
{:else}
        <button on:click={() => visible = !visible}>Show Armours</button>
{/if}

{#if visible}
        <h2>Armours</h2>
        <Table>
                <TableHeader>
                        <div></div>
                        <div class="armour-header-cell">
                                Name
                        </div>
                        <div class="armour-header-cell">
                                Physical Protection
                        </div>
                        <div class="armour-header-cell">
                                Energy Protection
                        </div>
                        <div class="armour-header-cell">
                                Sturdiness
                        </div>
                        <div class="armour-header-cell">
                                Size
                        </div>
                </TableHeader>
                <TableRow>
                        <div class="armour-cell name">
                                Head
                        </div>
                        <div class="armour-cell name">
                                {$armours.head.name}
                        </div>
                        <div class="armour-cell">
                                {$armours.head.physical_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.head.energy_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.head.sturdiness}
                        </div>
                        <div class="armour-cell">
                                {$armours.head.size}
                        </div>
                </TableRow>
                <TableRow>
                        <div class="armour-cell name">
                                Torso
                        </div>
                        <div class="armour-cell name">
                                {$armours.torso.name}
                        </div>
                        <div class="armour-cell">
                                {$armours.torso.physical_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.torso.energy_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.torso.sturdiness}
                        </div>
                        <div class="armour-cell">
                                {$armours.torso.size}
                        </div>
                </TableRow>
                <TableRow>
                        <div class="armour-cell name">
                                Left Arm
                        </div>
                        <div class="armour-cell name">
                                {$armours.left_arm.name}
                        </div>
                        <div class="armour-cell">
                                {$armours.left_arm.physical_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.left_arm.energy_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.left_arm.sturdiness}
                        </div>
                        <div class="armour-cell">
                                {$armours.left_arm.size}
                        </div>
                </TableRow>
                <TableRow>
                        <div class="armour-cell name">
                                Right Arm
                        </div>
                        <div class="armour-cell name">
                                {$armours.right_arm.name}
                        </div>
                        <div class="armour-cell">
                                {$armours.right_arm.physical_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.right_arm.energy_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.right_arm.sturdiness}
                        </div>
                        <div class="armour-cell">
                                {$armours.right_arm.size}
                        </div>
                </TableRow>
                <TableRow>
                        <div class="armour-cell name">
                                Left Leg
                        </div>
                        <div class="armour-cell name">
                                {$armours.left_leg.name}
                        </div>
                        <div class="armour-cell">
                                {$armours.left_leg.physical_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.left_leg.energy_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.left_leg.sturdiness}
                        </div>
                        <div class="armour-cell">
                                {$armours.left_leg.size}
                        </div>
                </TableRow>
                <TableRow>
                        <div class="armour-cell name">
                                Right Leg
                        </div>
                        <div class="armour-cell name">
                                {$armours.right_leg.name}
                        </div>
                        <div class="armour-cell">
                                {$armours.right_leg.physical_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.right_leg.energy_protection}
                        </div>
                        <div class="armour-cell">
                                {$armours.right_leg.sturdiness}
                        </div>
                        <div class="armour-cell">
                                {$armours.right_leg.size}
                        </div>
                </TableRow>
        </Table>
{/if}

<style>
        .armour-header-cell {
                display: table-cell;
                max-width: 25em;
                padding: 5px 10px;
        }
        .armour-cell {
                display: table-cell;
                max-width: 25em;
                padding: 5px 10px;
                border-bottom: solid #bcbcbc 1px;
        }
        .name {
                text-align: left;
        }
</style>
