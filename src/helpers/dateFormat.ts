/**
 * Date formatting helper utilities
 */

/**
 * Formats a date string to "MMM DD, YYYY" format (e.g., "Sep 09, 2025")
 * @param dateString - The date string to format (ISO format or any valid date string)
 * @returns Formatted date string or empty string if invalid
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''

  const date = new Date(dateString)

  if (isNaN(date.getTime())) return ''

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }

  return date.toLocaleDateString('en-US', options)
}

/**
 * Formats a date to "YYYY-MM-DD" format
 * @param dateString - The date string to format
 * @returns Formatted date string or empty string if invalid
 */
export function formatDateISO(dateString: string | null | undefined): string {
  if (!dateString) return ''

  const date = new Date(dateString)

  if (isNaN(date.getTime())) return ''

  return date.toISOString().split('T')[0] || ''
}

/**
 * Formats a date string to "MMM YYYY" format (e.g., "Feb 2021")
 * @param dateString - The date string to format (ISO format or any valid date string)
 * @returns Formatted date string or empty string if invalid
 */
export function formatMonthYear(dateString: Date | null | undefined): string {
  if (!dateString) return ''

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
  }

  return dateString.toLocaleDateString('en-US', options)
}
