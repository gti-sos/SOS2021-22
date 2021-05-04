<script>
    import {Nav,
            NavItem,
            NavLink,
            Button,
            Table,
            Modal,
            ModalBody,
            ModalFooter,
            ModalHeader,
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
    
    
    //Paginacion
    let current_offset = 0;
    let limit = 10;
    let current_page = 1;
    let last_page = 1;
    let total = 0;


    let datos=5;
    
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
    const BASE_API_PATH = "/api/v2";
    let error = null;
    let errorMSG="";
    let okMSG="";
    

    ////////////////////////funciones///////////////////////////////////////
    async function loadGrmys() {
        console.log("Loading Grmys");
        const res = await fetch(BASE_API_PATH+"/grmys/loadInitialData").then(function (res) {
            if (res.ok) {
                console.log("Ok");
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
    async function getNumTotal() {
      const res = await fetch(BASE_API_PATH + "/grmys");
      if (res.ok) {
        const json = await res.json();
        total = json.length;
        console.log("getTOTAL: " + total);
        changePage(current_page, current_offset);
      } else {
        errorMSG = "No se han encontrado datos.";
      }
    }
    function range(size, startAt = 0) {
      return [...Array(size).keys()].map((i) => i + startAt);
    }
    function changePage(page, offset) {
      console.log("------Change page------");
      console.log("Params page: " + page + " offset: " + offset);
      last_page = Math.ceil(total / 10);
      console.log("new last page: " + last_page);
      if (page !== current_page) {
        console.log("enter if");
        current_offset = offset;
        current_page = page;
        console.log("page: " + page);
        console.log("current_offset: " + current_offset);
        console.log("current_page: " + current_page);
        getGrmys();
      }
      
    }
    async function getGrmys() {
        console.log("Fetching Grmys");
        const res = await fetch(BASE_API_PATH+"/grmys?limit=" +
          limit +"&offset=" + current_offset);
        if (res.ok) {
            console.log("Ok");
            const json = await res.json();
            grmys = json;
            console.log(`We have received ${grmys.length} resources.`);
            getNumTotal();
        } else {
            console.log("Error");
        }
    }
    async function insertGrmys(){
        
	     if (newGrmys.country == "" || newGrmys.country == null || newGrmys.year == "" || newGrmys.year == null) {
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch(BASE_API_PATH+"/grmys",{
             method:"POST",
             body:JSON.stringify(newGrmys),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 201){
                     getGrmys();
                     console.log("Dato introducido");
                     okMSG="Entrada introducida correctamente a la base de datos";
                 }
                 else if(res.status == 400){
                     console.log("ERROR Data was not correctly introduced");
                     errorMSG= "Los datos de la entrada no fueron introducidos correctamente";
                 }
                 else if(res.status == 409){
                     console.log("ERROR There is already a data with that country and year in the da tabase");
                     errorMSG= "Ya existe una entrada en la base de datos con los mismos datos";
                 }
             });	
         }
     }
     async function deleteGrmysdata(country, year) {
        console.log(`Deleting data with name ${country} and date ${year}`);
        const res = await fetch(BASE_API_PATH + "/grmys/" + country + "/" + year, {
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
        const res = await fetch( BASE_API_PATH+"/grmys", {
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
    onMount(getGrmys);
    
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
    
        {#if errorMSG}
        <p style="color: red">ERROR: {errorMSG}</p>
        {/if}
        {#if okMSG}
        <p style="color: green">{okMSG}</p>
        {/if}
    
    
    
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
                <td>Acciones</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={newGrmys.ranking} size="10"></td>
                <td><input bind:value={newGrmys.name} size="10"></td>
                <td><input bind:value={newGrmys.award} size="10"></td> 
                <td><input bind:value={newGrmys.country} size="10"></td>    
                <td><input bind:value={newGrmys.groupmember} size="10"></td>  
                <td><input bind:value={newGrmys.style} size="10"></td> 
                <td><input bind:value={newGrmys.year} size="10"></td>   
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
                            <a href="#/grmys/{gramy.ranking}/{gramy.name}">
                             <Button color="primary">Editar</Button>
                            </a>
                        </td> 
                </tr>
            {/each}
        </tbody>
        <Pagination ariaLabel="Web pagination">
            <PaginationItem class={current_page === 1 ? "disabled" : ""}>
              <PaginationLink
                previous
                href="#/grmys"
                on:click={() => changePage(current_page - 1, current_offset - 10)}
              />
            </PaginationItem>
            {#each range(last_page, 1) as page}
              <PaginationItem class={current_page === page ? "active" : ""}>
                <PaginationLink
                  previous
                  href="#/grmys"
                  on:click={() => changePage(page, (page - 1) * 10)}
                  >{page}</PaginationLink
                >
              </PaginationItem>
            {/each}
            <PaginationItem class={current_page === last_page ? "disabled" : ""}>
              <PaginationLink
                next
                href="#/grmys"
                on:click={() => changePage(current_page + 1, current_offset + 10)}
              />
            </PaginationItem>
          </Pagination>
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