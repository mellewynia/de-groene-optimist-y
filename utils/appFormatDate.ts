import { format } from 'date-fns'

/** 'dd MMMM yyyy, HH:mm' */
export const appFormatDate = (
  dateString: Date,
  formatStr = 'dd MMMM yyyy, HH:mm',
  lang: string = 'nl'
) => {
  try {
    const date = new Date(dateString)
    let str = format(date, formatStr)
    if (lang === 'nl') {
      str = str
        .replaceAll('January', 'januari')
        .replaceAll('February', 'februari')
        .replaceAll('March', 'maart')
        .replaceAll('April', 'april')
        .replaceAll('May', 'mei')
        .replaceAll('June', 'juni')
        .replaceAll('July', 'juli')
        .replaceAll('August', 'augustus')
        .replaceAll('September', 'september')
        .replaceAll('October', 'oktober')
        .replaceAll('November', 'november')
        .replaceAll('December', 'december')
    }

    return str
  } catch (e) {
    console.error('appFormatDate errored', e)
  }
}
