# Proyecto método aggregate

Base de datos con el proyecto final sobre el método aggregate.

El proyecto consta de una carpeta SRC donde se concentra lo importante como es el Insert basado en tiendas de tecno
gía y sus consultas donde se saca a relucir todas las operaciones realizadas en clase. Además se ha realizado una carpeta
doc con el manual de mongo Atlas y las explicación de mi proyecto y sus consultas. En datos está el uso de mongoimport y mongoexport
tanto en local como en la nube

- [x] Inserts
- [x] Consultas
- [x] AportaciónPersonal

## Datos del creador 👁️‍🗨️

_Datos del creador:_

Miguel Reyes, 20 años y de Sevilla, pertenezco al grupo de primer año de administración de redes y sistemas.


### Comandos Básicos utilizados 📋

_Estos son algunos_

```
use prueba: Cambia la base de datos activa y la crea en el caso de que no esté.
db.prueba.insertOne({nombre: "Miguel"}): Añade el documento a la colección prueba que la crea en el caso de no existir
db.prueba.insertMany([]): Añade varios documentos a la vez
db.prueba.aggregate(): Trata sobre operadores de etapa
```

### Operadores Mínimos 📋

_Estos son todos_

```
- $sum              
- $avg            
- $divide              
- $multiply              
- $project          
- $max  
- $group
- $lookup
- $out
- $subtract
- $match
- $sort
- $push
- $count
```