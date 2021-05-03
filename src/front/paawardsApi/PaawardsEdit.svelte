<script>
    import { onMount } from "svelte";
    import {Nav,NavItem,NavLink,Button,Table} from "sveltestrap";
    export let params = {};
    let paaward = [];
    let updateName = "";
    let updateYear = "";
    let updateSport = "";
    let updateCountry = "";
    let updateAge = "";
    let updateGender = "";
    let updateTrophy = "";

    const botonActualizar = () => {
        updatePaaward();
    };

    async function getPaaward() {
        console.log("Fetching paaward");
        const res = await fetch("api/v1/paawards/" + params.country+"/"+params.year);
        if (res.ok) {
            console.log("OK");
            const json = await res.json();
            paaward = json;
            updateName = paaward.name;
            updateYear = paaward.year;
            updateSport = paaward.sport;
            updateCountry = paaward.country;
            updateAge = paaward.age;
            updateGender = paaward.gender;
            updateTrophy = paaward.trophy;
        } else {
            console.log("Error");
        }
    }
    onMount(getPaaward);

    async function updatePaaward() {
        console.log("Updating paaward");
        const res = await fetch("api/v1/paawards/" + params.country+"/"+params.year, {
            method: "PUT",
            body: JSON.stringify({
                name:updateName,
                year:updateYear,
                sport:updateSport,
                country:updateCountry,
                age:updateAge,
                gender:updateGender,
                trophy:updateTrophy
            }),
            headers: { "Content-Type": "application/json" },
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                getPaaward();
            } else {
                console.log("Error");
            }
        });
    }


</script>

<main>
    <Nav>
        <NavItem>
            <NavLink href="#/paawards">Volver</NavLink>
        </NavItem>
    </Nav>

    <h2>Editar Paaward: {updateName}</h2>

    <Table bordered>
        <thead>
            <tr>
                <td>Nombre</td>
                <td>Año</td>
                <td>Deporte</td>
                <td>Pais</td>
                <td>Edad</td>
                <td>Genero</td>
                <td>Trofeos</td>
                <td>Acciones</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{updateName}"></td>
                <td><input bind:value="{updateYear}"></td>
                <td><input bind:value="{updateSport}"></td>
                <td><input bind:value="{updateCountry}"></td>
                <td><input bind:value="{updateAge}"></td>
                <td><input bind:value="{updateGender}"></td>
                <td><input bind:value="{updateTrophy}"></td>
                <td><Button on:click={botonActualizar}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>
</main>

<style>
    h2 {
        text-align: center;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>