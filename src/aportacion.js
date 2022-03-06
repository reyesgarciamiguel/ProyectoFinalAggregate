/*Es la misma consulta que tenemos en las consultas dadas en clase pero lo añado aquí ya que tiene el operador
$limit como novedad */

db.tecnologia.aggregate(
  [
      {
          $unwind: {
            path: "$productos"
          }
      },
      {
          $group:
          {
              _id: { $year: "$fechaVenta" },
              PrecioProduccion: { $sum: {$multiply: ["$productos.precioProduccion", "$productos.unidadesVendidas"] } },
              Venta: {$sum: {$multiply: ["$productos.precioVenta", "$productos.unidadesVendidas"]}}
          }
      },
      {
          $project: {
              Año: "$_id",
              _id: 0,
              Beneficio: {$round: [{$subtract: ["$Venta","$PrecioProduccion"]}, 2]}
          }
      },
      {
          $sort:{
          Año:-1
          }
          
      },
      {
          $limit : 3
      }
      ]).pretty()

/* 
      { "Año" : 2022, "Beneficio" : 9765 }
      { "Año" : 2021, "Beneficio" : 2436.79 }
      { "Año" : 2020, "Beneficio" : 12273.36 }
*/


/*Primero ordena alfabeticamente y luego con $eq al grupo de empresas los identifica en la busqueda con un true y
los particulares con un false despues cuenta las empresas o particulares y muestra la primera y ultima empresa según el alfabeto */

db.tecnologia.aggregate([
  {
      $sort: {
      "comprador.nombre": 1
      }   
  },
  {
      $group: 
          {
              _id: {Empresa: { $eq: [ "$comprador.empresa", true] }},
              NumeroDeEmpresasoParti: {$sum: 1},
              PrimeraEmpresaoParti: {$first: "$comprador.nombre"},
              UltimaEmpresaoParti: {$last: "$comprador.nombre"}
          }
}]).pretty()


/*
  {
      "_id" : {
              "Empresa" : true
      },
      "NumeroDeEmpresasoParti" : 5,
      "PrimeraEmpresaoParti" : "Atlantic International Technology SA",
      "UltimaEmpresaoParti" : "Max and Henry SL"
}
{
      "_id" : {
              "Empresa" : false
      },
      "NumeroDeEmpresasoParti" : 5,
      "PrimeraEmpresaoParti" : "Lebron James",
      "UltimaEmpresaoParti" : "Perico González"
}

*/


/*Agrupa por las dos empresas existentes y crea con addtoset un array con todos los vendedores de cada tienda */


db.tecnologia.aggregate([
{
  $group: 
  {
      _id: "$empresaVendedora",
      personal: {$addToSet: "$vendedor"}
  }
},
  {
    $project: {
        Empresa: "$_id",
        _id: 0,
        personal: "$personal"
    }
},
]).pretty()

/*
{
        "Empresa" : "SevillaTec SL",
        "personal" : [
                "Paco Pálido",
                "Alberto Garzón",
                "Paco Sanz",
                "Amador Rivas"
        ]
}
{
        "Empresa" : "MalagaTec SL",
        "personal" : [
                "Curro Ramirez",
                "Enrique Pastor",
                "Miguel Reyes"
        ]
}
*/


/*Crea varios rango en este caso 5 cogiendo desde el producto mas barato hasta el mas caro y contabilizando cuantos productos hay en cada rango */


db.tecnologia.aggregate( [
  {
    $unwind: {
      path: "$productos"
    }
},

  {
    $bucketAuto: {
        groupBy: "$productos.precioVenta",
        buckets: 5
    }
  }
] ).pretty()


/*
  { "_id" : { "min" : 15.99, "max" : 20 }, "count" : 5 }
  { "_id" : { "min" : 20, "max" : 449 }, "count" : 5 }
  { "_id" : { "min" : 449, "max" : 529 }, "count" : 4 }
  { "_id" : { "min" : 529, "max" : 3251 }, "count" : 6 }
  { "_id" : { "min" : 3251, "max" : 3251 }, "count" : 1 }
*/



