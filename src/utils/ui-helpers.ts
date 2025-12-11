
type ValidBadgeVariant = "default" | "neutral" | "outline" | "warning" | "danger" | "New" | "In Progress" | "Completed";

type Priority = 'high' | 'medium' | 'low';

export const getPriorityVariant = (priority: Priority): ValidBadgeVariant => {
  if (priority === 'high') return 'danger';
  if (priority === 'medium') return 'warning';
  return 'neutral';
};

export const getPriorityHoverClasses = (priority: Priority): string => {

  switch (priority) {
    case 'high':
      // High Priority Hover: Uses Clinical Red border and shadow
      return `hover:border-[#EB5757] hover:shadow-lg hover:shadow-[#EB5757]/20`;
    case 'medium':
      // Medium Priority Hover: Uses AI Yellow border and shadow
      return `hover:border-[#F2C94C] hover:shadow-lg hover:shadow-[#F2C94C]/20`;
    case 'low':
    default:
      // Low Priority Hover: Uses Cool Gray border
      return `hover:border-[#9BA3AF]/50`;
  }
};

// Helper function to determine card priority based on warnings
export const getTreatmentPriority = (warnings: string[] | undefined): 'high' | 'low' => {
    // If warnings exist, highlight the card as high priority (red accent)
    return (warnings && warnings.length > 0) ? 'high' : 'low';
};