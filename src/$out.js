db.tecnologia.aggregate(
    [
        {
            $project:{
                      
                      _id:0,
                      productos:0,
                       
                    }
        },
    
        {
            $out:{db:"test",coll:"vendedorcomprador"}
        }
])



db.tecnologia.aggregate([
    {
        $unwind: {
          path: "$productos",
        },
      },

    {
        $project: {
            _id: 0,
            id: 1,
            Nombre:"$productos.nombre",
            PrecioVenta:"$productos.precioVenta",
            PrecioProduccion:"$productos.precioProduccion",
            UnidadesVendidas:"$productos.unidadesVendidas",
            OtrosDatos:"$productos.otrosDatos"
                },
    },
    { 
      $out: { db: "test", coll:"productos" } 
    }
])
 



db.productos.aggregate([
  {
      $lookup: {
          from: 'vendedorcomprador',
          localField: 'id',
          foreignField: 'id',
          as: 'venta'
     }
  },
  {
    $addFields: {
      TotalVenta: { $multiply: ["$PrecioVenta", "$UnidadesVendidas"] },
      TotalProduccion:{$multiply: ["$PrecioProduccion", "$UnidadesVendidas"]},
      vendedor:{$arrayElemAt: [ '$venta', 0]}
    }
  },
{
  
  $project: {
      venta: 0
  }
}]).pretty()

/*
{
        "_id" : ObjectId("621f6d2e24edd2093dfc83e3"),
        "id" : 9,
        "Nombre" : "JBL Go Altavoz",
        "PrecioVenta" : 20,
        "PrecioProduccion" : 10,
        "UnidadesVendidas" : 1,
        "OtrosDatos" : {
                "colores" : [
                        "azul",
                        "negro",
                        "amarillo"
                ],
                "valoracion" : 3.75,
                "peso" : 130,
                "garantia" : false
        },
        "TotalVenta" : 20,
        "TotalProduccion" : 10,
          "vendedor" : {
                  "_id" : ObjectId("621f6d2124edd2093dfc8014"),
                  "id" : 9,
                  "empresaVendedora" : "MalagaTec SL",
                  "vendedor" : "Miguel Reyes",
                  "fechaVenta" : ISODate("2021-01-02T00:00:00Z"),
                  "comprador" : {
                          "empresa" : false,
                          "nombre" : "Lebron James",
                          "NIF" : "67859856T",
                          "metodoPago" : "Efectivo"
                  }
        }
}

*/