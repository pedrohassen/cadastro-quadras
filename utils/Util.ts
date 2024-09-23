export function daysToMilliseconds(days: number) {
    return days * 24 * 60 * 60 * 1000;
}

export function formatarData(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} - Horário: ${hora}:${minuto}`;
}
