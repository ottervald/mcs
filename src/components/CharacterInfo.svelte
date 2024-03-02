<script lang="ts">
        import {characterStore} from '../character.ts';
        import {purimiveria_species} from '../lib/libraries.ts';
        const { player, name, title, specie, totalExperience, characterExperience } = characterStore;
        const export_character = () => {
                var file_name = 'mcs_character.json';
                if ($name) {
                        file_name = $name + '.json';
                }
                const to_download = characterStore.stringify();
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(to_download));
                element.setAttribute('download', file_name);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
        }
        const open_file_dialog = () => {
                document.getElementById('import-file').click();
        }
        const read_file = async (file) => {
                return new Promise((resolve, reject) => {
                        const fileReader = new FileReader()
                        fileReader.onload = event => resolve(event.target.result)
                        fileReader.onerror = error => reject(error)
                        fileReader.readAsText(file)
                })
        }
        const start_import = async (event) => {
                const import_character = await read_file(event.target.files[0]);
                characterStore.importCharacter(import_character);
                document.getElementById('import-file').value = '';
        }
        const experience_levels = ['Default', 'Established', 'Experienced', 'Veteran'];
</script>
<div>
        <input on:change={start_import} id="import-file" type="file" accept=".json, text/json" hidden/>
        <button on:click={open_file_dialog} class="import-export">Import</button>
        <button on:click={export_character} class="import-export">Export</button>
</div>

<label>
        Player:
        <input bind:value={$player} id="player-name">
</label>
<label>
        Name:
        <input bind:value={$name} id="character-name">
</label>
<label>
        Title:
        <input bind:value={$title} id="character-title">
</label>
<label>
        Specie:
        <select
                bind:value={$specie}
                id="ancestry-select"
        >
                {#each purimiveria_species as specie (specie.id)}
                        <option value={specie} id={specie.id}>
                                {specie.name}
                        </option>
                {/each}
        </select>
</label>
<label>
        Experience:
        <select
                bind:value={$characterExperience}
                id="experience-select"
        >
                {#each experience_levels as experience}
                        <option value={experience} id={experience}>
                                {experience}
                        </option>
                {/each}
        </select>
</label>
<div>
        Experience: {$totalExperience}
</div>

<style>
        .import-export {
                margin: 10px 10px;
        }
</style>