/*Basicamente segun el precio del producto le damos con un condicional o 60 o 40 de descuento y después hacemos un calculo de como quedaría ese descuento*/


db.tecnologia.aggregate(
  [
    {
      $unwind: {
        path: "$productos"
      }
    },
    
     {
        $project:
          {
            "productos.nombre":1,
            _id:0,
            "productos.precioVenta":1,
            descuento:
              {
                $cond: { if: { $gte: [ "$productos.precioVenta", 1000 ] }, then: 60, else: 40 }
              },
          }
     },
     {
        $project:
        {
          "productos.nombre":1,
          _id:0,
          descuento:"$descuento",
          "productos.precioVenta":1,
          RebajaDe: { $divide: [{ $multiply: ["$productos.precioVenta", "$descuento"] }, 100] }
        }
     },
     {
      $project:
      {
        "productos.nombre":1,
        _id:0,
        descuento:"$descuento",
        "productos.precioVenta":1,
        RebajaDe: "$RebajaDe",
        PrecioFinal: {$round: [{$subtract: ["$productos.precioVenta","$RebajaDe"]}, 2]}
      }
   }
  ]
)

/*
{
        "productos" : {
                "nombre" : "Apple iMac",
                "precioVenta" : 3251
        },
        "descuento" : 60,
        "RebajaDe" : 1950.6,
        "PrecioFinal" : 1300.4
}
{
        "productos" : {
                "nombre" : "Nintendo Switch",
                "precioVenta" : 299
        },
        "descuento" : 40,
        "RebajaDe" : 119.6,
        "PrecioFinal" : 179.4
}
{
        "productos" : {
                "nombre" : "Xiaomi Earbuds",
                "precioVenta" : 19.99
        },
        "descuento" : 40,
        "RebajaDe" : 7.995999999999999,
        "PrecioFinal" : 11.99
}
{
        "productos" : {
                "nombre" : "JBL Go Altavoz",
                "precioVenta" : 20
        },
        "descuento" : 40,
        "RebajaDe" : 8,
        "PrecioFinal" : 12
*/


/*Pretendo dar una calificación según la media de valoracion de los productos */


db.tecnologia.aggregate( [
  {
    $unwind: {
      path: "$productos"
    }
  },
  {
    $project:
      {
        "productos.nombre" : 1,
        "productos.otrosDatos.valoraciones" : 1,
        "calificacion":
        {
          $switch:
            {
              branches: [
                {
                  case: { $gte : [ { $avg : "$productos.otrosDatos.valoraciones" }, 4.75 ] },
                  then: "Excelente!"
                },
                {
                  case: { $and : [ { $gte : [ { $avg : "$productos.otrosDatos.valoraciones" }, 4 ] },
                                   { $lt : [ { $avg : "$productos.otrosDatos.valoraciones" }, 4.75 ] } ] },
                  then: "Muy bueno!"
                },
                {
                  case: { $lt : [ { $avg : "$productos.otrosDatos.valoraciones" }, 4 ] },
                  then: "Regular/Malo"
                }
              ],
              default: "Ninguna Valoracion"
            }
          
          }
         }
      },
      {
        $project:
        {
          _id:0,
          Producto:"$productos.nombre",
          Valoraciones:"$productos.otrosDatos.valoraciones",
          calificacion: "$calificacion"

        }
      }
   
] )

/*
{
        "Producto" : "Apple iMac",
        "Valoraciones" : [
                4,
                3,
                5
        ],
        "calificacion" : "Muy bueno!"
}
{
        "Producto" : "Nintendo Switch",
        "Valoraciones" : [
                3.25,
                4
        ],
        "calificacion" : "Regular/Malo"
}
{
        "Producto" : "Xiaomi Earbuds",
        "Valoraciones" : 4.83,
        "calificacion" : "Excelente!"
}
{
        "Producto" : "JBL Go Altavoz",
        "Valoraciones" : [
                4.75,
                3
        ],
        "calificacion" : "Regular/Malo"
}
*/

