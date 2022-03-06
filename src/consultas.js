/*Aquí tengo almacenado todas las consultas que he creado basandome en los inserts proporcionados anteriormente, aquí
uso todos los operadores que hemos visto y trabajado en clase durante todo el trimestre además de hablar de sus respectivas
funciones las cuales ampliare en el pdf ubicado en la carpeta doc*/ 



/*Quiero calcular el porcentaje de ventas por cada año de unidades vendidas sobre el porcentaje total esos 3 años en todas las tiendas */

db.tecnologia.aggregate(
    [
        {
            $unwind: {
              path: "$productos"
            }
        },

        { $match: { $expr: { $gte: [{ $year: "$fechaVenta" }, 2020] } } },

        {
            $group:
            {
                _id: { $year: "$fechaVenta" },
                Unidades: {$sum: "$productos.unidadesVendidas"}},
                
        },

        {
            $project: {
                Año: "$_id",
                _id: 0,
                Unidades: "$Unidades",
                PorcentajeSobreTotal: { $multiply: [{ $divide: ["$Unidades", 61] }, 100] }
                
            }
        }
       
    
    ]
).pretty()


/* {
        "Año" : 2021,
        "Unidades" : 27,
        "PorcentajeSobreTotal" : 44.26229508196721
}
{
        "Año" : 2022,
        "Unidades" : 9,
        "PorcentajeSobreTotal" : 14.754098360655737
}
{
        "Año" : 2020,
        "Unidades" : 25,
        "PorcentajeSobreTotal" : 40.98360655737705
}*/






/*Se calcula las ganancias totales incluyendo el IVA de cada vendedor de la tienda SevillaTec */

db.tecnologia.aggregate(
    [
        {
            $unwind: {
              path: "$productos"
            }
        },
        {
            $match: {empresaVendedora:"SevillaTec SL"} 
        },
        {
            $group:
            {
                _id: "$vendedor" ,
                TotalDeVentas: { $sum: { $multiply: ["$productos.precioVenta", "$productos.unidadesVendidas"] } }
            }
        },

        {
            $project: {
                Vendedor: "$_id",
                _id: 0,
                totalventas: "$TotalDeVentas",
                IVA: { $multiply: ["$TotalDeVentas", 0.21] },
                TotalDeVentasConIVA: { $multiply: ["$TotalDeVentas", 1.21] },
                Redondeo: { $round: [{ $multiply: ["$TotalDeVentas", 1.21] }, 0] }
            }
        }
    ]
).pretty()


/* {
{
        "Vendedor" : "Amador Rivas",
        "totalventas" : 2118.79,
        "IVA" : 444.9459,
        "TotalDeVentasConIVA" : 2563.7358999999997,
        "Redondeo" : 2564
}
{
        "Vendedor" : "Paco Pálido",
        "totalventas" : 25483.78,
        "IVA" : 5351.5938,
        "TotalDeVentasConIVA" : 30835.373799999998,
        "Redondeo" : 30835
}
{
        "Vendedor" : "Paco Sanz",
        "totalventas" : 8524,
        "IVA" : 1790.04,
        "TotalDeVentasConIVA" : 10314.039999999999,
        "Redondeo" : 10314
}
{
        "Vendedor" : "Alberto Garzón",
        "totalventas" : 477.99,
        "IVA" : 100.3779,
        "TotalDeVentasConIVA" : 578.3679,
        "Redondeo" : 578
}
}*/


/*Gasto promedio de los compradores particulares y el número promedio de unidades compradas en todas las tiendas */ 


db.tecnologia.aggregate(
    [
        {
            $unwind: {
              path: "$productos",
            }
        },
        {
            $match: { "comprador.empresa": false} 
        },
        {
            $group:     
                 { 
                     _id: "$comprador.nombre",
                     GastoAVG: { $avg: { $multiply: [ "$productos.precioVenta", "$productos.unidadesVendidas" ] } },
                     UnidadesAVG: { $avg: "$productos.unidadesVendidas" }
                 }
        },
        {
            $project: {
                Comprador: "$_id",
                _id:0,
                GastoAVG: "$GastoAVG",
                UnidadesAVG: "$UnidadesAVG"
            }
        }
        
    ]
).pretty()

/*{ 
    "Comprador" : "Leonardo Romani", 
    "GastoAVG" : 240.995, 
    "UnidadesAVG" : 1 
}

{ 
    "Comprador" : "Pablo Jesús", 
    "GastoAVG" : 1760.42, 
    "UnidadesAVG" : 1 
}

{
    "Comprador" : "Lebron James",
    "GastoAVG" : 112.99666666666667,
    "UnidadesAVG" : 1
}

{ 
    "Comprador" : "Perico González", 
    "GastoAVG" : 60, 
    "UnidadesAVG" : 3 
}

{ 
    "Comprador" : "Luis Garcia", 
    "GastoAVG" : 238.995, 
    "UnidadesAVG" : 1 
} 
*/



/*Simplemente saca la mayor venta de cualquier vendedor en todas las tiendas y lo ordena de mayor a menor*/

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
                _id: "$vendedor" ,
                MayorVenta: { $max: { $multiply: ["$productos.precioVenta", "$productos.unidadesVendidas"] } }
            }
        },
        {
            $project:
            {
                vendedor:"$_id",
                _id:0,
                MayorVenta: "$MayorVenta"
            }
        },
        {
            $sort:{
            MayorVenta:-1
            }
        }  
    ]).pretty()



