export async function fetchAddressByCEP(cep: string) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error('Erro ao buscar o CEP.');
    }
    const data = await response.json();
    if (data.erro) {
      throw new Error('CEP não encontrado.');
    }
    return {
      street: data.logradouro,
      district: data.bairro,
      city: data.localidade,
      state: data.uf,
    };
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}
