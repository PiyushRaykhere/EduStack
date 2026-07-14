/**
 * Normalise a course duration value so it always renders as e.g. "2 hours"
 * regardless of whether the DB value is "2", "2h", "2 hours", "2hrs", etc.
 */
export function formatDuration(raw) {
    if (!raw) return 'N/A'
    const trimmed = String(raw).trim()
    if (/\d+\s*(h|hr|hrs|hour|hours)/i.test(trimmed)) return trimmed
    return `${trimmed} hours`
}
