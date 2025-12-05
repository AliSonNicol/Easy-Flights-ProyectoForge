import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log("DEBUG - process.env.BD =", process.env.BD); 

const BD = process.env.BD;

const toConnectToBd = async () => {
  try {

    if (!BD) {
      console.error("❌ ERROR: BD está vacío. Tu .env NO está cargando.");
      return;
    }

    await connect(BD);
    console.log('✅ Base de datos conectada correctamente');
  } catch (e) {
    console.error('❌ Error conectando a la base de datos:');
    console.error(e.message);
  }
};

export default toConnectToBd;
