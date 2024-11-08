export function formatTimestamp(sentAt) {
    const now = new Date();
    const sentTime = new Date(sentAt);
    const diffMs = now - sentTime;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if(diffMinutes < 1) {
        return "Now";
    }

    if (diffMinutes < 60) {
        return `${diffMinutes} m`;
    } 
    
    if (diffHours < 24) {
        return `${diffHours}h`;
    } 
    
    if(diffDays < 30) {
        return `${diffDays}d`;
    } 
    
    if (diffMonths < 12) {
        return `${diffMonths}m`;
    } 
    
    return `${diffYears} yr${diffYears !== 1 ? 's' : ''}`;
    
}
