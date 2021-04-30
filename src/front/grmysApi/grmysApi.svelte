<script>
    import {Nav,
            NavItem,
            NavLink,
        Button,
        Table,
        UncontrolledAlert} from "sveltestrap";

       const botonCargar = () => {
        loadGrmys();
    };
    const botonBorrar = () => {
        deleteGrmys();
    };     
    let grmys = [];
    let error = null;
    async function loadGrmys() {
        console.log("Loading Grmys");
        const res = await fetch("api/v1/grmys/loadInitialData").then(function (res) {
            if (res.ok) {
                console.log("Ok");
                getGrmys();
            } 
            else {
                error = 404;
                console.log("Error");
            }
        });
    }
    async function getGrmys() {
        console.log("Fetching Grmys");
        const res = await fetch("api/v1/grmys/");
        if (res.ok) {
            console.log("Ok");
            const json = await res.json();
            grmys = json;
            console.log(`We have received ${grmys.length} resources.`);
        } else {
            console.log("Error");
        }
    }
    async function deleteGrmys() {
        console.log("Deleting data...");
        const res = await fetch("api/v1/grmys", {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                grmys = [];
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
            <NavLink href="#" on:click={botonCargar}>Cargar Gramys</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="#" on:click={botonBorrar}>Borrar Gramys</NavLink>
        </NavItem>
    </Nav>
    <h2>GRAMYS</h2>
    <Table>
        <thead>
            <tr>
                <td>clasificacion</td>
                <td>Nombre</td>
                <td>Premios</td>
                <td>Pais</td>
                <td>Miembros</td>
                <td>Estilo</td>
                <td>Año</td>
            </tr>
        </thead>
        <tbody>
            {#each grmys as gramy}
                <tr>
                    <td>{gramy.ranking}</td>
                    <td>{gramy.name}</td>
                    <td>{gramy.award}</td>
                    <td>{gramy.country}</td>
                    <td>{gramy.groupmember}</td>
                    <td>{gramy.style}</td>
                    <td>{gramy.year}</td>
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