<script>
    import { onMount } from "svelte";

    import {
        Nav,
        NavItem,
        NavLink,
        Button,
        Table,
        Modal,
        ModalBody,
        ModalFooter,
        ModalHeader,
        Alert,
        UncontrolledAlert,
        Pagination,
        PaginationItem,
        PaginationLink,
        Form,
        FormGroup,
        FormText,
        Input,
        Label,
    } from "sveltestrap";

    let richpp = [];
    let newRichman = {
        top: "",
        name: "",
        fortune: "",
        age: "",
        country: "",
        year: "",
        company: "",
    };

    const botonInsertar = () => {
        insertRichman();
    };

    const botonCargar = () => {
        loadRichmen();
    };

    const botonBorrar = () => {
        deleteRichmen();
    };

    //Paginacion
    let current_offset = 0;
    let limit = 10;
    let current_page = 1;
    let last_page = 1;
    let total = 0;
    let offset = 0;
    let datos = 5;
    let busqueda = false;

    const BASE_API_PATH = "/api/v2";
    let error = null;
    let errorMSG = "";
    let okMSG = "";
    let actualTop = "";
    let actualName = "";
    let searchRichman = {
        top: "",
        name: "",
        fortune: "",
        age: "",
        country: "",
        year: "",
        company: "",
    };

    //  FUNCIONES
    async function loadRichmen() {
        console.log("Loading richmen");
        const res = await fetch(BASE_API_PATH + "/richpp/loadInitialData").then(
            function (res) {
                if (res.status == 200) {
                    console.log("Ok");
                    getRichmen();
                } else {
                    error = 404;
                    console.log("Error");
                }
            }
        );
    }

    async function getNumTotal() {
        const res = await fetch(BASE_API_PATH + "/richpp");
        if (res.status == 200) {
            const json = await res.json();
            total = json.length;
            console.log("TOTAL: " + total);
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
            getRichmen();
        }
    }

    async function getRichmen() {
        console.log("Fetching richmen...");
        const res = await fetch(
            BASE_API_PATH +
                "/richpp?limit=" +
                limit +
                "&offset=" +
                current_offset
        );
        if (res.status == 200) {
            const json = await res.json();
            richpp = json;
            console.log("Datos cargados");
            console.log(`We have received ${richpp.length} resources.`);
            getNumTotal();
        } else {
            console.log("Error");
        }
    }

    async function insertRichman() {
        console.log("Inserting data...");
        if (
            newRichman.country == "" ||
            newRichman.country == null ||
            newRichman.year == "" ||
            newRichman.year == null
        ) {
            errorMSG = "Los campos 'Pais' y 'Año' no pueden estar vacios";
        } else {
            const res = await fetch(BASE_API_PATH + "/richpp", {
                method: "POST",
                body: JSON.stringify(newRichman),
                headers: { "Content-Type": "application/json" },
            }).then(function (res) {
                if (res.status == 200) {
                    console.log("Datos insertados correctamente");
                    getRichmen();
                    okMSG = `La entrada del grupo ${newRichman.name} ha sido insertado correctamente`;
                } else if (res.status == 400) {
                    console.log("ERROR Data was not correctly introduced");
                    errorMSG = "Los datos de la entrada no fueron introducidos correctamente";
                } else if (res.status == 409) {
                    console.log("ERROR There is already a data with that country and year in the da tabase");
                    errorMSG = "Ya existe una entrada en la base de datos con los mismos datos";
                }
            });
        }
    }

    async function deleteRichman(richman) {
        console.log(`Deleting richman with name ${richman.name} and year ${richman.year}`);
        const res = await fetch(
            BASE_API_PATH + "/richpp/" + richman.name + "/" + richman.year,
            {
                method: "DELETE",
            }
        ).then(function (res) {
            getRichmen();
            if (res.status == 200) {
                errorMSG = "";
                okMSG = "Recurso borrado correctamente";
                console.log("Deleted " + richman.name);
                getRichmen();
            } else {
                if (res.status === 404) {
                    errorMSG = "No se ha encontrado el objeto " + richman.name + " en " + richman.year;
                    console.log("Richman NOT FOUND");
                } else {
                    errorMSG = res.status + ": " + res.statusText;
                    console.log("ERROR!");
                }
                okMsg = "";
            }
        });
    }

    async function deleteRichmen() {
        console.log("Deleting data...");
        const res = await fetch(BASE_API_PATH + "/richpp", {
            method: "DELETE",
        }).then(function (res) {
            if (res.status == 200) {
                okMSG = "Recursos borrado correctamente";
                console.log("Todo borrado");
                richpp = [];
            } else {
                if (res.status === 404) {
                    errorMSG = "No existen datos que borrar";
                } else if (res.status === 500) {
                    errorMSG = "No se ha podido acceder a la base de datos";
                }
                okMsg = "";
                console.log("ERROR!" + errorMSG);
            }
        });
    }

    async function searchRichmen(top, name) {
        var url = "/api/v2/richpp";
        if (top != "" && name != "") {
            url = url + "?top=" + top + "&name=" + name;
        } else if (top != "" && name == "") {
            url = url + "?top=" + top;
        } else if (top == "" && name != "") {
            url = url + "?name=" + name;
        }
        const res = await fetch(url);
        if (res.status == 200) {
            const json = await res.json();
            richpp = json;
            if (name == "" && top == "") {
                errorMSG = "Introduce datos para iniciar la busqueda";
            } else if (richpp.length > 0) {
                okMSG = "SE HA ENCONTRADO UNO O VARIOS RESULTADOS";
            } else {
                okMSG = "NO SE HA ENCONTRADO RESULTADOS";
            }
        } else {
            console.log("ERROR");
            if (res.status) {
                errorMSG = "NO SE HA ENCONTRADO RESULTADOS";
            }
        }
    }

    onMount(getRichmen);