/* 
    { "vendedor" : "Paco Pálido", "MayorVenta" : 22885.46 }
    { "vendedor" : "Curro Ramirez", "MayorVenta" : 6502 }
    { "vendedor" : "Paco Sanz", "MayorVenta" : 4678 }
    { "vendedor" : "Amador Rivas", "MayorVenta" : 898 }
    { "vendedor" : "Alberto Garzón", "MayorVenta" : 462 }
    { "vendedor" : "Miguel Reyes", "MayorVenta" : 299 }
    { "vendedor" : "Enrique Pastor", "MayorVenta" : 60 }
*/




/*Busca de la empresa de MalagaTec la venta mas baja de los vendedores y la ordena de menor a mayor */

db.tecnologia.aggregate(
    [
        {
            $unwind: {
              path: "$productos"
            }
        },
        {
            $match: {empresaVendedora:"MalagaTec SL"} 
        },
        {
            $group:
            {
                _id: "$vendedor" ,
                MayorVenta: { $min: { $multiply: ["$productos.precioVenta", "$productos.unidadesVendidas"] } }
            }
        },
        {
            $project:
            {
                vendedor:"$_id",
                _id:0,
                MenorVenta: "$MayorVenta"
            }
        },
        {
            $sort:{
            MenorVenta:1
            }
        }   
    ]).pretty()



/* 
    { "vendedor" : "Miguel Reyes", "MenorVenta" : 19.99 }
    { "vendedor" : "Enrique Pastor", "MenorVenta" : 60 }
    { "vendedor" : "Curro Ramirez", "MenorVenta" : 4678 }
*/




/*Calculamos los beneficios de cada año en todas las tiendas y ordenamos de mayor a menor por año además pondremos limite para que salgan 3 por pantalla */

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
        ]).pretty()

    /* 
    { "Año" : 2022, "Beneficio" : 9765 }
    { "Año" : 2021, "Beneficio" : 2436.79 }
    { "Año" : 2020, "Beneficio" : 12273.36 }
    { "Año" : 2018, "Beneficio" : 232.99 }
    { "Año" : 2017, "Beneficio" : 1234.41 }
    */


/*Consulta básica contando cuanta gente usa el metodo de pago VISA en todas las tiendas*/

db.tecnologia.aggregate(
        [
          {
            $match: {
                "comprador.metodoPago": "Visa"
            }
          },
          {
            $count: "Visa como metodo de pago"
          }
        ]
      )

/*
        { "Visa como metodo de pago" : 6 } 
*/




/*Busca la empresa Mariscos Recio y saca los datos de fecha, total comprado y pedidos */

db.tecnologia.aggregate(
    [
        {
            $unwind: {
              path: "$productos"
            }
        },
        {
        $match: { "comprador.nombre": "Mariscos Recio SA" } 
        },
        {
        $group:  
            {
                _id: { Día: { $dayOfMonth: "$fechaVenta"}, mes: {$month: "$fechaVenta"} ,año: { $year: "$fechaVenta" } },
                TotalaPagar: { $sum: { $multiply: [ "$productos.unidadesVendidas", "$productos.precioVenta" ] } },
                NúmeroDePedidos: { $sum: 1 }
           }
        }
    ]
).pretty()

/* 
{
        "_id" : {
                "Día" : 23,
                "mes" : 11,
                "año" : 2020
        },
        "TotalaPagar" : 23723.36,
        "NúmeroDePedidos" : 3
}
*/



 /*Agrupa por vendedor, y despues forma un listado de compra en el que el push
lista todos los productos y los precios de cada encargo */

db.tecnologia.aggregate(
    [
    { $sort: {productos: -1 } },
    {
        $group:
          {
            _id: "$vendedor" ,
            ListadoDeCompra: { $push:  { producto: "$productos.nombre", precios: "$productos.precioVenta" } }
          }}
    ]
  )


/*
 "_id" : "Amador Rivas",
        "ListadoDeCompra" : [
                {
                        "producto" : [
                                "Apple AirPods Max",
                                "Xiaomi Earbuds",
                                "Samsung Galaxy A52s"
                        ],
                        "precios" : [
                                449,
                                19.99,
                                339
                        ]
                },
                {
                        "producto" : [
                                "Canon PowerShot",
                                "Xiaomi Earbuds"
                        ],
                        "precios" : [
                                462,
                                19.99
                        ]
                }
        ]
}
{
        "_id" : "Enrique Pastor",
        "ListadoDeCompra" : [
                {
                        "producto" : [
                                "JBL Go Altavoz"
                        ],
                        "precios" : [
                                20
                        ]
                }
        ]
}
{
        "_id" : "Paco Pálido",
        "ListadoDeCompra" : [
                {
                        "producto" : [
                                "Samsung Z Fold 3",
                                "Samsung Galaxy J6+",
                                "Samsung Galaxy A52s"
                        ],
                        "precios" : [
                                1760.42,
                                15.99,
                                339
                        ]
                },
                {
                        "producto" : [
                                "Samsung Z Fold 3"
                        ],
                        "precios" : [
                                1760.42
                        ]
                }
        ]
}
*/