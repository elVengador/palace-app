
export const formatDate = (isoDate: string): string => {
    const formatter = Intl.DateTimeFormat('es-PE', { dateStyle: 'medium', timeStyle: 'short' })

    const date = new Date(isoDate)
    return formatter.format(date)
}
