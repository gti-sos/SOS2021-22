<script>
    import {
        Nav,
        NavItem,
        NavLink,
        Button,
        Table,
        UncontrolledAlert,
    } from "sveltestrap";

    let richmen = [];
    let error = null;

    const botonCargar = () => {
        loadRichmen();
    };

    const botonBorrar = () => {
        deleteRichmen();
    };

    async function loadRichmen() {
        console.log("Loading richmen");
        const res = await fetch("api/v1/richpp/loadInitialData").then(function (res) {
            if (res.ok) {
                console.log("Ok");
                getRichmen();
            } else {
                error = 404;
                console.log("Error");
            }
        });
    }

    async function getRichmen() {
        console.log("Fetching richmen...");
        const res = await fetch("api/v1/richpp/");

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
        const res = await fetch("api/v1/richpp", {
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
    h2 {
        text-align: center;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>
