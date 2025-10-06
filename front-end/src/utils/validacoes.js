export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const required = (v) => (v !== null && v !== undefined && String(v).trim() !== '');
export const same = (a, b) => String(a) === String(b);

// (opcional) máscara/validação simples de CPF só pra UX
export const cleanCpf = (v) => String(v || '').replace(/\D/g, '');
export const isCpfLike = (v) => cleanCpf(v).length >= 11;
