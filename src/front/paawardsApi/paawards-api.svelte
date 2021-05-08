<script>
    //Imports svelte
    import { onMount } from "svelte";
    import {Nav,NavItem,NavLink,Button,Table} from "sveltestrap";

    //Botones
    const botonCargar = () => {
        loadPaawards();
    };
    const botonBorrar = () => {
        deletePaawards();
    };  
    const botonInsertar = () => {
        insertPaaward();
    };
    const botonBuscar = () => {
        searchPaawards();
    };
    
    let paawards = [];
    let newPaaward = {
                        name: "",
                        year: "",
                        sport: "",
                        country: "",
                        age: "",
                        gender: "",
                        trophy: ""
                    };
    let error = null;
    async function loadPaawards() {
        if(paawards.length==0){
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
    onMount(getPaawards);
    async function deletePaawards() {
        console.log("Deleting paaward...");
        const res = await fetch("api/v1/paawards", {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                getPaawards();
            } else {
                console.log("Error");
            }
        });
    }

    async function insertPaaward(){
        console.log("Inserting paaward "+JSON.stringify(newPaaward));
        const res = await fetch("api/v1/paawards",
                    {
                        method : "POST",
                        body: JSON.stringify(newPaaward),
                        headers:{                               
                            "Content-Type": "application/json"
                        }
                    }
        ).then(function(res){
            if (res.ok) {
                console.log("OK");
                paawards.push(newPaaward);
                getPaawards();
            } else {
                console.log("Error");
            }
        });
    }

    async function deletePaaward(paaward) {
        console.log(`Deleting paaward whose country is ${paaward.country} and year is ${paaward.year}`);
        const res = await fetch("api/v1/paawards/"+paaward.country+"/"+paaward.year, {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                getPaawards();
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
                <td>Acciones 1</td>
                <td>Acciones 2</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{newPaaward.name}"></td>
                <td><input bind:value="{newPaaward.year}"></td>
                <td><input bind:value="{newPaaward.sport}"></td>
                <td><input bind:value="{newPaaward.country}"></td>
                <td><input bind:value="{newPaaward.age}"></td>
                <td><input bind:value="{newPaaward.gender}"></td>
                <td><input bind:value="{newPaaward.trophy}"></td>
                <td><Button on:click={botonInsertar}>Insertar</Button></td>
                <td><Button on:click={botonBuscar}>Buscar</Button></td>
            </tr>
            {#each paawards as paaward}
                <tr>
                    <td><a href="#/paawards/{paaward.country}/{paaward.year}">{paaward.name}</a></td>
                    <td>{paaward.year}</td>
                    <td>{paaward.sport}</td>
                    <td>{paaward.country}</td>
                    <td>{paaward.age}</td>
                    <td>{paaward.gender}</td>
                    <td>{paaward.trophy}</td>
                    <td><Button on:click={deletePaaward(paaward)}>Borrar</Button></td>
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