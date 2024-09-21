import React from 'react';
import Activity from './Activity';
import { RecentActivity as RecentActivityType } from '@/types/dashboard'; // Import the RecentActivity type

interface RecentActivityProps {
    activities: RecentActivityType[]; // Array of RecentActivity objects
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
    return (
        <div className="grid col-span-1">
            {activities.map((activity) => (
                <Activity key={activity.id} activity={activity} />
            ))}
        </div>
    );
};

export default RecentActivity;
