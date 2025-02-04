export const dataTime = (checkPoint: number, showFulll = true) => {
    const data = new Date(checkPoint * 1000)
    return data.toLocaleString('en-En', showFulll ? {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    } : {
        weekday: 'long',
    });
}