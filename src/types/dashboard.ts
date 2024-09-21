// Interface for a recent activity
export interface RecentActivity {
    id: string;
    type: string;
    description: string;
    timestamp: string; // ISO timestamp
}

// Interface for an evaluation trend item
interface EvaluationTrend {
    date: string;
    count: number;
}

// Main interface for the dashboard data
export interface DashboardData {
    totalProjects: number;
    overallComplianceScore: number;
    recentActivities: RecentActivity[];
    evaluationTrend: EvaluationTrend[];
}
