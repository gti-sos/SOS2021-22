<script>
    import { onMount } from "svelte";

    import {
        Nav,
        NavItem,
        NavLink,
        Button,
        Table,
        UncontrolledAlert,
    } from "sveltestrap";

    export let params = {};
    let richman = [];
    let updateTop = "X";
    let updateName = "X";
    let updateFortune = "X";
    let updateAge = "X";
    let updateCountry = "X";
    let updateYear = "X";
    let updateCompany = "X";

    const BASE_API_PATH = "/api/v1";

    onMount(getRichman);

    async function getRichman() {
        console.log("Fetching richman...");
        const res = await fetch(BASE_API_PATH + "/richpp/" + params.name);

        if (res.ok) {
            console.log("OK.");
            const json = await res.json();
            richman = json;
            updateTop = richman.top;
            updateName = richman.name;
            updateFortune = richman.fortune;
            updateAge = richman.age;
            updateCountry = richman.country;
            updateYear = richman.year;
            updateCompany = richman.company;
            console.log(`Received richman`);
        } else {
            console.log("Error!");
        }
    }

    async function updateRichman() {
        console.log("Updating richman..." + JSON.stringify(params.name));
        const res = await fetch(BASE_API_PATH + "/richpp/" + params.name, {
            method: "PUT",
            body: JSON.stringify({
                top: updateTop,
                name: params.name,
                fortune: updateFortune,
                age: updateAge,
                country: updateCountry,
                year: updateYear,
                company: updateCompany,
            }),
            headers: { "Content-Type": "application/json" },
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                getRichman();
            } else {
                console.log("Error");
            }
        });
    }
</script>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/#/richpp/">Volver</NavLink>
        </NavItem>
    </Nav>

    <h3>Editar Richman <strong>{params.name}</strong></h3>

    <Table bordered>
        <thead>
            <tr>
                <td>Clasificación</td>
                <td>Nombre</td>
                <td>Fortuna</td>
                <td>Edad</td>
                <td>País</td>
                <td>Año</td>
                <td>Empresa</td>
                <td>Acciones</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{updateTop}"></td>
                <td>{updateName}</td>
                <td><input bind:value="{updateFortune}"></td>
                <td><input bind:value="{updateAge}"></td>
                <td><input bind:value="{updateCountry}"></td>
                <td><input bind:value="{updateYear}"></td>
                <td><input bind:value="{updateCompany}"></td>
                <td>
                    <Button outline color="primary" on:click={updateRichman}>Actualizar</Button>
                </td>
            </tr>
        </tbody>
    </Table>
    
</main>
<style>

</style>
