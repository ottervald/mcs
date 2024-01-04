<script lang="ts">
  import CharacterInfo from './CharacterInfo.svelte'
  import CharacterAttributes from './CharacterAttributes.svelte'
  import CharacterDerivedStats from './CharacterDerivedStats.svelte'
  import CharacterSkills from './CharacterSkills.svelte'
  import CharacterTraits from './CharacterTraits.svelte'
  import CharacterInventory from './CharacterInventory.svelte'
  import CharacterWeapons from './CharacterWeapons.svelte'
  import CharacterArmours from './CharacterArmours.svelte'
  import CharacterShields from './CharacterShields.svelte'
</script>

<div class="header">
        <CharacterInfo />
</div>
<div>
        <CharacterAttributes />
</div>
<div>
        <CharacterDerivedStats />
</div>
<div>
        <CharacterSkills />
</div>
<div>
        <CharacterTraits />
</div>
<div>
        <CharacterArmours />
</div>
<div>
        <CharacterShields />
</div>
<div>
        <CharacterWeapons />
</div>
<div>
        <CharacterInventory />
</div>

<style>
        .header {
                position: sticky;
                top: 0px;
                background-color: white;
                padding-top: 20px;
                padding-bottom: 20px;
                margin-bottom: 10px;
                border-bottom: black 1px solid;
        }
        @media (prefers-color-scheme: dark) {
                .header {
                        background-color: black;
                        border-bottom: gray 1px solid;
                }
        }
</style>