</script>

<main>
    <Nav>
        <NavItem>
            <Button outline color="secondary" href="/">Volver</Button>
        </NavItem>
        <NavItem>
            <NavLink href="#" on:click={botonCargar}>Cargar Richmen</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="#" on:click={botonBorrar}>Borrar Richmen</NavLink>
        </NavItem>
    </Nav>

    <h2>RICHPP</h2>

    {#if errorMSG}
        <p style="color: red">ERROR: {errorMSG}</p>
    {/if}
    {#if okMSG}
        <p style="color: green">{okMSG}</p>
    {/if}

    <Table bordered>
        <tbody>
            <tr>
                <td>
                    <FormGroup style="width:50%;">
                        <Label>Búsqueda por Top:</Label>
                        <Input
                            type="text"
                            name="selectTop"
                            id="selectTop"
                            bind:value={actualTop}
                        />
                    </FormGroup>
                </td>
                <td>
                    <FormGroup style="width:50%;">
                        <Label>Búsqueda por Nombre</Label>
                        <Input
                            type="text"
                            name="selectName"
                            id="selectName"
                            bind:value={actualName}
                        />
                    </FormGroup>
                </td>
                <td>
                    <div style="text-align:center; padding-bottom: 3%; margin-top: 3%;">
                        <Button
                            outline
                            color="primary"
                            on:click={searchRichmen(actualTop, actualName)}
                            class="button-search">
                            Buscar
                        </Button>
                        <Button
                            outline
                            color="secondary"
                            href="javascript:location.reload()">
                            Volver
                        </Button>
                    </div>
                </td>
            </tr>
        </tbody>
    </Table>

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
                <td><input bind:value={newRichman.top} size="10" /></td>
                <td><input bind:value={newRichman.name} size="10" /></td>
                <td><input bind:value={newRichman.fortune} /></td>
                <td><input bind:value={newRichman.age} size="10" /></td>
                <td><input bind:value={newRichman.country} size="10" /></td>
                <td><input bind:value={newRichman.year} size="10" /></td>
                <td><input bind:value={newRichman.company} size="10" /></td>
                <td>
                    <Button outline color="primary" on:click={botonInsertar}>Insertar</Button>
                </td>
            </tr>
            {#each richpp as richman}
                <tr>
                    <td>{richman.top}</td>
                    <td><a href="#/richpp/{richman.name}/{richman.year}">{richman.name}</a></td>
                    <td>{richman.fortune}</td>
                    <td>{richman.age}</td>
                    <td>{richman.country}</td>
                    <td>{richman.year}</td>
                    <td>{richman.company}</td>
                    <td>
                        <Button
                            outline
                            color="danger"
                            on:click={deleteRichman(richman)}>
                            Borrar
                        </Button>
                    
                        <a href="#/richpp/{richman.name}/{richman.year}">
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
                    href="#/richpp"
                    on:click={() =>
                        changePage(current_page - 1, current_offset - 10)}
                />
            </PaginationItem>
            {#each range(last_page, 1) as page}
                <PaginationItem class={current_page === page ? "active" : ""}>
                    <PaginationLink
                        previous
                        href="#/richpp"
                        on:click={() => changePage(page, (page - 1) * 10)}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            {/each}
            <PaginationItem class={current_page === last_page ? "disabled" : ""}>
                <PaginationLink
                    next
                    href="#/richpp"
                    on:click={() =>
                        changePage(current_page + 1, current_offset + 10)}/>
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
