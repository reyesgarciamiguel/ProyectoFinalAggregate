/*Aquí están los Insert de mi proyecto dedicado a elementos tecnológicos de una cadena de tiendas (2) como pueden ser móviles, tablets o unos cascos de música,
cada insert tiene una descripción de precios tanto de venta como producción, datos del producto, el comprador y vendedor de los respectivos
productos vendidos*/ 



db.tecnologia.drop();
db.tecnologia.insertMany([
    {
        id:01,
        empresaVendedora:"SevillaTec SL",
        vendedor:"Paco Pálido",
        fechaVenta: new Date("2020-11-23"),
        productos:[
            {
                nombre:"Samsung Z Fold 3",
                precioVenta:1760.42,
                precioProduccion:800,
                unidadesVendidas:13,
                otrosDatos:{
                    pulgadas:7.6,
                    colores:["negro","blanco"],
                    valoraciones:[4.5, 5],    /*Sobre 5*/
                    peso:271,           /*Sobre gramos*/
                    garantia:true,
                }
            },
            {
                nombre:"Samsung Galaxy J6+",
                precioVenta:15.99,
                precioProduccion:75,
                unidadesVendidas:10,
                otrosDatos:{
                    pulgadas:6,
                    colores:["negro","rojo"],
                    valoraciones:[4, 2, 3],      
                    peso:294,           
                    garantia:false,
                }
            },
            {
                nombre:"Samsung Galaxy A52s",
                precioVenta:339,
                precioProduccion:150,
                unidadesVendidas:2,
                otrosDatos:{
                    pulgadas:6.5,
                    colores:["verde","blanco","magenta"],
                    valoraciones:4,     
                    peso:187,         
                    garantia:true,
                }
            },
        ],
        comprador:{
            empresa:true, /*Particular o Empresa*/
            nombre:"Mariscos Recio SA",
            CIF: "M345980",
            metodoPago: "Visa"
        },
    },
     {
            id:02,
            empresaVendedora:"SevillaTec SL",
            vendedor:"Amador Rivas",
            fechaVenta: new Date("2021-1-2"),
            productos:[
                {
                    nombre:"Apple AirPods Max",
                    precioVenta:449,
                    precioProduccion:200,
                    unidadesVendidas:2,
                    otrosDatos:{
                        colores:["verde","rosa","plata"],
                        valoraciones:[4.5, 5],      /*Sobre 5*/
                        peso:271,           /*Sobre gramos*/
                        garantia:true,
                    }
                },
                {
                    nombre:"Xiaomi Earbuds",
                    precioVenta:19.99,
                    precioProduccion:8,
                    unidadesVendidas:20,
                    otrosDatos:{
                        colores:["negro","rojo"],
                        valoraciones:[4.5, 3, 2],      
                        peso:50,           
                        garantia:false,
                    }
                },
                {
                    nombre:"Samsung Galaxy A52s",
                    precioVenta:339,
                    precioProduccion:150,
                    unidadesVendidas:1,
                    otrosDatos:{
                        pulgadas:6.5,
                        colores:["verde","blanco","magenta"],
                        valoraciones:[3, 4],      
                        peso:187,         
                        garantia:true,
                    }
                },
            ],
                                 
            comprador:{
                empresa:true,    /*Particular o Empresa*/
                nombre:"Max and Henry SL",
                CIF: "T561289",
                metodoPago:"Visa"
            },
        },
        {
                id:03,
                empresaVendedora:"SevillaTec SL",
                vendedor:"Amador Rivas",
                fechaVenta: new Date("2017-2-9"),
                productos:[
                    {
                        nombre:"Canon PowerShot",
                        precioVenta:462,
                        precioProduccion:200,
                        unidadesVendidas:1,
                        otrosDatos:{
                            colores:["negro","plata"],
                            valoraciones:[5,3],      /*Sobre 5*/
                            peso:900,           /*Sobre gramos*/
                            garantia:true,
                        }
                    },
                    {
                        nombre:"Xiaomi Earbuds",
                        precioVenta:19.99,
                        precioProduccion:8,
                        unidadesVendidas:1,
                        otrosDatos:{
                            colores:["negro","rojo"],
                            valoraciones:4.83,     
                            peso:50,           
                            garantia:false,
                        }
                    },
                ],
                                        
                comprador:{
                    empresa:false, /*Particular o Empresa*/
                    nombre:"Leonardo Romani",
                    NIF: "75653467M",
                    metodoPago:"Visa"
                },
            },
            {
                    id:04,
                    empresaVendedora:"SevillaTec SL",
                    vendedor:"Paco Pálido",
                    fechaVenta: new Date("2017-2-9"),
                    productos:[
                        {
                            nombre:"Samsung Z Fold 3",
                            precioVenta:1760.42,
                            precioProduccion:800,
                            unidadesVendidas:1,
                            otrosDatos:{
                                pulgadas:7.6,
                                colores:["negro","blanco"],
                                valoraciones:[4.5, 2],      /*Sobre 5*/
                                peso:271,           /*Sobre gramos*/
                                garantia:true,
                            }
                        },
                    ],
                                             
                    comprador:{
                        empresa:false,  /*Particular o Empresa*/
                        nombre:"Pablo Jesús",
                        NIF: "75653123B",
                        metodoPago:"Efectivo"
                    },
                    
                },
                {
                        id:05,
                        empresaVendedora:"SevillaTec SL",
                        vendedor:"Paco Sanz",
                        fechaVenta: new Date("2022-1-8"),
                        productos:[
                            {
                                nombre:"Apple AirPods Max",
                                precioVenta:449,
                                precioProduccion:200,
                                unidadesVendidas:1,
                                otrosDatos:{
                                    colores:["verde","rosa","plata"],
                                    valoraciones:[5, 3],      /*Sobre 5*/
                                    peso:271,           /*Sobre gramos*/
                                    garantia:true,
                                }
                            },
                            {
                                nombre:"Apple iPad Pro",
                                precioVenta:2339,
                                precioProduccion:1000,
                                unidadesVendidas:2,
                                otrosDatos:{
                                    pulgadas:12.9,
                                    colores:["gris espacial","plata"],
                                    valoraciones:5,     
                                    peso:684,           
                                    garantia:true,
                                }
                            },
                            {
                                nombre:"Apple Watch Series 7",
                                precioVenta:529,
                                precioProduccion:200,
                                unidadesVendidas:2,
                                otrosDatos:{
                                    colores:["verde","blanco","magenta"],
                                    valoraciones:[3.75, 4],      
                                    peso:32,         
                                    garantia:true,
                                }
                            },
                        ],
                                                
                        comprador:{
                            empresa:true,   /*Particular o Empresa*/
                            nombre:"Bar Reinolds",
                            CIF: "Y123098",
                            metodoPago:"Visa"
                        },
                        
                    },
                    {
                            id:06,
                            empresaVendedora:"SevillaTec SL",
                            vendedor:"Alberto Garzón",
                            fechaVenta: new Date("2018-6-13"),
                            productos:[
                                {
                                    nombre:"Canon PowerShot",
                                    precioVenta:462,
                                    precioProduccion:200,
                                    unidadesVendidas:1,
                                    otrosDatos:{
                                        colores:["negro","plata"],
                                        valoraciones:4.5,     /*Sobre 5*/
                                        peso:900,           /*Sobre gramos*/
                                        garantia:true,
                                    }
                                },
                                {
                                    nombre:"Samsung Galaxy J6+",
                                    precioVenta:15.99,
                                    precioProduccion:75,
                                    unidadesVendidas:1,
                                    otrosDatos:{
                                        pulgadas:6,
                                        colores:["negro","rojo"],
                                        valoraciones:4.83,     
                                        peso:294,           
                                        garantia:false,
                                    }
                                },    
                            ],
                                                    
                            comprador:{
                                empresa:false, /*Particular o Empresa*/
                                nombre:"Luis Garcia",
                                NIF: "45678934T",
                                metodoPago:"Visa"
                            },
                            
                        },
                        {
                                id:07,
                                empresaVendedora:"SevillaTec SL",
                                vendedor:"Paco Sanz",
                                fechaVenta: new Date("2021-10-15"),
                                productos:[
                                    {
                                        nombre:"Apple iPad Pro",
                                        precioVenta:2339,
                                        precioProduccion:1000,
                                        unidadesVendidas:1,
                                        otrosDatos:{
                                            pulgadas:12.9,
                                            colores:["gris espacial","plata"],
                                            valoraciones:[4.25, 4],      
                                            peso:684,           
                                            garantia:true,
                                        }
                                    },
                                ],
                                                         
                                comprador:{
                                    empresa:true,  /*Particular o Empresa*/
                                    nombre:"Atlantic International Technology SA",
                                    CIF: "M456789",
                                    metodoPago:"Cheque"
                                },
                                
                            },
                            {
                                    id:08,
                                    empresaVendedora:"MalagaTec SL",
                                    vendedor:"Curro Ramirez",
                                    fechaVenta: new Date("2022-2-10"),
                                    productos:[
                                        {
                                            nombre:"Apple iPad Pro",
                                            precioVenta:2339,
                                            precioProduccion:1000,
                                            unidadesVendidas:2,
                                            otrosDatos:{
                                                pulgadas:12.9,
                                                colores:["gris espacial","plata"],
                                                valoraciones:[5, 2],      
                                                peso:684,           
                                                garantia:true,
                                            }
                                        },
                                        {
                                            nombre:"Apple iMac",
                                            precioVenta:3251,
                                            precioProduccion:1500,
                                            unidadesVendidas:2,
                                            otrosDatos:{
                                                colores:["blanco","plata"],
                                                pulgadas:27,
                                                valoraciones:[4, 3, 5],      /*Sobre 5*/
                                                peso:9000,           /*Sobre gramos*/
                                                garantia:true,
                                            }
                                        },
                                    ],
                                                           
                                    comprador:{
                                        empresa:true,  /*Particular o Empresa*/
                                        nombre:"CrioSpain SL",
                                        CIF: "M782340",
                                        metodoPago:"Paypal",
                                    },
                                    
                                },
                                {
                                        id:09,
                                        empresaVendedora:"MalagaTec SL",
                                        vendedor:"Miguel Reyes",
                                        fechaVenta: new Date("2021-1-2"),
                                        productos:[
                                            {
                                                nombre:"Nintendo Switch",
                                                precioVenta:299,
                                                precioProduccion:150,
                                                unidadesVendidas:1,
                                                otrosDatos:{
                                                    colores:["azul","rojo","gris"],
                                                    valoraciones:[3.25, 4],      /*Sobre 5*/
                                                    peso:389,           /*Sobre gramos*/
                                                    garantia:true,
                                                }
                                            },
                                            {
                                                nombre:"Xiaomi Earbuds",
                                                precioVenta:19.99,
                                                precioProduccion:8,
                                                unidadesVendidas:1,
                                                otrosDatos:{
                                                    colores:["negro","rojo"],
                                                    valoraciones:4.83,     
                                                    peso:50,           
                                                    garantia:false,
                                                }
                                            },
                                            {
                                                nombre:"JBL Go Altavoz",
                                                precioVenta:20,
                                                precioProduccion:10,
                                                unidadesVendidas:1,
                                                otrosDatos:{
                                                    colores:["azul","negro","amarillo"],
                                                    valoraciones:[4.75, 3],      
                                                    peso:130,         
                                                    garantia:false,
                                                }
                                            },
                                        ],
                                                                
                                        comprador:{
                                            empresa:false,   /*Particular o Empresa*/
                                            nombre:"Lebron James",
                                            NIF: "67859856T",
                                            metodoPago:"Efectivo"
                                        },
                                        
                                    },
                                    {
                                            id:10,
                                            empresaVendedora:"MalagaTec SL",
                                            vendedor:"Enrique Pastor",
                                            fechaVenta: new Date("2018-10-1"),
                                            productos:[
                                                {
                                                    nombre:"JBL Go Altavoz",
                                                    precioVenta:20,
                                                    precioProduccion:10,
                                                    unidadesVendidas:3,
                                                    otrosDatos:{
                                                        colores:["azul","negro","amarillo"],
                                                        valoraciones:3.75,     
                                                        peso:130,         
                                                        garantia:false,
                                                    }
                                                },
                                            ],
                                                                    
                                            comprador:{
                                                empresa:false, /*Particular o Empresa*/
                                                nombre:"Perico González",
                                                NIF: "45120976M",
                                                metodoPago:"Visa"
                                            },
                                            
                                        }])