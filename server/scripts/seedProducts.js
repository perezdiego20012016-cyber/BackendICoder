import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Product } from "../models/product.model.js";

const products = [
  {
    title: "Mogul Extreme Ácido", description: "Gomitas frutales con cobertura extra ácida.",
    code: "ACI-001", price: 950, status: true, stock: 35, category: "Acidos",
    thumbnails: ["/images/mogulextreme.png"],
  },
  {
    title: "Caramelos Fizz", description: "Caramelos masticables con centro efervescente.",
    code: "ACI-002", price: 700, status: true, stock: 45, category: "Acidos",
    thumbnails: ["/images/fizz.png"],
  },
  {
    title: "TNT Frutilla", description: "Caramelo ácido sabor frutilla de efecto explosivo.",
    code: "ACI-003", price: 600, status: true, stock: 50, category: "Acidos",
    thumbnails: ["/images/TNT.png"],
  },
  {
    title: "TNT Manzana", description: "Caramelo intensamente ácido sabor manzana verde.",
    code: "ACI-004", price: 600, status: true, stock: 42, category: "Acidos",
    thumbnails: ["/images/TNT.png"],
  },
  {
    title: "Gomitas Ácidas de Sandía", description: "Gomitas suaves sabor sandía con azúcar ácida.",
    code: "ACI-005", price: 850, status: true, stock: 30, category: "Acidos",
    thumbnails: ["/images/mogulextreme.png"],
  },
  {
    title: "Cintas Ácidas Multicolor", description: "Cintas de goma frutales con intenso toque ácido.",
    code: "ACI-006", price: 900, status: true, stock: 28, category: "Acidos",
    thumbnails: ["/images/SKI.png"],
  },
  {
    title: "Caramelos SKI Limón", description: "Caramelos duros de limón con relleno ácido.",
    code: "ACI-007", price: 650, status: true, stock: 38, category: "Acidos",
    thumbnails: ["/images/SKI.png"],
  },
  {
    title: "Gusanos Ácidos", description: "Gomitas con forma de gusano y sabores frutales surtidos.",
    code: "ACI-008", price: 1000, status: true, stock: 25, category: "Acidos",
    thumbnails: ["/images/mogulextreme.png"],
  },
  {
    title: "Pastillas Ácidas de Naranja", description: "Pastillas compactas con sabor cítrico intenso.",
    code: "ACI-009", price: 550, status: true, stock: 55, category: "Acidos",
    thumbnails: ["/images/fizz.png"],
  },
  {
    title: "Mix Ácido Tropical", description: "Selección de golosinas ácidas con sabores tropicales.",
    code: "ACI-010", price: 1200, status: true, stock: 22, category: "Acidos",
    thumbnails: ["/images/TNT.png"],
  },
  {
    title: "Chocolate Milka", description: "Chocolate con leche suave y cremoso.",
    code: "CHO-001", price: 1800, status: true, stock: 30, category: "Chocolates",
    thumbnails: ["/images/milka.png"],
  },
  {
    title: "KitKat Clásico", description: "Oblea crocante cubierta con chocolate con leche.",
    code: "CHO-002", price: 1500, status: true, stock: 40, category: "Chocolates",
    thumbnails: ["/images/kitkat.png"],
  },
  {
    title: "Bon o Bon", description: "Bombón de chocolate relleno con crema de maní.",
    code: "CHO-003", price: 500, status: true, stock: 60, category: "Chocolates",
    thumbnails: ["/images/bonobon.png"],
  },
  {
    title: "Cofler Aireado", description: "Chocolate aireado de textura liviana.",
    code: "CHO-004", price: 1700, status: true, stock: 32, category: "Chocolates",
    thumbnails: ["/images/cofler.png"],
  },
  {
    title: "Milka Almendras", description: "Chocolate con leche con trozos de almendras.",
    code: "CHO-005", price: 2100, status: true, stock: 24, category: "Chocolates",
    thumbnails: ["/images/milka.png"],
  },
  {
    title: "KitKat Chocolate Blanco", description: "Oblea crocante cubierta con chocolate blanco.",
    code: "CHO-006", price: 1650, status: true, stock: 28, category: "Chocolates",
    thumbnails: ["/images/kitkat.png"],
  },
  {
    title: "Bon o Bon Chocolate Blanco", description: "Bombón blanco con relleno cremoso de maní.",
    code: "CHO-007", price: 550, status: true, stock: 48, category: "Chocolates",
    thumbnails: ["/images/bonobon.png"],
  },
  {
    title: "Cofler Maní", description: "Chocolate con leche y maní tostado.",
    code: "CHO-008", price: 1900, status: true, stock: 27, category: "Chocolates",
    thumbnails: ["/images/cofler.png"],
  },
  {
    title: "Milka Oreo", description: "Chocolate con leche relleno con crema y galletas.",
    code: "CHO-009", price: 2200, status: true, stock: 20, category: "Chocolates",
    thumbnails: ["/images/milka.png"],
  },
  {
    title: "Mix de Bombones", description: "Selección surtida de bombones de chocolate.",
    code: "CHO-010", price: 2500, status: true, stock: 18, category: "Chocolates",
    thumbnails: ["/images/bonobon.png"],
  },
  {
    title: "Paleta de Limón", description: "Paleta refrescante sabor limón.",
    code: "PAL-001", price: 650, status: true, stock: 40, category: "Paletas",
    thumbnails: ["/images/paletadelimon.png"],
  },
  {
    title: "Paleta de Naranja", description: "Paleta frutal de naranja.",
    code: "PAL-002", price: 650, status: true, stock: 38, category: "Paletas",
    thumbnails: ["/images/paletanaranja.png"],
  },
  {
    title: "Paleta de Menta", description: "Paleta fresca con sabor intenso a menta.",
    code: "PAL-003", price: 700, status: true, stock: 35, category: "Paletas",
    thumbnails: ["/images/paletamenta.png"],
  },
  {
    title: "Paleta de Yogur", description: "Paleta cremosa con sabor a yogur.",
    code: "PAL-004", price: 750, status: true, stock: 32, category: "Paletas",
    thumbnails: ["/images/paletadeyogurt.png"],
  },
  {
    title: "Paleta Limón Ácido", description: "Paleta de limón con centro ácido.",
    code: "PAL-005", price: 800, status: true, stock: 28, category: "Paletas",
    thumbnails: ["/images/paletadelimon.png"],
  },
  {
    title: "Paleta Naranja Rellena", description: "Paleta de naranja con relleno masticable.",
    code: "PAL-006", price: 850, status: true, stock: 26, category: "Paletas",
    thumbnails: ["/images/paletanaranja.png"],
  },
  {
    title: "Paleta Menta Chocolate", description: "Paleta de menta con centro sabor chocolate.",
    code: "PAL-007", price: 900, status: true, stock: 24, category: "Paletas",
    thumbnails: ["/images/paletamenta.png"],
  },
  {
    title: "Paleta Yogur Frutilla", description: "Paleta de yogur con sabor a frutilla.",
    code: "PAL-008", price: 850, status: true, stock: 30, category: "Paletas",
    thumbnails: ["/images/paletadeyogurt.png"],
  },
  {
    title: "Paleta Cítrica Mix", description: "Paleta con combinación de limón y naranja.",
    code: "PAL-009", price: 800, status: true, stock: 27, category: "Paletas",
    thumbnails: ["/images/paletadelimon.png"],
  },
  {
    title: "Pack de Paletas Surtidas", description: "Paquete con paletas de cuatro sabores.",
    code: "PAL-010", price: 2800, status: true, stock: 15, category: "Paletas",
    thumbnails: ["/images/paletanaranja.png"],
  },
  { title: "Gomitas Ácidas de Frutilla", description: "Gomitas blandas sabor frutilla con azúcar ácida.", code: "ACI-011", price: 900, status: true, stock: 34, category: "Acidos", thumbnails: ["/images/mogulextreme.png"] },
  { title: "Caramelos Ácidos de Uva", description: "Caramelos masticables con intenso sabor a uva.", code: "ACI-012", price: 750, status: true, stock: 41, category: "Acidos", thumbnails: ["/images/fizz.png"] },
  { title: "TNT Limón", description: "Caramelo ácido sabor limón de efecto explosivo.", code: "ACI-013", price: 600, status: true, stock: 47, category: "Acidos", thumbnails: ["/images/TNT.png"] },
  { title: "Cintas Ácidas de Frutilla", description: "Cintas frutales con cobertura de azúcar ácida.", code: "ACI-014", price: 950, status: true, stock: 29, category: "Acidos", thumbnails: ["/images/SKI.png"] },
  { title: "Pastillas Ácidas de Uva", description: "Pastillas compactas con sabor a uva y toque ácido.", code: "ACI-015", price: 650, status: true, stock: 52, category: "Acidos", thumbnails: ["/images/fizz.png"] },
  { title: "Mix Ácido de Frutos Rojos", description: "Surtido de gomitas ácidas con sabores de frutos rojos.", code: "ACI-016", price: 1250, status: true, stock: 23, category: "Acidos", thumbnails: ["/images/mogulextreme.png"] },
  { title: "Gomitas Ácidas Arcoíris", description: "Gomitas de colores con una cobertura intensamente ácida.", code: "ACI-017", price: 1050, status: true, stock: 31, category: "Acidos", thumbnails: ["/images/mogulextreme.png"] },
  { title: "SKI Naranja Ácido", description: "Caramelos duros sabor naranja con relleno ácido.", code: "ACI-018", price: 650, status: true, stock: 39, category: "Acidos", thumbnails: ["/images/SKI.png"] },
  { title: "Gusanos Ácidos Tropicales", description: "Gomitas en forma de gusano con sabores tropicales.", code: "ACI-019", price: 1100, status: true, stock: 26, category: "Acidos", thumbnails: ["/images/mogulextreme.png"] },
  { title: "Caramelos Ácidos Cola", description: "Caramelos sabor cola con un final ácido refrescante.", code: "ACI-020", price: 700, status: true, stock: 44, category: "Acidos", thumbnails: ["/images/fizz.png"] },
  { title: "Milka Avellanas", description: "Chocolate con leche y trozos crocantes de avellana.", code: "CHO-011", price: 2300, status: true, stock: 22, category: "Chocolates", thumbnails: ["/images/milka.png"] },
  { title: "KitKat Dark", description: "Oblea crocante cubierta con chocolate amargo.", code: "CHO-012", price: 1750, status: true, stock: 33, category: "Chocolates", thumbnails: ["/images/kitkat.png"] },
  { title: "Bon o Bon Doble Chocolate", description: "Bombón de chocolate con doble relleno cremoso.", code: "CHO-013", price: 650, status: true, stock: 51, category: "Chocolates", thumbnails: ["/images/bonobon.png"] },
  { title: "Cofler Extra Leche", description: "Chocolate con leche de textura suave y cremosa.", code: "CHO-014", price: 1850, status: true, stock: 29, category: "Chocolates", thumbnails: ["/images/cofler.png"] },
  { title: "Milka Frutilla", description: "Chocolate con leche relleno con crema sabor frutilla.", code: "CHO-015", price: 2150, status: true, stock: 21, category: "Chocolates", thumbnails: ["/images/milka.png"] },
  { title: "KitKat Caramelo", description: "Oblea crocante con chocolate y relleno sabor caramelo.", code: "CHO-016", price: 1800, status: true, stock: 30, category: "Chocolates", thumbnails: ["/images/kitkat.png"] },
  { title: "Bon o Bon Coco", description: "Bombón de chocolate con relleno cremoso de coco.", code: "CHO-017", price: 600, status: true, stock: 46, category: "Chocolates", thumbnails: ["/images/bonobon.png"] },
  { title: "Cofler Almendras", description: "Chocolate con leche con trozos de almendras tostadas.", code: "CHO-018", price: 2050, status: true, stock: 25, category: "Chocolates", thumbnails: ["/images/cofler.png"] },
  { title: "Milka Caramelo Salado", description: "Chocolate con leche y relleno de caramelo salado.", code: "CHO-019", price: 2400, status: true, stock: 19, category: "Chocolates", thumbnails: ["/images/milka.png"] },
  { title: "Caja de Bombones Premium", description: "Selección de bombones de chocolate para compartir.", code: "CHO-020", price: 3200, status: true, stock: 14, category: "Chocolates", thumbnails: ["/images/bonobon.png"] },
  { title: "Paleta de Frutilla", description: "Paleta frutal con sabor clásico a frutilla.", code: "PAL-011", price: 650, status: true, stock: 42, category: "Paletas", thumbnails: ["/images/paletadeyogurt.png"] },
  { title: "Paleta de Cereza", description: "Paleta de sabor intenso a cereza.", code: "PAL-012", price: 700, status: true, stock: 36, category: "Paletas", thumbnails: ["/images/paletanaranja.png"] },
  { title: "Paleta de Sandía", description: "Paleta refrescante con sabor dulce a sandía.", code: "PAL-013", price: 700, status: true, stock: 39, category: "Paletas", thumbnails: ["/images/paletadelimon.png"] },
  { title: "Paleta de Uva", description: "Paleta frutal con un suave sabor a uva.", code: "PAL-014", price: 700, status: true, stock: 34, category: "Paletas", thumbnails: ["/images/paletamenta.png"] },
  { title: "Paleta de Cola", description: "Paleta sabor cola con centro masticable.", code: "PAL-015", price: 750, status: true, stock: 31, category: "Paletas", thumbnails: ["/images/paletanaranja.png"] },
  { title: "Paleta de Durazno", description: "Paleta suave y frutal con sabor a durazno.", code: "PAL-016", price: 700, status: true, stock: 37, category: "Paletas", thumbnails: ["/images/paletadeyogurt.png"] },
  { title: "Paleta Manzana Verde", description: "Paleta de manzana verde con un toque ácido.", code: "PAL-017", price: 750, status: true, stock: 33, category: "Paletas", thumbnails: ["/images/paletadelimon.png"] },
  { title: "Paleta Frutilla con Crema", description: "Paleta cremosa que combina frutilla y crema.", code: "PAL-018", price: 850, status: true, stock: 28, category: "Paletas", thumbnails: ["/images/paletadeyogurt.png"] },
  { title: "Paleta Cítrica de Pomelo", description: "Paleta cítrica y refrescante sabor pomelo.", code: "PAL-019", price: 750, status: true, stock: 35, category: "Paletas", thumbnails: ["/images/paletadelimon.png"] },
  { title: "Pack Paletas Frutales", description: "Paquete surtido de paletas con sabores frutales.", code: "PAL-020", price: 3000, status: true, stock: 16, category: "Paletas", thumbnails: ["/images/paletanaranja.png"] },
];

async function seed() {
  await mongoose.connect(env.mongoUri, { dbName: "ecommerce" });
  const result = await Product.bulkWrite(products.map((product) => ({
    updateOne: {
      filter: { code: product.code },
      update: { $set: product },
      upsert: true,
    },
  })));
  const counts = await Product.aggregate([
    { $match: { code: { $in: products.map(({ code }) => code) } } },
    { $group: { _id: "$category", total: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  console.log(`Carga completa: ${result.upsertedCount} creados, ${result.modifiedCount} actualizados.`);
  for (const category of counts) console.log(`${category._id}: ${category.total}`);
}

seed()
  .catch((error) => {
    console.error("No se pudo cargar el catálogo:", error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
