<script lang="ts">
    import { onMount } from "svelte";
    import { Table } from "sveltestrap";

    let richmen = [];

    async function getRichmen() {
        console.log("Recopilando datos de personas ricas...");
        const res = await fetch("/richmen");

        if (res.ok) {
            console.log("OK.");
            const json = await res.json();
            richmen = json;
            console.log(`Tenemos ${richmen.length} richmen`);
        } else {
            console.log("Error!");
        }
    }

    onMount(getRichmen);
</script>

<main>
    <Table bordered>
        <thead>
            <tr>
                <td>Top</td>
                <td>Name</td>
                <td>Fortune</td>
                <td>Age</td>
                <td>Country</td>
                <td>Year</td>
                <td>Company</td>
            </tr>
        </thead>
        <tbody>
            {#each richmen as richman}
                <tr>
                    <td>{richman.top}</td>
                    <td>{richman.name}</td>
                    <td>{richman.fortune}</td>
                    <td>{richman.age}</td>
                    <td>{richman.country}</td>
                    <td>{richman.year}</td>
                    <td>{richman.company}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>

<style>
</style>
