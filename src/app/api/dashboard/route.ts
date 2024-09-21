import { NextResponse } from "next/server";

// Handle details
export async function GET() {
    return NextResponse.json({
        "totalProjects": 42,
        "overallComplianceScore": 87.5,
        "recentActivities": [
            {
                "id": "act1",
                "type": "PROJECT_CREATED",
                "description": "New project 'AI Model X' created",
                "timestamp": "2023-09-15T14:30:00Z"
            },
            {
                "id": "act2",
                "type": "PROJECT_DELETED",
                "description": "New project 'AI Model Y' deleted",
                "timestamp": "2023-10-15T14:39:00Z"
            }
        ],
        "evaluationTrend": [
            {
                "date": "2023-09-01",
                "count": 15
            },
            {
                "date": "2023-09-02",
                "count": 22
            }
        ]
    }
    );
}
