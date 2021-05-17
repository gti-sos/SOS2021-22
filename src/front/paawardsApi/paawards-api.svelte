<script>
    //Imports svelte
    import { onMount } from "svelte";
    import {Nav,NavItem,NavLink,Button,Table,Pagination,PaginationItem,PaginationLink} from "sveltestrap";

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
    
    //Variables paawards
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

    //Variables busqueda
    let searchCountry = "";
    let searchYear = "";

    //Variables paginación
    let current_offset = 0;
    let limit = 10;
    let current_page = 1;
    let last_page = 1;
    let total = 0;

    //Variables errores
    let errorMessage = "";
    let okMessage = "";

    //Funcion para cargar paawards
    async function loadPaawards() {
        if(paawards.length==0){
            console.log("Loading paawards");
            const res = await fetch("api/v1/paawards/loadInitialData").then(function (res) {
                if (res.ok) {
                    console.log("Ok");
                    okMessage = "Paawards cargados correctamente";
                    getPaawards();
                } 
                else {
                    error = 404;
                    console.log("Error");
                    errorMessage = "Paawards no han podido ser cargados correctamente";
                }
            });
        }
    }
    
    //Funcion para obtener paawards
    async function getPaawards() {
            console.log("Fetching paawards");
            const res = await fetch("api/v1/paawards?offset="+current_offset+"&limit="+limit);
            if (res.ok) {
                console.log("Ok");
                const json = await res.json();
                paawards = json;
                getNumTotal();
                console.log(`We have received ${paawards.length} resources.`);
            } else {
                console.log("Error");
            }
            
    }
    onMount(getPaawards);

    //Funcion para borrar todos los paawards
    async function deletePaawards() {
        console.log("Deleting paaward...");
        const res = await fetch("api/v1/paawards", {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                okMessage = "Paawards borrados correctamente";
                getPaawards();
            } else {
                console.log("Error");
                errorMessage = "No han podido ser borrados los Paawards";
            }
        });
    }

    //Funcion para insertar un paaward
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
            if(res.status == 201){
                console.log("OK");
                paawards.push(newPaaward);
                getPaawards();
                okMessage = `${newPaaward.name} ha sido insertado correctamente`;
            }
            else if(res.status == 400){
                console.log("Paaward is not well built");
                errorMessage = "Los datos introducidos son erroneos";
            }
            else if(res.status == 409) {
                console.log("Paaward already exist");
                errorMessage = "Los datos introducidos ya existen en la base de datos";
            }
        });
    }

    //Funcion para borrar un paaward
    async function deletePaaward(paaward) {
        console.log(`Deleting paaward whose country is ${paaward.country} and year is ${paaward.year}`);
        const res = await fetch("api/v1/paawards/"+paaward.country+"/"+paaward.year, {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("OK");
                okMessage = "Paaward borrado correctamente";
                getPaawards();
            } else {
                console.log("Error");
                errorMessage = "Paaward no ha podido ser borrado correctamente";
            }
        });
    }

    async function searchPaawards(country,year){
        console.log("Searching paawards: "+country+" and "+year);
		
		var url = "api/v1/paawards";
		if (country != "" && year != "") {
			url = url + "?country=" +country+ "&year=" + year; 
		} else if (country != "" && year == "") {
			url = url + "?country=" + country;
		} else if (country == "" && year != "") {
			url = url + "?year=" + year;
		}
		const res = await fetch(url);
		if (res.ok) {
			console.log("OK");
			const json = await res.json();
			paawards = json;
            if(country=="" && year==""){
                errorMessage = "Introduzca un pais o un año para buscar";
            }
            else if (paawards.length == 0){
                errorMessage = "No se han encontrado paawards con los parametros de busqueda indicados";
            }
            else {
                okMessage = `Se han encontrado ${paawards.length} paawards`;
            }	
			console.log("Were found " + paawards.length + " paawards");
		} else {
			console.log("ERROR");
            errorMessage = "No se han encontrado paawards";
		}
    }

    //Funciones Paginación
    async function getNumTotal() {
      const res = await fetch("api/v1/paawards");
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
        getPaawards();
      }
      
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

    {#if errorMessage}
        <p style="color: red">ERROR: {errorMessage}</p>
    {/if}
    {#if okMessage}
        <p style="color: green">{okMessage}</p>
    {/if}
    <h2>PAAWARDS</h2>
    <Table bordered>
        <thead>
            <tr>
                <td>Busqueda por pais:</td>
                <td>Busqueda por año:</td>
                <td>Buscar:</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{searchCountry}"></td>
                <td><input bind:value="{searchYear}"></td>
                <td>
                    
                    <Button on:click="{searchPaawards(searchCountry,searchYear)}">Buscar</Button>
                    <Button href="javascript:location.reload()">Restaurar</Button>
                </td>
            </tr>
        </tbody>

    </Table>

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
                <td><input bind:value="{newPaaward.name}"></td>
                <td><input bind:value="{newPaaward.year}"></td>
                <td><input bind:value="{newPaaward.sport}"></td>
                <td><input bind:value="{newPaaward.country}"></td>
                <td><input bind:value="{newPaaward.age}"></td>
                <td><input bind:value="{newPaaward.gender}"></td>
                <td><input bind:value="{newPaaward.trophy}"></td>
                <td><Button on:click={botonInsertar}>Insertar</Button></td>
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
    <Pagination ariaLabel="Web pagination">
        <PaginationItem class={current_page === 1 ? "disabled" : ""}>
          <PaginationLink
            previous
            href="#/paawards"
            on:click={() => changePage(current_page - 1, current_offset - 10)}
          />
        </PaginationItem>
        {#each range(last_page, 1) as page}
          <PaginationItem class={current_page === page ? "active" : ""}>
            <PaginationLink
              previous
              href="#/paawards"
              on:click={() => changePage(page, (page - 1) * 10)}
              >{page}</PaginationLink
            >
          </PaginationItem>
        {/each}
        <PaginationItem class={current_page === last_page ? "disabled" : ""}>
          <PaginationLink
            next
            href="#/paawards"
            on:click={() => changePage(current_page + 1, current_offset + 10)}
          />
        </PaginationItem>
      </Pagination>
</main>

<style>
    h2 {
        text-align: center;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>