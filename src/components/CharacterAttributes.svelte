<script lang="ts">
        import {characterStore} from '../character.ts';
        const {
                agility,
                agilityExp,
                body,
                bodyExp,
                mind,
                mindExp,
                spirit,
                spiritExp,
                strength,
                strengthExp,
                attributePoints,
                specie,
        } = characterStore;
        import Table from './shared/Table.svelte';
        import TableHeader from './shared/TableHeader.svelte';
        import TableRow from './shared/TableRow.svelte';
</script>

<div class:decrease={$attributePoints < 0}>
        Attribute points left: {$attributePoints}
</div>

<Table>
        <TableHeader>
                <div class="attribute-cell">
                        Name
                </div>
                <div class="attribute-cell">
                        Total Value
                </div>
                <div class="attribute-cell">
                        Specie Value
                </div>
                <div class="attribute-cell">
                        Allotted Value
                </div>
                <div class="attribute-cell">
                        Experience Spent
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.resetAttributes() }>Reset</button>
                </div>
        </TableHeader>
        <TableRow underRequirement={($agility + $specie.attribute_modifiers.agility) < 0 || ($agility + $specie.attribute_modifiers.agility) > $specie.attribute_caps.agility}>
                <div class="attribute-cell name">
                        Agility
                </div>
                <div class="attribute-cell">
                        {$agility + $specie.attribute_modifiers.agility}
                </div>
                <div class="attribute-cell">
                        {$specie.attribute_modifiers.agility}
                </div>
                <div class="attribute-cell">
                        {$agility}
                </div>
                <div class="attribute-cell">
                        {-($agilityExp)}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseAgility() }>+</button>
                        <button disabled={$agility < 1} on:click={() => characterStore.decreaseAgility() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow underRequirement={($body + $specie.attribute_modifiers.body) < 0 || ($body + $specie.attribute_modifiers.body) > $specie.attribute_caps.body}>
                <div class="attribute-cell name">
                        Body
                </div>
                <div class="attribute-cell">
                        {$body + $specie.attribute_modifiers.body}
                </div>
                <div class="attribute-cell">
                        {$specie.attribute_modifiers.body}
                </div>
                <div class="attribute-cell">
                        {$body}
                </div>
                <div class="attribute-cell">
                        {-($bodyExp)}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseBody() }>+</button>
                        <button disabled={$body < 1} on:click={() => characterStore.decreaseBody() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow underRequirement={($mind + $specie.attribute_modifiers.mind) < 0 || ($mind + $specie.attribute_modifiers.mind) > $specie.attribute_caps.mind}>
                <div class="attribute-cell name">
                        Mind
                </div>
                <div class="attribute-cell">
                        {$mind + $specie.attribute_modifiers.mind}
                </div>
                <div class="attribute-cell">
                        {$specie.attribute_modifiers.mind}
                </div>
                <div class="attribute-cell">
                        {$mind}
                </div>
                <div class="attribute-cell">
                        {-($mindExp)}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseMind() }>+</button>
                        <button disabled={$mind < 1} on:click={() => characterStore.decreaseMind() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow underRequirement={($spirit + $specie.attribute_modifiers.spirit) < 0 || ($spirit + $specie.attribute_modifiers.spirit) > $specie.attribute_caps.spirit}>
                <div class="attribute-cell name">
                        Spirit
                </div>
                <div class="attribute-cell">
                        {$spirit + $specie.attribute_modifiers.spirit}
                </div>
                <div class="attribute-cell">
                        {$specie.attribute_modifiers.spirit}
                </div>
                <div class="attribute-cell">
                        {$spirit}
                </div>
                <div class="attribute-cell">
                        {-($spiritExp)}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseSpirit() }>+</button>
                        <button disabled={$spirit < 1} on:click={() => characterStore.decreaseSpirit() } class="decrease">-</button>
                </div>
        </TableRow>
        <TableRow underRequirement={($strength + $specie.attribute_modifiers.strength) < 0 || ($strength + $specie.attribute_modifiers.strength) > $specie.attribute_caps.strength}>
                <div class="attribute-cell name">
                        Strength
                </div>
                <div class="attribute-cell">
                        {$strength + $specie.attribute_modifiers.strength}
                </div>
                <div class="attribute-cell">
                        {$specie.attribute_modifiers.strength}
                </div>
                <div class="attribute-cell">
                        {$strength}
                </div>
                <div class="attribute-cell">
                        {-($strengthExp)}
                </div>
                <div class="attribute-cell">
                        <button on:click={() => characterStore.increaseStrength() }>+</button>
                        <button disabled={$strength < 1} on:click={() => characterStore.decreaseStrength()} class="decrease">-</button>
                </div>
        </TableRow>
</Table>

<style>
        .decrease {
                color: red;
        }
        .attribute-cell {
                display: table-cell;
                padding: 5px 10px;
        }
        .name {
                text-align: left;
        }
</style>
