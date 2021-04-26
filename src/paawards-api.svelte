<script>
    import {Nav,
            NavItem,
            NavLink,
        Button,
        Table,
        UncontrolledAlert} from "sveltestrap";

       const botonCargar = () => {
        loadPaawards();
    };
    const botonBorrar = () => {
        deletePaawards();
    };     
    let paawards = [];
    let error = null;
    async function loadPaawards() {
        console.log("Loading paawards");
        const res = await fetch("api/v1/paawards/loadInitialData").then(function (res) {
            if (res.ok) {
                console.log("Ok");
                getPaawards();
            } 
            else {
                error = 404;
                console.log("Error");
            }
        });
    }
    async function getPaawards() {
        console.log("Fetching paawards");
        const res = await fetch("api/v1/paawards/");
        if (res.ok) {
            console.log("Ok");
            const json = await res.json();
            paawards = json;
            console.log(`We have received ${paawards.length} resources.`);
        } else {
            console.log("Error");
        }
    }
    async function deletePaawards() {
        console.log("Deleting data...");
        const res = await fetch("api/v1/paawards", {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                paawards = [];
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
            <NavLink href="#" on:click={botonCargar}>Cargar paawards</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="#" on:click={botonBorrar}>Borrar paawards</NavLink>
        </NavItem>
    </Nav>
    <h2>PAAWARDS</h2>
    <Table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Year</td>
                <td>Sport</td>
                <td>Country</td>
                <td>Age</td>
                <td>Gender</td>
                <td>Trophy</td>
            </tr>
        </thead>
        <tbody>
            {#each paawards as paaward}
                <tr>
                    <td>{paaward.name}</td>
                    <td>{paaward.year}</td>
                    <td>{paaward.sport}</td>
                    <td>{paaward.country}</td>
                    <td>{paaward.age}</td>
                    <td>{paaward.gender}</td>
                    <td>{paaward.trophy}</td>
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