<script>
    import { onMount } from "svelte";

    import {
        Nav,
        NavItem,
        NavLink,
        Button,
        Table,
    } from "sveltestrap";

    export let params = {};
    let richman = [];
    let updateTop = "X";
    let updateName = "XXXX";
    let updateFortune = "XXX";
    let updateAge = "XX";
    let updateCountry = "XXXXXXXX";
    let updateYear = "XXXX";
    let updateCompany = "XXXXXX";

    const BASE_API_PATH = "/api/v2";
    let errorMsg = false;
    let okMsg = false;
    
    const botonActualizar = () => {
        updateRichman();
    }

    async function getRichman() {
        console.log("Fetching richman..." + params.name + " " + params.year);
        const res = await fetch(
            BASE_API_PATH + "/richpp/" + params.name
        );

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
            if (res.status === 404) {
                okMsg = false;
                errorMsg = "No se encuentra el dato solicitado";
            } else if (res.status === 500) {
                okMsg = false;
                errorMsg = "No se han podido acceder a la base de datos";
            }
            okMsg = false;
            console.log("ERROR!" + errorMsg);
        }
    }

    async function updateRichman() {
        console.log(
            "Updating richman..." +
                JSON.stringify(params.name) +
                JSON.stringify(params.year)
        );
        const res = await fetch(
            BASE_API_PATH + "/richpp/" + params.name + "/" + params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                    top: updateTop,
                    name: updateName,
                    fortune: updateFortune,
                    age: updateAge,
                    country: updateCountry,
                    year: updateYear,
                    company: updateCompany,
                }),
                headers: { "Content-Type": "application/json" },
            }
        ).then(function (res) {
            if (res.ok) {
                console.log("OK");
                getRichman();
                errorMsg = false;
                okMsg = "Operación realizada correctamente";
            } else {
                if (res.status === 409) {
                    okMsg = false;
                    errorMsg = "El dato ya se encuentra cargado";
                } else if (res.status === 500) {
                    okMsg = false;
                    errorMsg = "No se han podido acceder a la base de datos";
                } else if (res.status === 404) {
                    okMsg = false;
                    errorMsg = "No se han encontrado el dato solicitado";
                }
                okMsg = false;
                getRichman();
                console.log("ERROR!" + errorMsg);
            }
        });
    }
    
    onMount(getRichman);
</script>

<main>
    <Nav>
        <NavItem>
            <NavLink id="nav-back" href="/#/richpp/">Volver</NavLink>
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
                <td><input bind:value={updateTop} size="10"/></td>
                <td>{params.name}</td>
                <td><input bind:value={updateFortune} size="10"/></td>
                <td><input bind:value={updateAge} size="10"/></td>
                <td><input bind:value={updateCountry} size="10"/></td>
                <td><input bind:value={updateYear} size="10"/></td>
                <td><input bind:value={updateCompany} size="10"/></td>
                <td>
                    <Button outline color="primary" on:click={botonActualizar}>Actualizar</Button>
                </td>
            </tr>
        </tbody>
    </Table>

    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
        <p style="color: green">{okMsg}</p>
    {/if}
</main>

<style>
    main{
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    h3 {
        color: red;
        text-align: center;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>
