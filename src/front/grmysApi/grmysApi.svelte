<script>
    import {Nav,
            NavItem,
            NavLink,
            Button,
            Table,
            UncontrolledAlert,
	    Alert,
            Pagination, 
            PaginationItem, 
            PaginationLink,
            Form,
            FormGroup,
            FormText,
            Input,
            Label} from "sveltestrap";
      
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import { get } from "svelte/store";
   
       const botonCargar = () => {
        loadGrmys();
    };
    const botonBorrar = () => {
        deleteGrmys();
    };   
    let isOpen=false;  
    let visible=false;
    let pag = 1;
    let datos=5;
    let color = "danger";
    let grmys = [];
    let newGrmys = {
		ranking: "",
		name: "",
		award:"",
		country:"",
		groupmember:"",
        style:"",
        year:""

	}
    let error = null;
    let errorMSG="";
    let okMSG="";
    onMount(getGrmys);

    ////////////////////////funciones///////////////////////////////////////
    async function loadGrmys() {
        console.log("Loading Grmys");
        const res = await fetch("api/v1/grmys/loadInitialData").then(function (res) {
            if (res.ok) {
                console.log("Ok");
                color = "success";
                okMSG = "Datos cargados correctamente";
                getGrmys();
            } 
            else {
                error = 404;
                errorMSG="Los datos no se han cargado correctamente"
                console.log("Error");
            }
        });
    }
    async function getGrmys() {
        console.log("Fetching Grmys");
        const res = await fetch("api/v1/grmys?limit=5&offset=1");
        if (res.ok) {
            console.log("Ok");
            const json = await res.json();
            grmys = json;
            console.log(`We have received ${grmys.length} resources.`);
        } else {
            console.log("Error");
        }
    }
    async function insertGrmys(){
        
	     if (newGrmys.country == "" || newGrmys.country == null || newGrmys.year == "" || newGrmys.year == null) {
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch("/api/v1/grmys",{
             method:"POST",
             body:JSON.stringify(newGrmys),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 201){
                     getGrmys();
                     console.log("Dato introducido");
                     color = "success";
                     okMSG="Entrada introducida correctamente a la base de datos";
                 }
                 else if(res.status == 400){
                     console.log("ERROR Data was not correctly introduced");
                     color = "danger";
                     errorMSG= "Los datos de la entrada no fueron introducidos correctamente";
                 }
                 else if(res.status == 409){
                     console.log("ERROR There is already a data with that country and year in the da tabase");
                     color = "danger";
                     errorMSG= "Ya existe una entrada en la base de datos con la fecha y el país introducido";
                 }
             });	
         }
     }
     async function deleteGrmysdata(country, year) {
        console.log(`Deleting data with name ${country} and date ${year}`);
        const res = await fetch("/api/v1/grmys/" + country + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            getGrmys();      
            if (res.status==200) {
                errorMSG="";
                okMSG = "Recurso borrado correctamente";
                console.log("Deleted " + year);   
                getGrmys();          
            }else{
                 if (res.status==404) {
                errorMSG = "No se ha encontrado el objeto" + year;
                console.log("grmys NOT FOUND");            
            } else {
                errorMSG= res.status + ": " + res.statusText;
                console.log("ERROR!");
            } 
            okMsg = "";
        }     
        });
    }
    async function deleteGrmys() {
        console.log("Deleting data...");
        const res = await fetch("api/v1/grmys", {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                okMSG = "Recursos borrado correctamente";
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
    <Alert color={color} >
        {#if errorMSG}
        <p style="color: red">ERROR: {errorMSG}</p>
        {/if}
        {#if okMSG}
        <p style="color: green">{okMSG}</p>
        {/if}
    </Alert>
    
    
    <Table bordered>
        <thead>
            <tr>
                <td>clasificacion</td>
                <td>Nombre</td>
                <td>Premios</td>
                <td>Pais</td>
                <td>Miembros</td>
                <td>Estilo</td>
                <td>Año</td>
                <td>Acciones</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={newGrmys.ranking}></td>
                <td><input bind:value={newGrmys.name}></td>
                <td><input bind:value={newGrmys.award}></td> 
                <td><input bind:value={newGrmys.country}></td>    
                <td><input bind:value={newGrmys.groupmember}></td>  
                <td><input bind:value={newGrmys.style}></td> 
                <td><input bind:value={newGrmys.year}></td>   
                <td><Button outline color="primary" on:click={insertGrmys}>Insertar</Button></td>           
            </tr>
            {#each grmys as gramy}
                <tr>
                    <td>{gramy.ranking}</td>
                    <td>{gramy.name}</td>
                    <td>{gramy.award}</td>
                    <td>{gramy.country}</td>
                    <td>{gramy.groupmember}</td>
                    <td>{gramy.style}</td>
                    <td>{gramy.year}</td>
                    <td><Button outline color="danger" on:click={deleteGrmysdata(gramy.country,gramy.year)}>Borrar</Button></td>
                        <td>
                            <a href="#/grmys/{gramy.name}">
                             <Button color="primary">Editar</Button>
                            </a>
                        </td> 
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