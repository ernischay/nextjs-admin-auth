import React from 'react';
import { RecentActivity } from '@/types/dashboard';

interface RecentActivityItemProps {
    activity: RecentActivity;
}

export default function RecentActivityItem({ activity }: RecentActivityItemProps) {
    return (
        <div className="flex items-center py-4 border-b border-gray-200">
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.description}</p>
                <p className="text-sm text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleString()} {/* Format timestamp */}
                </p>
            </div>
            <div className="ml-auto font-medium text-green-500">{activity.type}</div>
        </div>
    );
}
