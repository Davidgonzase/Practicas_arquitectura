Endpints disponibles:<br>
"/api/getTardis" obtiene tardis<br>
"/api/getpersons" obtiene gente<br>
"/api/getdimensions" obtiene dimensiones<br>
"/api/getplanets" obtiene planetas<br>
"/api/newtardis" nuevo tardis<br>
"/api/newdimension" nueva dimension<br>
"/api/newplanet" nuevp planeta<br>
"/api/newperson" nueva persona<br>
"/api/deleteperson/:id" borrar persona<br>
"/api/deletetardis/:id" borrar tardis<br>
"/api/deleteplanet/:id" borrar planetas<br>
"/api/deletedimension/:id" borrar dimensiones<br>
"/api/updatetardis/:id" modifica tardis<br>
"/api/updatedimension/:id" modifica dimension<br>
"/api/updateplanet/:id" modifica planeta<br>
"/api/updateperson/:id", modifica persona <br>

Formatos:<br>
Crear tardis<br>
{<br>
    "camuflaje":"",<br>
    "regen_num":,<br>
    "año":<br>
}<br>
Modificar tardis<br>
{<br>
    ?"camuflaje":"",<br>
    ?"regen_num":,<br>
    ?"año":<br>
    ?"dimensiones":<br>
}<br>
Crear dimensiones<br>
{<br>
    "nombre":"",<br>
    "id_tardis":,<br>
}<br>
Modificar dimensiones<br>
{<br>
    ?"nombre":"",<br>
    ?"planetas":,<br>
}<br>

Crear planetas<br>
{<br>
    "nombre":"",<br>
    "id_dimension":,<br>
}<br>
Modificar planetas<br>
{<br>
    ?"nombre":"",<br>
    ?"personas":,<br>
}<br>

Crear persona<br>
{<br>
    "nombre":"",<br>
    "id_planeta":,<br>
}<br>
Modificar persona<br>
{<br>
    ?"nombre":"",<br>
}<br>
