import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

function extrairTagsUnicas(rows: any[], coluna: string) {
  const tags = new Set<string>();
  
  rows.forEach(row => {
    const valor = row[coluna];
    if (valor) {
      // NOVA REGRA: Agora divide por Ponto e Vírgula (;), Vírgula (,), Barra (/) ou " e "
      const partes = valor.split(/\s*[;,]\s*|\s+e\s+|\s*\/\s*/);
      
      partes.forEach((parte: string) => {
        const tagLimpa = parte.trim();
        if (tagLimpa) tags.add(tagLimpa);
      });
    }
  });

  // Converte o Set de volta para Array e ordena alfabeticamente
  return Array.from(tags).sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

export async function getFilterOptions() {
  const familias = await query(
    'SELECT DISTINCT familia FROM moleculas WHERE familia IS NOT NULL AND familia != \'\' ORDER BY familia ASC'
  );
  
  const biomas = await query(
    'SELECT DISTINCT bioma FROM moleculas WHERE bioma IS NOT NULL AND bioma != \'\' ORDER BY bioma ASC'
  );

  const classes = await query(
    'SELECT DISTINCT classe FROM moleculas WHERE classe IS NOT NULL AND classe != \'\' ORDER BY classe ASC'
  );

  const subclasses = await query(
    'SELECT DISTINCT subclasse FROM moleculas WHERE subclasse IS NOT NULL AND subclasse != \'\' ORDER BY subclasse ASC'
  );

  const instituicoes = await query(
    'SELECT DISTINCT instituicao FROM moleculas WHERE instituicao IS NOT NULL AND instituicao != \'\' ORDER BY instituicao ASC'
  );

  const biodiversidades = await query(
    'SELECT DISTINCT biodiversidade FROM moleculas WHERE biodiversidade IS NOT NULL AND biodiversidade != \'\' ORDER BY biodiversidade ASC'
  );

  // Aplica a função de limpeza em todos os filtros para garantir listas perfeitas na interface
  return {
    familias: extrairTagsUnicas(familias.rows, 'familia'),
    biomas: extrairTagsUnicas(biomas.rows, 'bioma'),
    classes: extrairTagsUnicas(classes.rows, 'classe'),
    subclasses: extrairTagsUnicas(subclasses.rows, 'subclasse'),
    instituicoes: extrairTagsUnicas(instituicoes.rows, 'instituicao'),
    biodiversidades: extrairTagsUnicas(biodiversidades.rows, 'biodiversidade'),
  };
}

export async function getMoleculasPaginadas(
  filtros: any,
  pagina: number = 1,
  limite: number = 20
) {
  const offset = (pagina - 1) * limite;
  const params: any[] = [];
  let counter = 1;
  
  let whereClause = ` WHERE 1=1`;

  // Busca na barra principal (Busca Livre)
  if (filtros.q) {
    whereClause += ` AND (
      nome ILIKE $${counter} OR 
      nome_cientifico ILIKE $${counter} OR 
      nome_iupac ILIKE $${counter} OR
      codigo ILIKE $${counter} OR
      familia ILIKE $${counter} OR 
      bioma ILIKE $${counter} OR
      classe ILIKE $${counter} OR
      subclasse ILIKE $${counter} OR
      biodiversidade ILIKE $${counter} OR
      propriedades_bio ILIKE $${counter} OR
      atividades ILIKE $${counter} OR
      parte_planta ILIKE $${counter}
    )`;
    params.push(`%${filtros.q}%`);
    counter++;
  }

  // Busca nos Filtros Avançados (Agora usando ILIKE para encontrar partes da string)
  if (filtros.familia) { whereClause += ` AND familia ILIKE $${counter}`; params.push(`%${filtros.familia}%`); counter++; }
  if (filtros.bioma) { whereClause += ` AND bioma ILIKE $${counter}`; params.push(`%${filtros.bioma}%`); counter++; }
  if (filtros.classe) { whereClause += ` AND classe ILIKE $${counter}`; params.push(`%${filtros.classe}%`); counter++; }
  if (filtros.subclasse) { whereClause += ` AND subclasse ILIKE $${counter}`; params.push(`%${filtros.subclasse}%`); counter++; }
  if (filtros.instituicao) { whereClause += ` AND instituicao ILIKE $${counter}`; params.push(`%${filtros.instituicao}%`); counter++; }
  if (filtros.biodiversidade) { whereClause += ` AND biodiversidade ILIKE $${counter}`; params.push(`%${filtros.biodiversidade}%`); counter++; }

  const sqlDados = `
    SELECT * FROM moleculas 
    ${whereClause} 
    ORDER BY id ASC 
    LIMIT ${limite} OFFSET ${offset}
  `;
  
  const sqlCount = `SELECT count(*) as total FROM moleculas ${whereClause}`;

  const [dadosRes, countRes] = await Promise.all([
    query(sqlDados, params),
    query(sqlCount, params)
  ]);

  return {
    moleculas: dadosRes.rows,
    total: parseInt(countRes.rows[0].total || '0'),
    paginas: Math.ceil(parseInt(countRes.rows[0].total || '0') / limite)
  };
}

export async function getMoleculaById(id: string) {
  try {
    const result = await query(
      'SELECT * FROM moleculas WHERE id = $1',
      [id]
    );
    
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao buscar molécula:', error);
    return null;
  }
}