<script>
    import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
   
    export let params = {};
    let grmys = [];
    
    let UDranking = "XXXX";
    let UDname = "XXXX";
    let UDawards = "9999";
    let UDcountry = "xxxx";
    let UDgroupmember = "99";
    let UDstyle = "xxxx";
    let UDyear = "99";
    
    const BASE_API_PATH = "/api/v2";
    let errorMsg = "";
    let okMsg = "";
    onMount(getGrmys);

    async function getGrmys() {
        console.log("Fetching stat..." + params.ranking + " " + params.name);
      const res = await fetch(BASE_API_PATH + 
        "/grmys/" + params.ranking +"/" + params.name
      );
      if (res.ok) {
        console.log("Ok:");
        
        const json = await res.json();
        grmys = json;
        UDranking = grmys.ranking;
        UDname = grmys.name;
        UDawards = grmys["award"];
        UDcountry = grmys["country"];
        UDgroupmember = grmys["groupmember"];
        UDstyle=grmys["style"];
        UDyear=grmys["year"];
        console.log("Received grmys.");
        
      } else {
        if(res.status===404){
            errorMsg = "No se encuentra el dato solicitado";
          }else if(res.status ===500){
            errorMsg = "No se han podido acceder a la base de datos";
          }        
          okMsg = "";
          console.log("ERROR!" + errorMsg);
      }
    }
    async function updateGrmys() {
        console.log("Updating grmys..." + JSON.stringify(params.ranking)+JSON.stringify(params.name));
        
  const res = await fetch(BASE_API_PATH +"/grmys/" + params.ranking + "/" + params.name, {
      method: "PUT",
      body: JSON.stringify({
          ranking: params.ranking,
          name: params.name,
          award:UDawards,
          country: UDcountry,
          groupmember: UDgroupmember,
          style:UDstyle,
          year:UDyear
      }),
      headers: {
          "Content-Type": "application/json"
      }
  }).then(function (res) {
    if (res.ok) {
        console.log("OK");
        getGrmys();
        errorMsg = "";
        okMsg = "Operación realizada correctamente";
      } else {
        if(res.status===409){
          errorMsg = "El dato ya se encuentra cargado";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }else if(res.status ===404){
          errorMsg = "No se han encontrado el dato solicitado";
        }        
        okMsg = "";
        getGrmys();
        console.log("ERROR!" + errorMsg);
      }
  });
    }
    
  </script>
  
  <main>
    <Nav>
      <NavItem>
        <NavLink href="#/grmys">Volver</NavLink>
      </NavItem>
    </Nav>
  
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
         <td><input bind:value="{UDranking}"></td>
                <td>{params.name}</td>
                <td><input bind:value="{UDawards}" size="10"></td>
                <td><input bind:value="{UDcountry}" size="10"></td>
                <td><input bind:value="{UDgroupmember}" size="10"></td>
                <td><input bind:value="{UDstyle}" size="10"></td>
                <td><input bind:value="{UDyear}" size="10"></td>
                <td>
                    <Button outline color="primary" on:click={updateGrmys}>Actualizar</Button>
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
  </style>