<script>
    import {
        Nav,
        NavItem,
        NavLink,
        Button,
        Table,
        UncontrolledAlert,
    } from "sveltestrap";

    export let params = {};
    let richmen = [];
    let newRichman = {
        top: "",
        name: "",
        fortune: "",
        age: "",
        country: "",
        year: "",
        company: "",
    };
    let error = null;

    const BASE_API_PATH = "/api/v1";

    const botonInsertar = () => {
        insertRichman();
    };

    const botonCargar = () => {
        loadRichmen();
    };

    const botonBorrar = () => {
        deleteRichmen();
    };

    async function insertRichman() {
        console.log("Inserting data...");
        const res = await fetch(BASE_API_PATH + "/richpp", {
            method: "POST",
            body: JSON.stringify(newRichman),
            headers: { "Content-Type": "application/json" },
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                getRichmen();
            } else {
                console.log("Error");
            }
        });
    }

    async function loadRichmen() {
        console.log("Loading richmen");
        const res = await fetch(BASE_API_PATH + "/richpp/loadInitialData").then(
            function (res) {
                if (res.ok) {
                    console.log("Ok");
                    getRichmen();
                } else {
                    error = 404;
                    console.log("Error");
                }
            }
        );
    }

    async function getRichmen() {
        console.log("Fetching richmen...");
        const res = await fetch(BASE_API_PATH + "/richpp/");

        if (res.ok) {
            console.log("OK.");
            const json = await res.json();
            richmen = json;
            console.log(`We have received ${richmen.length} richmen`);
        } else {
            console.log("Error!");
        }
    }

    async function deleteRichmen() {
        console.log("Deleting data...");
        const res = await fetch(BASE_API_PATH + "/richpp", {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                richmen = [];
            } else {
                console.log("Error");
            }
        });
    }

    async function deleteRichman(name) {
        console.log("Deleting richman with name " + params.name);
        const res = await fetch(BASE_API_PATH + "/richpp/" + params.name, {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                getRichmen();
            } else {
                console.log("Error");
            }
        });
    }

</script>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/">Volver</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="#" on:click={botonCargar}>Cargar richmen</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="#" on:click={botonBorrar}>Borrar richmen</NavLink>
        </NavItem>
    </Nav>

    <h2>RICHPP</h2>

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
                <td><input bind:value="{newRichman.top}"/></td>
                <td><input bind:value="{newRichman.name}"/></td>
                <td><input bind:value="{newRichman.fortune}"/></td>
                <td><input bind:value="{newRichman.age}"/></td>
                <td><input bind:value="{newRichman.country}"/></td>
                <td><input bind:value="{newRichman.year}"/></td>
                <td><input bind:value="{newRichman.company}"/></td>
                <td><Button on:click={botonInsertar}>Insertar</Button></td>
            </tr>
            {#each richmen as richman}
                <tr>
                    <td>{richman.top}</td>
                    <td><a href="#/richman/{richman.name}">{richman.name}</a></td>
                    <td>{richman.fortune}</td>
                    <td>{richman.age}</td>
                    <td>{richman.country}</td>
                    <td>{richman.year}</td>
                    <td>{richman.company}</td>
                    <td><Button on:click={deleteRichman(params.name)}>Borrar</Button></td>
                </tr>
            {/each}
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
